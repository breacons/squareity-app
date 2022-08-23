import React, { useState } from 'react';
import styles from './styles.module.less';
import { Form } from '@/components/Form';
import { joi } from '@/lib/joi';
import { Button, Col, Divider, Image, Row, Typography } from 'antd';
import BirthDateField from '@/components/Form/Fields/BirthDateField';
import { Field } from 'react-final-form';
import Input from '@/components/Form/Input';
import { Link, useOutletContext } from 'react-router-dom';
import { ProjectContext } from '@/layouts/ProjectLayout';
import If from '@/components/If';
import { CheckCircleFilled } from '@ant-design/icons';

interface Props {}

const validator = joi
  .object({
    familyName: joi.string().required(),
    givenName: joi.string().required(),
    emailAddress: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    birthday: joi.string().required(),
  })
  .unknown()
  .required();

export const ProjectApply = ({}: Props) => {
  const { client, project, slug } = useOutletContext<ProjectContext>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const createCustomer = async (values) => {
    setLoading(true);
    const customer = await client.customersApi.createCustomer(values);

    if (customer.result.customer?.id) {
      const group = await client.customersApi.addGroupToCustomer(
        customer.result.customer?.id,
        project.clientCustomerGroupId as string,
      );

      setSuccess(true);
    }
    setLoading(false);
  };

  // TODO: custom attributes: family, vulnerability, agreements
  return (
    <div>
      <Row gutter={56} style={{ marginTop: 60 }} align="middle">
        <Col span={12}>
          <Typography.Title level={1} className={styles.heroTitle}>
            Are you in need of help?
          </Typography.Title>
          <Typography.Paragraph className={styles.description}>
            Sign up here and we will contact you to assess your situation, and to find the best
            available support!
          </Typography.Paragraph>
          <If
            condition={success}
            then={() => (
              <div>
                <Divider />

                <Typography.Paragraph className={styles.description} style={{ marginTop: 30 }}>
                  <CheckCircleFilled style={{ color: '#52c41a' }} /> Your application was recorded.
                  We will be in touch soon!
                  <br />
                  <br />
                  <i>{project.name} team</i>
                </Typography.Paragraph>
                <Link to={`/${slug}`}>
                  <Button type="primary" size="large" className={styles.button}>
                    Return to home
                  </Button>
                </Link>
              </div>
            )}
            else={() => (
              <Form validator={validator} onSubmit={createCustomer} initialValues={{}}>
                {({ valid }) => (
                  <>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Field
                          name="givenName"
                          component={Input}
                          type="text"
                          placeholder="James"
                          label="Given Name"
                          size="large"
                        />
                      </Col>
                      <Col span={12}>
                        <Field
                          name="familyName"
                          component={Input}
                          type="text"
                          placeholder="Merritt"
                          label="Family Name"
                          size="large"
                        />
                      </Col>
                      <Col span={24}>
                        <Field
                          name="emailAddress"
                          component={Input}
                          type="email"
                          placeholder="james.merritt@something.com"
                          label="E-mail Address"
                          size="large"
                        />
                      </Col>
                      <Col span={24}>
                        <BirthDateField name="birthday" />
                      </Col>
                    </Row>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={!valid}
                      size="large"
                      className={styles.button}
                      loading={loading}
                    >
                      Apply for support
                    </Button>
                  </>
                )}
              </Form>
            )}
          />
        </Col>
        <Col span={12}>
          <Image
            preview={false}
            src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            style={{ borderRadius: 36, width: '120%', right: '-0%', position: 'relative' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProjectApply;
