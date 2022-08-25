import React, { useEffect, useMemo } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Client, Environment } from 'square';
import classNames from 'classnames';
import styles from './styles.module.less';
import { Button, Col, Layout, Row, Typography, Image, Space } from 'antd';
import logo from './zero-icon.svg';
import { gql, useQuery } from '@apollo/client';
import { projectBySlug, projectByUser } from '../../graphql/queries';
import { Project } from '@/API';
import { SpinnerOverlay } from '@/components/SpinnerOverlay';
import If from '@/components/If';
import { PROXY_URL } from '@/lib/config';
interface Props {}

export interface ProjectContext {
  client: Client;
  slug: string;
  project: Project;
}

const { Content, Footer, Header } = Layout;

export const ProjectLayout = ({}: Props) => {
  const { slug } = useParams();
  const location = useLocation();

  const {
    data: projectWrapper,
    loading: projectLoading,
    refetch,
  } = useQuery(gql(projectBySlug), { variables: { slug } });

  const project: Project | null = useMemo(() => {
    if (!projectWrapper?.projectBySlug?.items || projectWrapper.projectBySlug.items.length === 0) {
      return null;
    }

    return projectWrapper.projectBySlug.items[0];
  }, [projectWrapper]);


  const client = useMemo(() => {
    if (project) {
      return new Client({
        environment: Environment.Custom,
        customUrl: `${PROXY_URL}/buyer/${project.id}`,
      });
    }

  }, [slug, project]);


  if ((!project && slug) || (!client && slug) ) {
    return <SpinnerOverlay spinning={true} />;
  }

  console.log({project, slug, client})

  return (
    <div>
      <Header className={classNames([styles.container, styles.header])}>
        <div className={styles.logoContainer}>
          {/*<Button type="link">*/}
          <Image src={logo} preview={false} width={60} className={styles.logo} />
          <If
            condition={project}
            then={() => (
              <>
                <span style={{ fontSize: 18, fontWeight: 200, marginRight: 14, marginLeft: 6 }}>
                  x
                </span>
                <span style={{ fontSize: 34, fontWeight: 800 }}>{project?.name}</span>
              </>
            )}
            else={() => (
              <>
                <span style={{ fontSize: 34, fontWeight: 800,  marginLeft: 8 }}>Squareity</span>
              </>
            )}
          />

          {/*</Button>*/}
        </div>

        <If
          condition={location.pathname === '/'}
          then={() => (
            <Link to={'console'}>
              <Button type="primary" className={styles.signInButton} size="large">
                Console
              </Button>
            </Link>
          )}
        />
      </Header>
      <Content className={classNames([styles.container, styles.content])}>
        <Outlet context={{ client, slug, project }} />
      </Content>
      <Footer className={classNames([styles.footer])}>
        <div className={styles.container}>
          <Link to="/">
            <Image src={logo} preview={false} width={160} className={styles.logo} />
          </Link>
          <Row gutter={24}>
            <Col xs={24} sm={12} md={8}>
              <Typography.Title level={3}>
                <strong>About</strong>
              </Typography.Title>
              <Typography.Link className={styles.footerLink}>
                How Squareity works?
              </Typography.Link>
              <Typography.Link className={styles.footerLink}>Team</Typography.Link>
              <Typography.Link className={styles.footerLink}>Contact</Typography.Link>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Typography.Title level={3}>
                <strong>Legal</strong>
              </Typography.Title>
              <Typography.Link className={styles.footerLink}>Terms and Conditions</Typography.Link>
              <Typography.Link className={styles.footerLink}>Data Protection</Typography.Link>
              <Typography.Link className={styles.footerLink}>GDPR</Typography.Link>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Typography.Title level={3}>
                <strong>Support</strong>
              </Typography.Title>
              <Typography.Link className={styles.footerLink}>Contact us by e-mail</Typography.Link>
              <Typography.Link className={styles.footerLink}>Facebook</Typography.Link>
              <Typography.Link className={styles.footerLink}>Instagram</Typography.Link>
              <Typography.Link className={styles.footerLink}>Twitter</Typography.Link>
            </Col>
          </Row>
        </div>
      </Footer>
    </div>
  );
};

export default ProjectLayout;
