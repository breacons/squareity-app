import { Layout } from 'antd';
import React, { ReactNode } from 'react';

import Header from '../ConsoleLayout/Header';
import Sidebar from '../ConsoleLayout/Sidebar';
import styles from '../ConsoleLayout/UserLayout.module.less';

const { Content } = Layout;

interface Props {
  children: ReactNode;
}

export default class ReportLayout extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Layout className={styles.layout}>
        <Sidebar />
        <Layout>
          <Header />
          <Content className={styles.content}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}
