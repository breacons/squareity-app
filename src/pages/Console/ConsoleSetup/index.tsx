import React, { useEffect, useMemo } from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
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
import ConfigureProject from "@/pages/Console/ConsoleSetup/components/ConfigureProject";
import {CheckCircleFilled} from "@ant-design/icons";

// import styles from './styles.module.less';

interface Props {}

const validator = joi
  .object({
    name: joi.string().required(),
    slug: joi.string().required(),
  })
  .unknown()
  .required();

const sellerScopes = [
  'INVENTORY_WRITE',
  'INVENTORY_READ',
  'MERCHANT_PROFILE_WRITE',
  'MERCHANT_PROFILE_READ',
  'ITEMS_WRITE',
];
const buyerScopes = [
  'CUSTOMERS_WRITE',
  'APPOINTMENTS_READ',
  'APPOINTMENTS_WRITE',
  'APPOINTMENTS_ALL_READ',
  'APPOINTMENTS_BUSINESS_SETTINGS_READ',
  'ITEMS_READ',
  'ORDERS_WRITE', // FIXME ???
  'ORDERS_READ', // FIXME ???
  'PAYMENTS_WRITE', // FIXME ???
];

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
  const [searchParams, setSearchParams] = useSearchParams();
  const { client } = useOutletContext<ConsoleContext>();

  const {
    data: projectWrapper,
    loading: projectLoading,
    refetch,
  } = useQuery(gql(projectByUser), { variables: { userId: me.id }, skip: !me.id });

  const [runCreateProject, { data: newProject, loading: loadingCreateProject }] = useMutation(
    gql(createProject),
  );

  const [runCreateToken, {}] = useMutation(gql(createToken));

  const project: Project | null = useMemo(() => {
    if (!projectWrapper?.projectByUser?.items || projectWrapper.projectByUser.items.length === 0) {
      return null;
    }

    return projectWrapper.projectByUser.items[0];
  }, [projectWrapper]);

  const [sellerToken, buyerToken] = useMemo(() => {
    const seller = (project?.tokens?.items || []).find((token) => token?.type === TokenType.Seller);

    const buyer = (project?.tokens?.items || []).find((token) => token?.type === TokenType.Buyer);

    return [seller, buyer];
  }, [project]);

  // const { data: sellerToken, refetch: refetchSellerToken } = useQuery(gql(listTokens), {
  //   variables: {
  //     filter: { and: { projectTokensId: { eq: project?.id }, type: {eq: TokenType.Seller} } },
  //   },
  //   skip: !project?.id,
  // });
  //
  // console.log({sellerToken})

  const onCreateProject = async (values) => {
    await runCreateProject({ variables: { input: { ...values, userId: me.id } } });
    await refetch();
  };

  useEffect(() => {
    // FIXME: this has to be moved to the backend
    const getOauthToken = async () => {
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
            condition={!project}
            then={() => (
              <Form validator={validator} onSubmit={onCreateProject}>
                {({ valid }) => (
                  <>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Field
                          name="name"
                          component={Input}
                          type="text"
                          placeholder="Help Together Foundation"
                          label="Project Name"
                          size="large"
                        />
                      </Col>
                      <Col span={24}>
                        <Field
                          name="slug"
                          component={Input}
                          type="text"
                          placeholder="help-together"
                          label="Project Slug"
                          size="large"
                        />
                      </Col>
                    </Row>
                    <Button type="primary" htmlType="submit" disabled={!valid} size="large">
                      Create Project
                    </Button>
                  </>
                )}
              </Form>
            )}
            else={() => (
              <div>
                <Typography.Title level={2}>Connect Square</Typography.Title>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title="Seller Account" style={{ width: '100%' }}>
                      <If
                        condition={sellerToken && dayjs(sellerToken?.expiresAt) > dayjs()}
                        then={() => (
                          <div style={{textAlign: "center"}}>
                            <CheckCircleFilled style={{fontSize: 30, color: "#52c41a", marginBottom: 30, marginTop: 20}} />
                            <Typography.Title level={5}>Connected</Typography.Title>
                            <code>Expires at {dayjs(sellerToken?.expiresAt).format("YYYY.MM.DD HH:mm")}</code>
                          </div>
                        )}
                        else={() => (
                          <div style={{textAlign: "center"}}>
                            Connect your Square account<br/> to start using Squaerity.
                            <br/> <br/>
                            <a
                              href={`${SQUARE_PATH}/oauth2/authorize?client_id=${SQUARE_APPLICATION_ID}&response_type=code&scope=${_.uniq(
                                [...sellerScopes, ...buyerScopes],
                              ).join('+')}&state=seller-${nanoid()}`}
                            >
                              <Button type="primary" size="large">
                                Authorize with Square
                              </Button>
                            </a>
                          </div>
                        )}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Customer Account" style={{ width: '100%' }}>
                      <If
                        condition={buyerToken && dayjs(buyerToken?.expiresAt) > dayjs()}
                        then={() => (
                          <div style={{textAlign: "center"}}>
                            <CheckCircleFilled style={{fontSize: 30, color: "#52c41a", marginBottom: 30, marginTop: 20}} />
                            <Typography.Title level={5}>Connected</Typography.Title>
                            <code>Expires at {dayjs(buyerToken?.expiresAt).format("YYYY.MM.DD HH:mm")}</code>
                          </div>
                        )}
                        else={() => (
                          <div style={{textAlign: "center"}}>
                            Connect your Square account<br/> to start using Squaerity.
                            <br/> <br/>
                            <a
                              href={`${SQUARE_PATH}/oauth2/authorize?client_id=${SQUARE_APPLICATION_ID}&response_type=code&scope=${_.uniq(
                                [...buyerScopes],
                              ).join('+')}&state=buyer-${nanoid()}`}
                            >
                              <Button type="primary" size="large">
                                Authorize with Square
                              </Button>
                            </a>
                          </div>
                        )}
                      />
                    </Card>
                  </Col>
                </Row>
                <div
                  style={{
                    marginTop: 36,
                    opacity: sellerToken && buyerToken ? 1 : 0.25,
                    pointerEvents: sellerToken && buyerToken ? 'auto' : 'none',
                  }}
                >
                  <Typography.Title level={2}>Configure Project</Typography.Title>
                  <ConfigureProject project={project} />
                </div>
              </div>
            )}
          />
        )}
      />
    </div>
  );
};

export default ConsoleSetup;
