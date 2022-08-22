import React, {useMemo} from 'react';
import {Space, Statistic} from "antd";
import styles from "@/pages/Console/ConsoleDonations/styles.module.less";
import {useQuery} from "react-query";
import {Project} from "@/API";
import {Client} from "square";
import _ from 'lodash-es'

interface Props {
  project: Project,
  client: Client,
  retryCounter: number
}

export const InventorySlider = ({project, client, retryCounter}: Props) => {

  const { data: stockItems } = useQuery(['stockItems', project.id], () =>
    client.catalogApi.searchCatalogObjects({
      includeRelatedObjects: true,
      objectTypes: ['ITEM'],
      includeDeletedObjects: false,
      query: {
        exactQuery: {
          attributeName: 'category_id',
          attributeValue: project.stockCategoryId as string,
        },
      },
    }),
  );

  const { data: inventoryCounts, refetch: refetchInventory } = useQuery(
    ['counts', project.id, retryCounter],
    () =>
      client.inventoryApi.batchRetrieveInventoryCounts({
        catalogObjectIds: _.flattenDeep(
          (stockItems?.result?.objects || []).map((o) =>
            (o?.itemData?.variations || []).map((v) => v.id),
          ),
        ),
      }),
    { enabled: !!stockItems?.result.objects },
  );

  const inventoryDisplay = useMemo(() => {
    if (!inventoryCounts) {
      return null;
    }

    const result = (stockItems?.result?.objects || []).map((o) => ({
      name: o.itemData?.name,
      count: _.sum(
        (o?.itemData?.variations || []).map((v) => {
          const c = (inventoryCounts.result?.counts || []).find((i) => i.catalogObjectId === v.id);

          return c ? parseInt(c?.quantity || '', 10) : 0;
        }),
      ),
    }));
    console.log({ result });

    return result
      .filter((r) => r.count > 0)
      .map((r) => (
        <Statistic
          title={<span className={styles.inventoryLabel}>{r.name}</span>}
          value={r.count}
          key={r.name}
        />
      ));
  }, [inventoryCounts, stockItems]);

  return (
    <Space direction="horizontal" size={32}>
      {inventoryDisplay}
    </Space>
  )
}
