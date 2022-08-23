import React, { useMemo } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { DonationAppointmentProposal } from '@/API';
import {
  getDonationAppointmentProposal,
  listDonationAppointmentProposals,
} from '../../../graphql/queries';
import styles from './styles.module.less';
import { useQuery as useReactQuery, useMutation } from 'react-query';
import { ProjectContext } from '@/layouts/ProjectLayout';
import { ConsoleContext } from '@/layouts/ConsoleLayout/ConsoleLayout';
import { Badge, Button, Card, Col, Descriptions, List, Row, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { SpinnerOverlay } from '@/components/SpinnerOverlay';
import { API } from 'aws-amplify';
import If from '@/components/If';
import {CheckCircleFilled} from "@ant-design/icons";

interface Props {}

export const ConsoleAppointmentDetails = ({}: Props) => {
  const { appointmentId } = useParams();
  const { client, project } = useOutletContext<ConsoleContext>();
  const {
    data: proposedAppointments, //  { getDonationAppointmentProposal: proposal }
  } = useQuery<{ listDonationAppointmentProposals }>(gql(listDonationAppointmentProposals), {
    variables: {
      filter: {
        appointmentId: { eq: appointmentId },
      },
    },
  });

  const proposedAppointment = useMemo(() => {
    if (
      proposedAppointments?.listDonationAppointmentProposals &&
      proposedAppointments?.listDonationAppointmentProposals.items.length > 0
    ) {
      return proposedAppointments?.listDonationAppointmentProposals.items[0];
    }
    return null;
  }, [proposedAppointments]);

  const { data: customer } = useReactQuery(
    ['customer', proposedAppointment?.customerId],
    () => {
      return client.customersApi.retrieveCustomer(proposedAppointment?.customerId as string);
    },
    {
      enabled: proposedAppointment?.customerId !== null,
    },
  );

  const { data: order, refetch } = useReactQuery(
    ['order', proposedAppointment?.orderId],
    () => {
      return client.ordersApi.retrieveOrder(proposedAppointment?.orderId as string);
    },
    {
      enabled: proposedAppointment?.orderId !== null,
    },
  );

  const { data: booking } = useReactQuery(
    ['booking', proposedAppointment?.appointmentId],
    () => {
      return client.bookingsApi.retrieveBooking(proposedAppointment?.appointmentId as string);
    },
    {
      enabled: proposedAppointment?.appointmentId !== null,
    },
  );

  const { data: service } = useReactQuery(
    ['service', proposedAppointment?.serviceId],
    () => {
      return client.catalogApi.retrieveCatalogObject(proposedAppointment?.serviceId as string);
    },
    {
      enabled: proposedAppointment?.serviceId !== null,
    },
  );

  console.log({ proposedAppointment, customer, order, booking, service });
  if (!proposedAppointment || !customer || !order || !booking || !service) {
    return <SpinnerOverlay spinning={true} />;
  }

  const complete = async () => {
    await client.ordersApi.updateOrder(order?.result.order?.id as string, {
      order: {
        locationId: project.defaultLocationId as string,
        state: 'COMPLETED',
        version: order?.result.order?.version,
      },
    });

    refetch();
  };

  return (
    <div>
      <div className={styles.topRow}>
        <Typography.Title level={1}>
          Meeting with {customer?.result.customer?.givenName}{' '}
          {customer?.result.customer?.familyName}
          <If
            condition={order.result.order?.state === 'COMPLETED'}
            then={() => (<CheckCircleFilled style={{ color: '#52c41a', fontSize: 28, marginLeft: 12 }} /> )} />

        </Typography.Title>
        <If
          condition={order.result.order?.state !== 'COMPLETED'}
          then={() => (
            <Space size={12} direction="horizontal">
              <Button size="large" className={styles.button}>
                Cancel
              </Button>
              <Button type="primary" size="large" className={styles.button} onClick={complete}>
                Complete
              </Button>
            </Space>
          )}
        />
      </div>

      <Row gutter={36}>
        <Col span={10}>
          <Card title="Client">
            <Descriptions layout="vertical" colon={false}>
              <Descriptions.Item label="Name">
                {customer?.result.customer?.givenName} {customer?.result.customer?.familyName}
              </Descriptions.Item>
              <Descriptions.Item label="Birthday">
                {dayjs(customer?.result.customer?.birthday).format('YYYY.MM.DD')}
              </Descriptions.Item>
              <Descriptions.Item label="E-mail">
                {customer?.result.customer?.emailAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Joined">
                {dayjs(customer?.result.customer?.createdAt).format('YYYY.MM.DD')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={14}>
          <Card title="Appointment">
            <Descriptions layout="vertical" colon={false}>
              <Descriptions.Item label="Service">
                {service.result.object?.itemVariationData?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Start">
                {dayjs(booking?.result.booking?.startAt).format('YYYY.MM.DD HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="Duration">
                {(booking?.result.booking?.appointmentSegments as any)[0].durationMinutes}m
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {booking?.result.booking?.status}
              </Descriptions.Item>
              <Descriptions.Item label="Booked at">
                {dayjs(booking?.result.booking?.createdAt).format('YYYY.MM.DD HH:mm')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <Space direction="horizontal" size={16}>
            <span>Donation Package</span>
            <Tag color={order.result.order?.state === 'COMPLETED' ? 'success' : 'default'}>
              {order.result.order?.state}
            </Tag>
          </Space>
        }
        style={{ marginTop: 36 }}
      >

      </Card>
    </div>
  );
};

export default ConsoleAppointmentDetails;
