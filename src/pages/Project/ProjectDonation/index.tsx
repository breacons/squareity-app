import React, { useCallback, useMemo, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { ProjectContext } from '@/layouts/ProjectLayout';
import { Badge, Button, Card, Col, Divider, Image, Row, Space, Typography } from 'antd';
import styles from './styles.module.less';
import _ from 'lodash-es';
import { Price } from '../../../locale/Price';
import { SpinnerOverlay } from '@/components/SpinnerOverlay';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import If from '@/components/If';
import { APP_URL } from '@/lib/config';
import { Field } from 'react-final-form';
import Input from '@/components/Form/Input';
import BirthDateField from '@/components/Form/Fields/BirthDateField';
import { Form } from '@/components/Form';
import { joi } from '@/lib/joi';
interface Props {}

interface CartItem {
  variationId?: string;
  name?: string;
  variationName?: string;
  imageUrl?: string;
  quantity: number;
  price?: any;
  image?: string;
}

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

export const ProjectDonation = ({}: Props) => {
  const { client, slug, project } = useOutletContext<ProjectContext>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useQuery('items', () =>
    client.catalogApi.searchCatalogObjects({
      includeRelatedObjects: true,
      objectTypes: ['ITEM'],
      includeDeletedObjects: false,
      query: {
        exactQuery: {
          attributeName: 'category_id',
          attributeValue: project.donationCategoryId as string,
        },
      },
    }),
  );

  const addCartItem = (item: CartItem) => {
    const updated = cart.map((i) => {
      if (i.variationId === item.variationId) {
        return {
          ...i,
          quantity: i.quantity + item.quantity,
        };
      }

      return i;
    });

    if (_.isEqual(updated, cart)) {
      return setCart([...cart, item]);
    }

    return setCart(updated);
  };

  const removeCartItem = (item: CartItem) => {
    const updated = cart.map((i) => {
      if (i.variationId === item.variationId) {
        if (i.quantity - item.quantity < 1) {
          return null;
        }

        return {
          ...i,
          quantity: i.quantity - item.quantity,
        };
      }

      return i;
    });

    return setCart(_.reject(updated, (i) => i === null));
  };

  const checkout = async (values) => {
    setLoading(true);
    const customer = await client.customersApi.createCustomer(values);

    if (customer.result.customer?.id) {
      const group = await client.customersApi.addGroupToCustomer(
        customer.result.customer?.id,
        project.donorCustomerGroupId as string,
      );
    }

    const paymentLink = await client.checkoutApi.createPaymentLink({
      order: {
        locationId: project.defaultLocationId as string,
        customerId: customer.result.customer?.id,
        lineItems: cart.map((item) => ({
          quantity: item.quantity.toString(),
          catalogObjectId: item.variationId,
        })),
      },
      checkoutOptions: {
        redirectUrl: `${APP_URL}/${slug}/donate/success`,
      },
    });

    if (paymentLink.result.paymentLink?.url) {
      window.location.replace(paymentLink.result.paymentLink?.url);
    }
  };

  const price = useMemo(() => {
    return cart.reduce((sum, current) => sum + Number(current.price.amount) * current.quantity, 0);
  }, [cart]);

  const findImage = useCallback(
    (itemData) => {
      if (!itemData?.imageIds || itemData?.imageIds.length === 0) {
        return '';
      }

      const image = relatedObjects?.find((r) => r.id === itemData?.imageIds[0]);

      if (!image) {
        return '';
      }

      return image?.imageData?.url;
    },
    [data?.result?.relatedObjects],
  );

  const getQuantity = useCallback(
    (variationId) => {
      const item = cart.find((c) => c.variationId === variationId);

      if (!item) {
        return 0;
      }

      return item.quantity;
    },
    [cart],
  );

  if (isLoading || !data?.result) {
    return <SpinnerOverlay spinning />;
  }

  const { objects, relatedObjects } = data?.result;

  if (!relatedObjects || !objects) {
    return <Typography.Title level={2}>Looks like this shop is empty 😕.</Typography.Title>;
  }

  return (
    <div className={styles.container}>
      <Typography.Title level={1} className={styles.heroTitle}>
        We deliver your support.
      </Typography.Title>
      <Typography.Paragraph className={styles.description}>
        Your donation will be spent on exactly what you choose. You can trace it all the way to the
        delivery.
      </Typography.Paragraph>

      <Row gutter={56} style={{ marginTop: 60 }} align="top">
        <Col span={16}>
          <Row gutter={32}>
            {objects
              .filter((item) => item.type === 'ITEM')
              .map((object) => (
                <Col key={object.id} span={8} style={{ display: 'flex' }}>
                  <Card
                    className={styles.card}
                    // hoverable
                    style={{ width: '100%' }}
                    cover={
                      <Image
                        preview={false}
                        src={findImage(object.itemData)}
                        className={styles.itemImage}
                      />
                    }
                  >
                    <Card.Meta
                      title={object?.itemData?.name}
                      description={<p>{object?.itemData?.description}</p>}
                    />
                    {(object?.itemData?.variations || []).map((variation) => (
                      <div key={variation.id} className={styles.variationRow}>
                        <Space direction="vertical" size={0}>
                          <Typography.Text strong>
                            {variation?.itemVariationData?.name}
                          </Typography.Text>
                          <Price
                            currency={variation?.itemVariationData?.priceMoney?.currency as string}
                            amount={Number(variation?.itemVariationData?.priceMoney?.amount)}
                            maximumFractionDigits={2}
                            minimumFractionDigits={2}
                          />
                        </Space>

                        <Space direction="horizontal" size={12}>
                          <Button
                            size="small"
                            shape="circle"
                            icon={<MinusOutlined />}
                            onClick={() =>
                              removeCartItem({
                                ...variation.itemVariationData,
                                quantity: 1,
                                variationId: variation?.id,
                              })
                            }
                          />
                          <span>{getQuantity(variation.id)}</span>
                          <Button
                            size="small"
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() =>
                              addCartItem({
                                ...variation.itemVariationData,
                                variationName: variation?.itemVariationData?.name,
                                variationId: variation?.id,
                                name: object?.itemData?.name,
                                quantity: 1,
                                price: variation?.itemVariationData?.priceMoney,
                                image: findImage(object.itemData),
                              })
                            }
                          />
                        </Space>
                      </div>
                    ))}
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
        <Col span={8}>
          <Form validator={validator} onSubmit={checkout} initialValues={{}} preventPrompt={true}>
            {({ valid }) => (
              <Space direction="vertical" size={36}>
                <div className={styles.cart}>
                  <If
                    condition={cart.length === 0}
                    then={() => <div className={styles.emptyCart}>Your cart is empty 🥺.</div>}
                  />
                  {cart.map((item) => (
                    <div key={item.variationId} className={styles.cartItem}>
                      <Badge count={item.quantity} color="blue">
                        <Image preview={false} src={item.image} className={styles.cartImage} />
                      </Badge>
                      <Space
                        direction="vertical"
                        size={0}
                        style={{ paddingRight: 30, marginLeft: 18, flexGrow: 1 }}
                      >
                        <Typography.Text strong>{item.name}</Typography.Text>
                        <Typography.Text>
                          <small>
                            {item.variationName} –{' '}
                            <Price
                              currency={item.price.currency as string}
                              amount={Number(item.price.amount)}
                              maximumFractionDigits={2}
                              minimumFractionDigits={2}
                            />
                          </small>
                        </Typography.Text>
                      </Space>

                      <Price
                        currency={item.price.currency as string}
                        amount={Number(item.price.amount) * item.quantity}
                        maximumFractionDigits={2}
                        minimumFractionDigits={2}
                      />
                    </div>
                  ))}
                  <Divider />
                  <div className={styles.totalRow}>
                    <Typography.Title level={4} style={{ fontWeight: 400 }}>
                      Total
                    </Typography.Title>
                    <Typography.Title level={3}>
                      <Price
                        currency={cart[0] ? cart[0].price.currency : 'USD'}
                        amount={price || 0}
                        maximumFractionDigits={2}
                        minimumFractionDigits={2}
                      />
                    </Typography.Title>
                  </div>
                </div>
                <div className={styles.cart}>
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
                    <Button
                      // onClick={checkout}
                      loading={loading}
                      htmlType="submit"
                      block
                      size="large"
                      type="primary"
                      disabled={!price || price === 0 || !valid}
                    >
                      <Typography.Text strong style={{ color: 'white' }}>
                        Checkout Donation
                      </Typography.Text>
                    </Button>
                  </Row>
                </div>
              </Space>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDonation;
