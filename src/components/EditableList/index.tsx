import React, { ReactNode, useRef, useState } from 'react';
import { Button, Divider, List, Modal, Space } from 'antd';
import { SectionTitle } from '@/components/Typography';
import { FormattedMessage } from 'react-intl';
import { Form } from '@/components/Form';
import If from '@/components/If';
import styles from '@/pages/Families/FamilyDetails/tabs/styles.module.less';
import _ from 'lodash-es';
import { gql, useMutation } from '@apollo/client';
import { nanoid } from 'nanoid';

interface Props {
  data: any[] | null | undefined;
  title: ReactNode;
  createLabel: ReactNode;
  form: {
    content: ReactNode;
    validator: any;
    // submit: (values) => void;
    // loading: boolean;
    // error: any;
    createMutation: string;
    extraValues?: any;
    updateMutation: string;
  };
  renderItem: (item: any) => {
    title?: ReactNode;
    description?: ReactNode;
    content?: ReactNode;
  };
}

export const EditableList = ({ data, title, createLabel, form, renderItem }: Props) => {
  const formRef = useRef<any>();
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [runCreate, { loading: createLoading, error: createError }] = useMutation(
    gql(form.createMutation),
  );

  const [runUpdate, { loading: updateLoading, error: updateError }] = useMutation(
    gql(form.updateMutation),
  );

  const onSelectItem = (item) => {
    if (formRef && formRef.current) {
      formRef.current.reset();
    }
    setSelectedItem(item);
  };

  const onSubmit = async (values) => {
    let result;
    if (values.id) {
      result = await runUpdate({ variables: { input: values } });
    } else {
      result = await runCreate({
        variables: { input: { ...values, id: nanoid() } },
      });
    }

    if (!result.error) {
      onSelectItem(null);
    }
  };

  return (
    <div className={styles.container}>
      <SectionTitle
        form
        right={
          <Button type="primary" onClick={() => onSelectItem({})}>
            {createLabel}
          </Button>
        }
      >
        {title}
      </SectionTitle>
      <List
        itemLayout="horizontal"
        bordered
        dataSource={data || []}
        renderItem={(item) => {
          const { title, content, description } = renderItem(item);

          return (
            <List.Item
              actions={[
                <a key="list-loadmore-edit" onClick={() => onSelectItem(item)}>
                  <FormattedMessage defaultMessage="Szerkesztés" />
                </a>,
              ]}
            >
              <List.Item.Meta title={title} description={description} />
              <If condition={content} then={() => content} />
            </List.Item>
          );
        }}
      />
      <Modal
        title={createLabel}
        visible={selectedItem !== null}
        onOk={() => setSelectedItem(null)}
        onCancel={() => setSelectedItem(null)}
        footer={null}
        width={960}
      >
        <Form
          validator={form.validator}
          onSubmit={onSubmit}
          initialValues={
            {
              ...form.extraValues,
              ..._.omit(selectedItem, '__typename', 'createdAt', 'updatedAt'),
            } || {}
          }
          innerRef={formRef}
        >
          {({ valid, ...rest }) => {
            return (
              <>
                {form.content}
                <Divider />
                <Space direction="horizontal" size={16} className={styles.modalFooter}>
                  <Button type="default" htmlType="submit" onClick={() => setSelectedItem(null)}>
                    <FormattedMessage defaultMessage="Mégsem" />
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={!valid}
                    loading={createLoading || updateLoading}
                  >
                    <FormattedMessage defaultMessage="Mentés" />
                  </Button>
                </Space>
              </>
            );
          }}
        </Form>
      </Modal>
    </div>
  );
};

export default EditableList;
