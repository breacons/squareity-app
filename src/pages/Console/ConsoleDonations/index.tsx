import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ConsoleContext } from '@/layouts/ConsoleLayout/ConsoleLayout';
import { useQuery } from 'react-query';
import {Button, Divider, List, message, Tag, Typography} from 'antd';
import { apolloClient } from '@/lib/apollo';
import dayjs from 'dayjs';
import { listDonationItemPairs } from '../../../graphql/queries';
import { gql } from '@apollo/client';
import { nanoid } from 'nanoid';
import { Price } from '../../../locale/Price';
import { InventorySlider } from '@/components/InventorySlider';

interface Props {}
export const ConsoleDonations = ({}: Props) => {
  const { client, project } = useOutletContext<ConsoleContext>();
  const [loadingOrder, setLoadingOrder] = useState<any>(null);
  const [retryCounter, setRetryCounter] = useState(0);
  const { data, isLoading, refetch } = useQuery(
    ['orders', project.id],
    () =>
      client.ordersApi.searchOrders({
        locationIds: [project?.defaultLocationId as string], // FIXME
        query: {
          filter: {
            stateFilter: {
              states: ['OPEN', 'COMPLETED'],
            },
          },
        },
      }),
    {
      enabled: !!project,
    },
  );

  const exchangeDonation = async (order) => {
    setLoadingOrder(order);
    const ids = order.lineItems.map((item) => item.catalogObjectId);

    console.log('exchangeDonation', ids);
    const itemPairs = await apolloClient.query({
      query: gql(listDonationItemPairs),
      variables: { filter: { or: ids.map((id) => ({ virtualItemId: { eq: id } })) } },
    });

    console.log({ itemPairs });

    const pairs = itemPairs.data.listDonationItemPairs.items || [];

    const inventory = await client.inventoryApi.batchChangeInventory({
      idempotencyKey: nanoid(),
      changes: pairs.map((pair) => {
        const virtual = order.lineItems.find((item) => item.catalogObjectId === pair.virtualItemId);

        return {
          type: 'ADJUSTMENT',
          adjustment: {
            catalogObjectId: pair.physicalItemId,
            locationId: project.defaultLocationId,
            occurredAt: dayjs().toISOString(),
            quantity: virtual.quantity,
            fromState: 'NONE',
            toState: 'IN_STOCK',
          },
        };
      }),
    });

    const updatedOrder = await client.ordersApi.updateOrder(order.id, {
      order: {
        locationId: order.locationId,
        state: 'COMPLETED',
        version: order.version,
        fulfillments: (order.fulfillments || []).map((fulfillment) => ({
          ...fulfillment,
          state: 'COMPLETED',
        })),
      },
    });

    await refetch();
    setRetryCounter(retryCounter + 1);
    setLoadingOrder(null);
    message.success('Donation was exchanged to stock items');

    console.log({ updatedOrder });
  };

  return (
    <div>
      <Typography.Title level={1}>Donations</Typography.Title>
      <InventorySlider project={project} client={client} retryCounter={retryCounter} />
      <Divider />
      <Typography.Title level={2}>Donation orders</Typography.Title>

      <List
        itemLayout="horizontal"
        dataSource={data?.result?.orders || []}
        renderItem={(order) => (
          <List.Item
            actions={[
              order.state === 'OPEN' && (
                <Button
                  key="exchange"
                  type="primary"
                  onClick={() => exchangeDonation(order)}
                  loading={loadingOrder !== null && loadingOrder?.id === order.id}
                >
                  Exchange donation to stock
                </Button>
              ),
            ]}
          >
            <List.Item.Meta
              title={
                <span>
                  <strong>
                    <Price
                      currency={order?.totalMoney?.currency}
                      amount={Number(order?.totalMoney?.amount)}
                      maximumFractionDigits={2}
                      minimumFractionDigits={2}
                    />
                  </strong>{' '}
                  – #{order?.id?.slice(0, 6).toUpperCase()} –{' '}
                  {dayjs(order.createdAt).format('YYYY.MM.DD. HH:mm')}{' '}
                  <Tag color={order.state === 'COMPLETED' ? 'green' : 'default'}>{order.state}</Tag>
                </span>
              }
              description={
                <div>
                  {(order.lineItems || []).map((item) => (
                    <li key={item.catalogObjectId}>
                      {item.name} {item.variationName} x{item.quantity} –{' '}
                      <Price
                        currency={item?.totalMoney?.currency}
                        amount={Number(item?.totalMoney?.amount)}
                        maximumFractionDigits={2}
                        minimumFractionDigits={2}
                      />
                    </li>
                  ))}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ConsoleDonations;
