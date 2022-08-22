import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ConsoleContext } from '@/layouts/ConsoleLayout/ConsoleLayout';
import { useQuery } from 'react-query';
import { Button, Divider, List, Space, Typography } from 'antd';
import { Client } from 'square';
import dayjs from 'dayjs';
// import styles from './styles.module.less';

interface AppointmentRowProps {
  client: Client;
  appointment: any;
}

const AppointmentRow = ({ appointment, client }: AppointmentRowProps) => {
  const { data: customer } = useQuery(['customer', appointment.customerId], () =>
    client.customersApi.retrieveCustomer(appointment.customerId),
  );

  const { data: service } = useQuery(
    ['service', appointment.appointmentSegments[0].serviceVariationId],
    () =>
      client.catalogApi.retrieveCatalogObject(
        appointment.appointmentSegments[0].serviceVariationId,
      ),
  );

  return (
    <List.Item
      actions={[
        <Link to={appointment.id}  key="assign">
          <Button type="primary">
            View Details
          </Button>
        </Link>
      ]}
    >
      <List.Item.Meta
        title={
          <span>
            <strong>
              {customer?.result.customer?.givenName} {customer?.result.customer?.familyName}{'   '}–{'   '}{appointment.appointmentSegments[0].durationMinutes}m
            </strong>{' '}
          </span>
        }
        description={
          <Space direction="horizontal" size={14}>
            <span> {dayjs(appointment.startAt).format('YYYY.MM.DD HH:mm')}</span>
            <span>|</span>
            <span> {service?.result.object?.itemVariationData?.name}</span>
          </Space>
        }
      />
    </List.Item>
  );
};

export const ConsoleAppointments = ({}) => {
  const { client } = useOutletContext<ConsoleContext>();
  const {
    data: bookings,
    isLoading,
    refetch,
  } = useQuery('items', () => client.bookingsApi.listBookings());

  return (
    <div>
      <Typography.Title level={1}>Client Appointments</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={bookings?.result.bookings?.filter(b => b.status !== "CANCELLED_BY_SELLER") || []}
        renderItem={(appointment) => <AppointmentRow client={client} appointment={appointment} />}
      />
    </div>
  );
};

export default ConsoleAppointments;
