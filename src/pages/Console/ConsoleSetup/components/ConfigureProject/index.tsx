import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ConsoleContext } from '@/layouts/ConsoleLayout/ConsoleLayout';
import { Project } from '@/API';
import { useQuery } from 'react-query';
import { Button, Col, Divider, message, Row } from 'antd';
import { Field } from 'react-final-form';
import Input, { TextArea } from '@/components/Form/Input';
import { Form } from '@/components/Form';
import { joi } from '@/lib/joi';
import Select, { Option } from '@/components/Form/Select';
import { apolloClient } from '@/lib/apollo';
import { gql } from '@apollo/client';
import { createDonationAppointmentProposal, updateProject } from '../../../../../graphql/mutations';
import { nanoid } from 'nanoid';

interface Props {
  project?: Project | null;
}

const validator = joi
  .object({
    defaultLocationId: joi.string().required(),
    donationCategoryName: joi.string().required(),
    stockCategoryName: joi.string().required(),
    donorGroupName: joi.string().required(),
    clientGroupName: joi.string().required(),
  })
  .unknown()
  .required();

export const ConfigureProject = ({ project }: Props) => {
  const { client } = useOutletContext<ConsoleContext>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: locations } = useQuery(
    [project?.id, 'locations'],
    () => client.locationsApi.listLocations(),
    { enabled: !!project?.id },
  );

  const submitForm = async (values) => {
    setLoading(true);
    const donationCategory = await client.catalogApi.upsertCatalogObject({
      idempotencyKey: nanoid(),
      object: {
        categoryData: {
          name: values.donationCategoryName,
        },
        id: `#${nanoid()}`,
        type: 'CATEGORY',
      },
    });

    const stockCategory = await client.catalogApi.upsertCatalogObject({
      idempotencyKey: nanoid(),
      object: {
        categoryData: {
          name: values.stockCategoryName,
        },
        id: `#${nanoid()}`,
        type: 'CATEGORY',
      },
    });

    const donorGroup = await client.customerGroupsApi.createCustomerGroup({
      group: {
        name: values.donorGroupName,
      },
    });
    const clientGroup = await client.customerGroupsApi.createCustomerGroup({
      group: {
        name: values.clientGroupName,
      },
    });

    const updatedProject = await apolloClient.mutate({
      mutation: gql(updateProject),
      variables: {
        input: {
          id: project?.id,
          defaultLocationId: values.defaultLocationId,
          donationCategoryId: donationCategory.result.catalogObject?.id,
          stockCategoryId: stockCategory.result.catalogObject?.id,
          donorCustomerGroupId: donorGroup.result.group?.id,
          clientCustomerGroupId: clientGroup.result.group?.id,
        },
      },
    });

    message.success('Project Successfully Configured!');
    navigate('/console/customers', { replace: true });
    setLoading(false);
  };

  return (
    <div>
      <Form validator={validator} onSubmit={submitForm} initialValues={{...project}}>
        {({ valid }) => (
          <>
            <Row gutter={16}>
              <Col span={24}>
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

              <Col span={12}>
                <Field
                  name="donationCategoryName"
                  component={Input}
                  type="text"
                  placeholder="Donation"
                  label="Title for Purchasable Donation Items Category"
                  size="large"
                />
              </Col>
              <Col span={12}>
                <Field
                  name="stockCategoryName"
                  component={Input}
                  type="text"
                  placeholder="Stock"
                  label="Title for Distributed Donation Items Category"
                  size="large"
                />
              </Col>
              <Col span={12}>
                <Field
                  name="donorGroupName"
                  component={Input}
                  type="text"
                  placeholder="Donors"
                  label="Title for Donor Customer Group"
                  size="large"
                />
              </Col>
              <Col span={12}>
                <Field
                  name="clientGroupName"
                  component={Input}
                  type="text"
                  placeholder="Clients"
                  label="Title for Client Customer Group"
                  size="large"
                />
              </Col>
              <Divider />
              <Col span={8}>
                <Field
                  name="heroTitle"
                  component={Input}
                  type="text"
                  placeholder="Lorem ipsum dolor sit amet."
                  label="Title on Landing Page"
                  size="large"
                />
              </Col>

              <Col span={16}>
                <Field
                  name="description"
                  component={TextArea}
                  type="text"
                  placeholder="Lorem ipsum dolor sit amet."
                  label="Description on Landing Page"
                  size="large"
                  style={{height: 80}}
                />
              </Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!valid}
                size="large"
                loading={loading}
              >
                Save Project
              </Button>
            </Row>
          </>
        )}
      </Form>
    </div>
  );
};

export default ConfigureProject;
