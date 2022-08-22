import React from 'react';
import {Button, Divider, Typography} from 'antd';
import styles from './styles.module.less';
import { CheckCircleFilled } from '@ant-design/icons';
import {Link, useOutletContext} from "react-router-dom";
import {ProjectContext} from "@/layouts/ProjectLayout";

interface Props {}

export const ProjectDonateSuccess = ({}: Props) => {
  const { slug } = useOutletContext<ProjectContext>();

  return (
    <div className={styles.container}>

      <CheckCircleFilled style={{fontSize: 80, color: "#52c41a", marginBottom: 40, marginTop: 40}} />
      <Typography.Title level={1} className={styles.heroTitle}>
        Your donation has arrived.
      </Typography.Title>
      <Typography.Paragraph className={styles.description}  style={{marginTop: 30}}>
        The order will be processed and delivered soon.<br/> Thank you for your help!
      </Typography.Paragraph>
      <Link to={`/${slug}`}>
        <Button type="primary" size="large" className={styles.button}>
          Return to home
        </Button>
      </Link>
    </div>
  );
};

export default ProjectDonateSuccess;
