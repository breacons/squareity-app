import { Layout } from 'antd';
import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';

// import Breadcrumbs from '../../component/Breadcrumb';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './ConsoleLayout.module.less';
import { Client, Environment } from 'square';
import {gql, useQuery} from "@apollo/client";
import {projectByUser} from "../../graphql/queries";
import {useProfile} from "@/hooks/user";
import {User} from "@/interfaces/user";
import {PROXY_URL} from "@/lib/config";
import {Project} from "@/API";
import {SpinnerOverlay} from "@/components/SpinnerOverlay";

const { Content } = Layout;

interface Props {
  signOut: Function;
  // children: ReactNode;
}

export interface ConsoleContext {
  client: Client;
  project: Project
}

export default function ConsoleLayout({ signOut}: Props) {
  const slug = 'test'; // FIXME

  const me = useProfile() as User;
  const client = useMemo(() => {
    return new Client({
      environment: Environment.Custom,
      customUrl: `${PROXY_URL}/seller/${slug}`,
    });
  }, [slug]);

  const {
    data: projectWrapper,
    loading: projectLoading,
    called,
    refetch,
  } = useQuery(gql(projectByUser), { variables: { userId: me.id }, skip: !me.id });

  const project: Project | null = useMemo(() => {
    if (!projectWrapper?.projectByUser?.items || projectWrapper.projectByUser.items.length === 0) {
      return null;
    }

    return projectWrapper.projectByUser.items[0];
  }, [projectWrapper]);

  if (!called || projectLoading) {
    return <SpinnerOverlay spinning={true} />;
  }

  return (

        <Layout className={styles.layout}>
          <Sidebar />
          <Layout>
            <Header signOut={signOut} project={project}/>
            <Content className={classNames([styles.content, styles.whiteBackground])}>
              <Outlet context={{ client, project }} />
            </Content>
          </Layout>
        </Layout>

  );
}
