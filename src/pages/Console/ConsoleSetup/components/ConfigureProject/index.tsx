import React, { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ConsoleContext } from '@/layouts/ConsoleLayout/ConsoleLayout';
import { Project, TokenType } from '@/API';
import { useQuery } from 'react-query';
import { Button, Card, Col, Divider, message, Row, Typography } from 'antd';
import { Field } from 'react-final-form';
import Input, { TextArea } from '@/components/Form/Input';
import { Form } from '@/components/Form';
import { joi } from '@/lib/joi';
import Select, { Option } from '@/components/Form/Select';
import { apolloClient } from '@/lib/apollo';
import { gql } from '@apollo/client';
import { createDonationAppointmentProposal, updateProject } from '../../../../../graphql/mutations';
import { nanoid } from 'nanoid';
import If from '@/components/If';
import dayjs from 'dayjs';
import { CheckCircleFilled } from '@ant-design/icons';
import { APP_URL, SQUARE_APPLICATION_ID, SQUARE_PATH } from '@/lib/config';
import _ from 'lodash-es';
import {AssignItems} from "@/pages/Console/ConsoleSetup/components/ConfigureProject/AssignItems";

interface Props {
  project?: Project | null;
  loadingToken: string | null;
}

const validator = joi
  .object({
    defaultLocationId: joi.string().allow(null),
    donationCategoryId: joi.string().allow(null),
    stockCategoryId: joi.string().allow(null),
    donorCustomerGroupId: joi.string().allow(null),
    clientCustomerGroupId: joi.string().allow(null),
    name: joi.string().required(),
    heroTitle: joi.string().required(),
    description: joi.string().required(),
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

export const ConfigureProject = ({ project, loadingToken }: Props) => {
  const { client } = useOutletContext<ConsoleContext>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: locations } = useQuery(
    [project?.id, 'locations'],
    () => client.locationsApi.listLocations(),
    { enabled: !!project?.id },
  );

  const { data: categories } = useQuery(
    [project?.id, 'categories'],
    () => client.catalogApi.searchCatalogObjects({ objectTypes: ['CATEGORY'] }),
    { enabled: !!project?.id },
  );

  const { data: groups } = useQuery(
    [project?.id, 'groups'],
    () => client.customerGroupsApi.listCustomerGroups(),
    { enabled: !!project?.id },
  );



  const submitForm = async (values) => {
    setLoading(true);
    const updatedProject = await apolloClient.mutate({
      mutation: gql(updateProject),
      variables: {
        input: {
          id: project?.id,
          ..._.omit(values, ['__typename', 'tokens', 'updatedAt', 'createdAt']),
        },
      },
    });

    message.success('Project Successfully Configured!');
    // navigate('/console/customers', { replace: true });
    setLoading(false);
  };

  const [sellerToken, buyerToken] = useMemo(() => {
    const seller = (project?.tokens?.items || []).find((token) => token?.type === TokenType.Seller);

    const buyer = (project?.tokens?.items || []).find((token) => token?.type === TokenType.Buyer);

    return [seller, buyer];
  }, [project]);

  return (
    <div>
      <Form validator={validator} onSubmit={submitForm} initialValues={{ ...project }}>
        {({ valid, values }) => (
          <>
            <Typography.Title level={3}>General</Typography.Title>
            <Row gutter={16}>
              <Col span={12}>
                <Field
                  name="name"
                  component={Input}
                  type="text"
                  placeholder="Help Together Foundation"
                  label="Organisation Name"
                  size="large"
                />
              </Col>
              <Col span={12}>
                <Field
                  name="slug"
                  component={Input}
                  type="text"
                  placeholder="help-together"
                  label="Organisation Slug"
                  size="large"
                  helperText={
                    <span>
                      Your site will be available at{' '}
                      <a href={`${APP_URL}/${values.slug}`}>
                        {APP_URL}/{values.slug}
                      </a>
                    </span>
                  }
                />
              </Col>
              <Divider />
              <Col span={8}>
                <Field
                  name="heroTitle"
                  component={Input}
                  type="text"
                  placeholder="Lorem ipsum dolor sit amet."
                  label="Landing Page Title"
                  size="large"
                />
              </Col>

              <Col span={16}>
                <Field
                  name="description"
                  component={TextArea}
                  type="text"
                  placeholder="Lorem ipsum dolor sit amet."
                  label="Landing Page Description"
                  size="large"
                  style={{ height: 80 }}
                />
              </Col>
            </Row>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!valid}
              size="large"
              loading={loading}
            >
              Save Project
            </Button>
            <Col span={24} style={{ marginTop: 24 }}>
              <Typography.Title level={3}>Connect Square</Typography.Title>
            </Col>
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Seller Account" style={{ width: '100%' }}>
                  <If
                    condition={sellerToken && dayjs(sellerToken?.expiresAt) > dayjs()}
                    then={() => (
                      <div style={{ textAlign: 'center' }}>
                        <CheckCircleFilled
                          style={{
                            fontSize: 30,
                            color: '#52c41a',
                            marginBottom: 30,
                            marginTop: 20,
                          }}
                        />
                        <Typography.Title level={5}>Connected</Typography.Title>
                        <code>
                          Expires at {dayjs(sellerToken?.expiresAt).format('YYYY.MM.DD HH:mm')}
                        </code>
                      </div>
                    )}
                    else={() => (
                      <div style={{ textAlign: 'center' }}>
                        Connect your Square account
                        <br /> to start using Squareity.
                        <br /> <br />
                        <a
                          href={`${SQUARE_PATH}/oauth2/authorize?client_id=${SQUARE_APPLICATION_ID}&response_type=code&scope=${_.uniq(
                            [...sellerScopes, ...buyerScopes],
                          ).join('+')}&state=seller-${nanoid()}`}
                        >
                          <Button type="primary" size="large" loading={loadingToken === 'seller'}>
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
                    condition={buyerToken && dayjs(buyerToken?.expiresAt) > dayjs() && false}
                    then={() => (
                      <div style={{ textAlign: 'center' }}>
                        <CheckCircleFilled
                          style={{
                            fontSize: 30,
                            color: '#52c41a',
                            marginBottom: 30,
                            marginTop: 20,
                          }}
                        />
                        <Typography.Title level={5}>Connected</Typography.Title>
                        <code>
                          Expires at {dayjs(buyerToken?.expiresAt).format('YYYY.MM.DD HH:mm')}
                        </code>
                      </div>
                    )}
                    else={() => (
                      <div style={{ textAlign: 'center' }}>
                        Connect your Square account
                        <br /> to start using Squareity.
                        <br /> <br />
                        <a
                          href={`${SQUARE_PATH}/oauth2/authorize?client_id=${SQUARE_APPLICATION_ID}&response_type=code&scope=${_.uniq(
                            [...buyerScopes],
                          ).join('+')}&state=buyer-${nanoid()}`}
                        >
                          <Button type="primary" size="large" loading={loadingToken === 'buyer'}>
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
                opacity: sellerToken && buyerToken ? 1 : 0.25,
                pointerEvents: sellerToken && buyerToken ? 'auto' : 'none',
              }}
            >
              <Row gutter={16} style={{ marginTop: 36 }}>
                <Col span={24}>
                  <Typography.Title level={3}>Clients & Customers</Typography.Title>
                </Col>
                <Col span={12}>
                  <Field
                    name="clientCustomerGroupId"
                    component={Select}
                    type="text"
                    placeholder="Donors"
                    label="Donor Customer Group"
                    size="large"
                  >
                    {groups?.result?.groups?.map((g) => (
                      <Option key={g.id} value={g.id}>
                        {g.name}
                      </Option>
                    ))}
                  </Field>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Field
                    name="donorCustomerGroupId"
                    component={Select}
                    type="text"
                    placeholder="Clients"
                    label="Client Customer Group"
                    size="large"
                  >
                    {groups?.result?.groups?.map((g) => (
                      <Option key={g.id} value={g.id}>
                        {g.name}
                      </Option>
                    ))}
                  </Field>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Button size="large">Create New Group</Button>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24} style={{ marginTop: 36 }}>
                  <Typography.Title level={3}>Charity Shop</Typography.Title>
                </Col>
                <Col span={12}>
                  <Field
                    name="defaultLocationId"
                    component={Select}
                    type="text"
                    label="Default Location"
                    size="large"
                  >
                    {locations?.result?.locations?.map((location) => (
                      <Option key={location.id} value={location.id}>
                        {location.name}
                      </Option>
                    ))}
                  </Field>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Field
                    name="donationCategoryId"
                    component={Select}
                    type="text"
                    placeholder="Donation"
                    label="Purchasable Donation Items Category"
                    size="large"
                  >
                    {categories?.result?.objects?.map((c) => (
                      <Option key={c.id} value={c.id}>
                        {c?.categoryData?.name}
                      </Option>
                    ))}
                  </Field>
                </Col>
                <Col span={12}>
                  <Field
                    name="stockCategoryId"
                    component={Select}
                    type="text"
                    placeholder="Stock"
                    label="Distributed Donation Items Category"
                    size="large"
                  >
                    {categories?.result?.objects?.map((c) => (
                      <Option key={c.id} value={c.id}>
                        {c?.categoryData?.name}
                      </Option>
                    ))}
                  </Field>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Button size="large">Create New Category</Button>
                </Col>
              </Row>
              <Divider />
              <Row gutter={16}>
                <Col span={12}>
                  <Typography.Title level={4}>Item Pairings</Typography.Title>
                </Col>
              </Row>
              <AssignItems project={project} client={client}/>
              <Divider />

              <Button
                type="primary"
                htmlType="submit"
                disabled={!valid}
                size="large"
                loading={loading}
              >
                Save Project
              </Button>

            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default ConfigureProject;
