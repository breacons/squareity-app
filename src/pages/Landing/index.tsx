import React from 'react';
import styles from './styles.module.less';
import heroImage from './images/squaerity-hero.png';
import {Button, Image, Space, Typography} from 'antd';
import {Link} from "react-router-dom";

interface Props {}

export const Landing = ({}: Props) => {
  return (
    <div className={styles.container}>
      <Typography.Title level={1} className={styles.heroTitle}>
        Squareity scales non-profit organisations through digital transformation.
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>
        Squareity offers a completely digital platform to manage humanitarian and charitable projects, including
        fundraising, inventory management, donations and customer relationships.
      </Typography.Paragraph>
      <Space size={12} direction="horizontal" style={{marginTop: 10}}>
        <Link to={'/help-together'}>
          <Button type="primary" size="large" className={styles.button}>
           Try the Demo
          </Button>
        </Link>
        <Link to={'/console'}>
          <Button type="default" size="large" className={styles.button}>
            Get Started
          </Button>
        </Link>
      </Space>
      <Image preview={false} src={heroImage} className={styles.heroImage} />
    </div>
  );
};

export default Landing;
