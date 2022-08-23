import {ExportOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Button, Layout} from 'antd';
import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.less';
import Profile from './Profile';
import { selectSidebarIsOpen, toggleSidebar } from '@/redux/slices/layout';
import {Project} from "@/API";

interface Props {
  signOut?: Function;
  project?: Project | null
}

export default function Header({ signOut, project }: Props): JSX.Element {
  const dispatch = useDispatch();
  const collapsed = useSelector(selectSidebarIsOpen);
  const IconComponent = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  return (
    <Layout.Header
      className={classNames([styles.header, { [styles.sidebarCollapsed]: collapsed }])}
    >
      <IconComponent className={styles.toggle} onClick={() => dispatch(toggleSidebar())} />

      <Profile signOut={signOut} project={project}/>
    </Layout.Header>
  );
}
