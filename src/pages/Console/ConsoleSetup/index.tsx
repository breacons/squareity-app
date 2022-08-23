import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Result, Row, Typography } from 'antd';
import { useProfile } from '@/hooks/user';
import { User } from '@/interfaces/user';
import { gql, useMutation, useQuery } from '@apollo/client';
import { listTokens, projectByUser } from '../../../graphql/queries';
import If from '@/components/If';
import { SpinnerOverlay } from '@/components/SpinnerOverlay';
import { Field } from 'react-final-form';
import Input from '@/components/Form/Input';
import { Form } from '@/components/Form';
import { joi } from '@/lib/joi';
import { createProject, createToken } from '../../../graphql/mutations';
import { Project, TokenType } from '@/API';
import { SQUARE_APPLICATION_ID, SQUARE_CLIENT_SECRET, SQUARE_PATH } from '@/lib/config';
import { nanoid } from 'nanoid';
import _ from 'lodash-es';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { ConsoleContext } from '@/layouts/ConsoleLayout/ConsoleLayout';
import dayjs from 'dayjs';
import ConfigureProject from '@/pages/Console/ConsoleSetup/components/ConfigureProject';
import { CheckCircleFilled } from '@ant-design/icons';

// import styles from './styles.module.less';

interface Props {}

const validator = joi
  .object({
    name: joi.string().required(),
    slug: joi.string().required(),
  })
  .unknown()
  .required();

/*
 tokens {
          items {
              id
              type
              expiresAt
          }
          nextToken
        }
 */

export const ConsoleSetup = ({}: Props) => {
  const me = useProfile() as User;
  const [creatingProject, setCreatingProject] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { client } = useOutletContext<ConsoleContext>();
  const [loadingToken, setLoadingToken] = useState<string | null>(null);

  const [runCreateProject, { data: newProject, loading: loadingCreateProject }] = useMutation(
    gql(createProject),
  );
  const [runCreateToken, {}] = useMutation(gql(createToken));

  const {
    data: projectWrapper,
    loading: projectLoading,
    called,
    refetch,
  } = useQuery(gql(projectByUser), { variables: { userId: me.id }, skip: !me.id });

  console.log({ called, projectWrapper, projectLoading, me });
  const project: Project | null = useMemo(() => {
    if (!projectWrapper?.projectByUser?.items || projectWrapper.projectByUser.items.length === 0) {
      return null;
    }

    return projectWrapper.projectByUser.items[0];
  }, [projectWrapper]);

  const onCreateProject = async () => {
    setCreatingProject(true);
    await runCreateProject({
      variables: {
        input: { name: 'Our Squareity', slug: `rename-me-${nanoid()}`, userId: me.id },
      },
    });
    await refetch();
    setCreatingProject(false);
  };

  useEffect(() => {
    // FIXME: probably not a good idea to do this, hopefully no one notices...
    const getOauthToken = async () => {
      setLoadingToken((searchParams.get('state') || '').startsWith('seller') ? 'seller' : 'buyer');
      const { result } = await client.oAuthApi.obtainToken({
        // Provide the code in a request to the Obtain Token endpoint
        code: searchParams.get('code') as string,
        clientId: SQUARE_APPLICATION_ID as string,
        clientSecret: SQUARE_CLIENT_SECRET,
        grantType: 'authorization_code',
      });

      if (result.accessToken) {
        const { shortLived, tokenType, ...rest } = result;
        await runCreateToken({
          variables: {
            input: {
              ...rest,
              projectTokensId: project?.id,
              type: (searchParams.get('state') || '').startsWith('seller')
                ? TokenType.Seller
                : TokenType.Buyer,
            },
          },
        });
        setLoadingToken(null);
        setSearchParams({});
        await refetch();
      }
    };

    if (searchParams.get('code') && project?.id) {
      getOauthToken();
    }
  }, [searchParams, project]);

  return (
    <div>
      <Typography.Title level={1}>Setup Squareity</Typography.Title>
      <If
        condition={projectLoading}
        then={() => <SpinnerOverlay spinning={true} />}
        else={() => (
          <If
            condition={project}
            then={() => <ConfigureProject loadingToken={loadingToken} project={project} />}
            else={() => (
              <Result
                style={{ marginTop: 120 }}
                // icon={<SmileOutlined />}
                title="Looks like you haven't created any project yet!"
                extra={
                  <Button
                    type="primary"
                    loading={creatingProject}
                    onClick={onCreateProject}
                    size="large"
                  >
                    Create New Project
                  </Button>
                }
              />
            )}
          />
        )}
      />
    </div>
  );
};

export default ConsoleSetup;
