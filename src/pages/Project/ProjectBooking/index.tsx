import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useOutletContext, useParams} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from 'react-query';
import { getDonationAppointmentProposal } from '../../../graphql/queries';
import styles from './styles.module.less';
import { Button, Calendar, Col, Divider, Row, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { ProjectContext } from '@/layouts/ProjectLayout';
import { DonationAppointmentProposal } from '@/API';
import utc from 'dayjs/plugin/utc';
import { apolloClient } from '@/lib/apollo';
import { updateDonationAppointmentProposal } from '../../../graphql/mutations';
import If from '@/components/If';
import CustomSpinner from '@/components/CustomSpinner';
import { CheckCircleFilled } from '@ant-design/icons';

dayjs.extend(utc);

interface Props {}

export const ProjectBooking = ({}: Props) => {
  const defaultDate = dayjs().add(1, 'day');
  const [date, setDate] = useState<Dayjs | any>(defaultDate);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const { bookingId } = useParams();
  const { client, slug, project } = useOutletContext<ProjectContext>();

  console.log(project)
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    data: proposal, //  { getDonationAppointmentProposal: proposal }
  } = useQuery<{ getDonationAppointmentProposal: DonationAppointmentProposal }>(
    gql(getDonationAppointmentProposal),
    {
      variables: {
        id: bookingId,
      },
    },
  );

  console.log({
    query: {
      filter: {
        locationId: project.defaultLocationId as string,
        startAtRange: {
          startAt: date.utcOffset(0).startOf('date').toISOString(),
          endAt: date.utcOffset(0).add(1, 'day').startOf('date').toISOString(),
        },
        segmentFilters: [
          {
            serviceVariationId: proposal?.getDonationAppointmentProposal?.serviceId as string,
          },
        ],
      },
    },
  })

  const {
    data: slots,
    mutate: fetchSlots,
    isLoading: slotsLoading,
  } = useMutation((v: any) =>
    client.bookingsApi.searchAvailability({
      query: {
        filter: {
          locationId: project.defaultLocationId as string,
          startAtRange: {
            startAt: date.utcOffset(0).startOf('date').toISOString(),
            endAt: date.utcOffset(0).add(1, 'day').startOf('date').toISOString(),
          },
          segmentFilters: [
            {
              serviceVariationId: proposal?.getDonationAppointmentProposal?.serviceId as string,
            },
          ],
        },
      },
    }),
  );

  const schedule = async () => {
    setLoading(true);
    // TODO: confirmation
    const slot = selectedSlot;
    const booking = await client.bookingsApi.createBooking({
      booking: {
        customerId: proposal?.getDonationAppointmentProposal.customerId,
        ...slot,
      },
    });

    const bookingId = booking?.result?.booking?.id;

    const appointmentProposal = await apolloClient.mutate({
      mutation: gql(updateDonationAppointmentProposal),
      variables: {
        input: {
          id: proposal?.getDonationAppointmentProposal.id,
          appointmentId: bookingId,
        },
      },
    });

    console.log({ booking, appointmentProposal });
    setSuccess(true);
    setLoading(false);
  };

  useEffect(() => {
    if (date && proposal) {
      fetchSlots(null);
    }
  }, [date, proposal]);

  // if(proposal?.getDonationAppointmentProposal.appointmentId !== null) {
  //   navigate(`/${slug}`)
  // }

  // TODO: success screen
  return (
    <div className={styles.container}>
      <If
        condition={success}
        then={() => (
          <div>
            <CheckCircleFilled
              style={{ fontSize: 80, color: '#52c41a', marginBottom: 40, marginTop: 40 }}
            />
            <Typography.Title level={1} className={styles.heroTitle}>
              Appointment scheduled
            </Typography.Title>
            <Typography.Paragraph className={styles.description} style={{ marginTop: 30 }}>
              See you at {dayjs(selectedSlot?.startAt).format("YYYY.MM.DD HH:mm")}!
            </Typography.Paragraph>
            <Link to={`/${slug}`}>
              <Button type="primary" size="large" className={styles.button}>
                Return to home
              </Button>
            </Link>
          </div>
        )}
        else={() => (
          <>
            <Typography.Title level={1} className={styles.heroTitle}>
              Schedule appointment
            </Typography.Title>
            <Typography.Paragraph className={styles.description}>
              Select a suitable date and time, for meeting our team and picking up your package!
            </Typography.Paragraph>
            <Row gutter={56} style={{ marginTop: 60 }} align="top">
              <Col span={6}>
                <Calendar
                  fullscreen={false}
                  value={date}
                  onChange={(date) => setDate(date)}
                  // disabledDate={(current) => {
                  //   console.log(current)
                  //   if (date.endOf('date') < dayjs()) {
                  //     return true;
                  //   }
                  //   return false;
                  // }}
                />
              </Col>
              <Col span={14}>
                <If condition={!slots || slotsLoading} then={() => <CustomSpinner size={48} />} />
                <If
                  condition={
                    slots?.result.availabilities?.length === 0 ||
                    (slots?.result?.errors || []).length > 0
                  }
                  then={() => (
                    <Typography.Paragraph className={styles.description}>
                      There are no available appointments on this day 😕.
                    </Typography.Paragraph>
                  )}
                />
                <div>
                  {(slots?.result.availabilities || []).map((item) => (
                    <Button
                      onClick={() => setSelectedSlot(item)}
                      size="large"
                      key={item.startAt}
                      className={styles.button}
                      type={item.startAt === selectedSlot?.startAt ? 'primary' : 'default'}
                    >
                      {dayjs(item.startAt).format('HH:mm')}
                    </Button>
                  ))}
                </div>
                <Divider style={{ marginBottom: 48 }} />
                <Button
                  onClick={() => schedule()}
                  disabled={!selectedSlot}
                  className={styles.button}
                  size="large"
                  type="primary"
                  loading={loading}
                >
                  Schedule appointment
                </Button>
              </Col>
            </Row>
          </>
        )}
      />
    </div>
  );
};

export default ProjectBooking;
