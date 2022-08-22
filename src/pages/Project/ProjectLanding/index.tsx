import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ProjectContext } from '@/layouts/ProjectLayout';
import { useQuery } from 'react-query';
import { Button, Col, Image, Row, Space, Typography } from 'antd';
import styles from './styles.module.less';

interface Props {}

export const ProjectLanding = ({}: Props) => {
  const { project } = useOutletContext<ProjectContext>();

  return (
    <div>
      <Row gutter={56} style={{ marginTop: 60 }} align="middle">
        <Col span={12}>
          <Image
            preview={false}
            src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            style={{ borderRadius: 36, width: '120%', left: '-20%', position: 'relative' }}
          />
        </Col>
        <Col span={12}>
          <Typography.Title level={1} className={styles.heroTitle}>
            {/* @ts-ignore */}
            {project.heroTitle || 'Lorem ipsum dolor sit amet.'}
          </Typography.Title>
          <Typography.Paragraph className={styles.description}>
            {project.description ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices, lacus non condimentum volutpat, arcu leo ultrices justo, ut elementum arcu turpis eu neque. Integer nec mi ac erat convallis sagittis at consectetur metus.'}
          </Typography.Paragraph>
          <Space size={12} direction="horizontal">
            <Link to={'donate'}>
              <Button type="primary" size="large" className={styles.button}>
                Donate
              </Button>
            </Link>
            <Link to={'apply'}>
              <Button type="default" size="large" className={styles.button}>
                Apply for support
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectLanding;
