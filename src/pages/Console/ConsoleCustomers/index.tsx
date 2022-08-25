import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ConsoleContext } from '@/layouts/ConsoleLayout/ConsoleLayout';
import { useQuery } from 'react-query';
import { Button, Divider, List, message, Modal, notification, Space, Tag, Typography } from 'antd';
import { Field } from 'react-final-form';
import { Form } from '@/components/Form';
import { joi } from '@/lib/joi';
import InputNumber from '@/components/Form/InputNumber';
import { OptGroup, Option, Select } from '@/components/Form/Select';
import { apolloClient } from '@/lib/apollo';
import { gql } from '@apollo/client';
import { createDonationAppointmentProposal } from '../../../graphql/mutations';
import axios from 'axios';
import { InventorySlider } from '@/components/InventorySlider';
import { nanoid } from 'nanoid';
import { APP_URL, EMAIL_LAMBDA_URL, PROXY_URL } from '@/lib/config';
import { SectionTitle } from '@/components/Typography';
import { Price } from '../../../locale/Price';
import dayjs from 'dayjs';

// import styles from './styles.module.less';

interface Props {}

const validator = joi
  .object({
    service: joi.string().required(),
  })
  .unknown()
  .required();

export const ConsoleCustomers = ({}: Props) => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const { client, project } = useOutletContext<ConsoleContext>();
  const [retryCounter, setRetryCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, refetch } = useQuery('customers', () =>
    client.customersApi.searchCustomers({
      query: {
        filter: {
          groupIds: {
            all: [project.clientCustomerGroupId as string],
          },
        },
      },
    }),
  );

  const { data: items, isLoading: itemLoading } = useQuery('items', () =>
    client.catalogApi.searchCatalogItems({
      productTypes: ['REGULAR'],
      categoryIds: [project?.stockCategoryId as string],
    }),
  );

  const { data: appointments, isLoading: appointmentsLoading } = useQuery('appointments', () =>
    client.catalogApi.searchCatalogItems({
      productTypes: ['APPOINTMENTS_SERVICE'],
      // categoryIds: [STOCK_CATEGORY_ID],
    }),
  );

  const submit = async (values) => {
    setLoading(true);
    const { service, ...items } = values;
    console.log({ items, service });
    const order = await client.ordersApi.createOrder({
      order: {
        lineItems: Object.entries(items)
          .filter(([key, value]) => (value as number) > 0)
          .map(([key, value]) => ({
            quantity: (value as number).toString(),
            catalogObjectId: key,
          })),
        locationId: project.defaultLocationId as string,
        customerId: selectedCustomer.id,
        state: 'DRAFT',
      },
    });

    const appointmentProposal = await apolloClient.mutate({
      mutation: gql(createDonationAppointmentProposal),
      variables: {
        input: {
          id: nanoid(),
          customerId: selectedCustomer.id,
          orderId: order.result.order?.id,
          serviceId: service,
        },
      },
    });

    const actionUrl = `${APP_URL}/${project.slug}/booking/${appointmentProposal.data.createDonationAppointmentProposal.id}`;
    const email = await axios.post(`${PROXY_URL}/email`, {
      appointmentProposalId: appointmentProposal.data.createDonationAppointmentProposal.id,
      slug: project.slug,
      recipient: selectedCustomer.email,
      variables: {
        recipientFirstName: selectedCustomer.givenName,
        projectName: project.name,
        signature: `${project.name} team`,
        actionUrl,
      },
    });

    console.log(email);

    setRetryCounter(retryCounter + 1);
    setLoading(false);
    setSelectedCustomer(null);
    message.success('Client has been notified about the available donation');
    console.log({ order, appointmentProposal });

    notification.info({
      message: `Test Booking`,
      duration: 5000,
      description: (
        <span>
          You can test the appointment booking{' '}
          <a href={actionUrl} target="_blank" rel="noreferrer">
            here
          </a>
          .
        </span>
      ),
      placement: 'bottomRight',
    });
  };

  return (
    <div>
      <Typography.Title level={1}>Clients</Typography.Title>
      {/*<InventorySlider project={project} client={client} retryCounter={retryCounter} />*/}
      {/*<Divider />*/}
      <Typography.Title level={2}>Registered clients</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={data?.result.customers || []}
        renderItem={(customer) => (
          <List.Item
            actions={[
              <Button type="default" key="history">
                History
              </Button>,
              <Button type="primary" onClick={() => setSelectedCustomer(customer)} key="assign">
                Assign Donation
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <span>
                  <strong>
                    {customer.givenName} {customer.familyName}
                  </strong>{' '}
                </span>
              }
              description={
                <Space direction="horizontal" size={14}>
                  <span> {dayjs(customer.birthday).format('YYYY.MM.DD')}</span>
                  <span>|</span>
                  <span> {customer.emailAddress}</span>
                </Space>
              }
            />
          </List.Item>
        )}
      />
      <Modal
        visible={selectedCustomer !== null}
        title={`Assign Donation to ${selectedCustomer?.givenName} ${selectedCustomer?.familyName}`}
        footer={null}
        onCancel={() => setSelectedCustomer(null)}
      >
        <Form validator={validator} onSubmit={submit}>
          {({ valid }) => (
            <>
              <SectionTitle form>Configure Donation Package</SectionTitle>
              {(items?.result.items || []).map((item) => (
                <div key={item.id}>
                  <Space direction="horizontal" size={8}>
                    <strong>{item.itemData?.name?.replace(' (Stock)', '')}</strong>
                    <Tag color="success">In Stock</Tag>
                  </Space>
                  <Space direction="horizontal" size={24}>
                    {(item.itemData?.variations || []).map((variation) => (
                      <Field
                        key={variation.id}
                        name={variation.id}
                        component={InputNumber}
                        type="text"
                        label={variation.itemVariationData?.name}
                        defaultValue={0}
                        min={0}
                        size={'large'}
                        style={{ width: 124 }}
                      />
                    ))}
                  </Space>
                </div>
              ))}

              <SectionTitle form>Configure Meeting</SectionTitle>

              <Field
                name="service"
                component={Select}
                type="text"
                label="Provided Service During Pickup"
                size={'large'}
              >
                {(appointments?.result.items || []).map((item) => (
                  <OptGroup key={item.id} label={item.itemData?.name}>
                    {(item.itemData?.variations || []).map((variation) => (
                      <Option key={variation.id} value={variation.id}>
                        {variation.itemVariationData?.name}
                      </Option>
                    ))}
                  </OptGroup>
                ))}
              </Field>

              <Button
                type="primary"
                htmlType="submit"
                disabled={!valid}
                block
                size="large"
                loading={loading}
              >
                Assign Donation to Customer
              </Button>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default ConsoleCustomers;
