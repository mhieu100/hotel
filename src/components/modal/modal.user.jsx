import { useState } from 'react';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Col, Form, message, notification, Row } from 'antd';
import {
  FooterToolbar,
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { callUpdateUser } from '../../config/api.user';
import '../../styles/reset.scss';

dayjs.extend(customParseFormat);

const ModalUser = (props) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;

  const [form] = Form.useForm();
  const [animation, setAnimation] = useState('open');


  const submitUser = async (valuesForm) => {
    const { fullname, phone, address, } = valuesForm;
    try {
      if (dataInit?.id) {
        const res = await callUpdateUser(
          dataInit.id,
          fullname,
          address,
          phone
        );

        if (res.data) {
          message.success('User updated successfully');
        } else {
          notification.error({
            message: 'An error occurred',
            description: res.message,
          });
        }
      }
      handleReset();
      reloadTable();
    } catch (error) {
      notification.error({
        message: 'An error occurred',
        description: error.message || 'Unknown error',
      });
    }
  };

  const handleReset = async () => {
    form.resetFields();
    setDataInit(null);
    setAnimation('close');
    await new Promise((resolve) => setTimeout(resolve, 400));
    setOpenModal(false);
    setAnimation('open');
  };


  return (
    <>
      {openModal && (
        <ModalForm
          title='Update User'
          open={openModal}
          modalProps={{
            onCancel: () => {
              handleReset();
            },
            afterClose: () => handleReset(),
            destroyOnClose: true,
            footer: null,
            keyboard: false,
            maskClosable: false,
            className: `modal-company ${animation}`,
            rootClassName: `modal-company-root ${animation}`,
          }}
          scrollToFirstError
          preserve={false}
          form={form}
          onFinish={submitUser}
          initialValues={dataInit}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            submitButtonProps: {
              icon: <CheckSquareOutlined />,
            },
            searchConfig: {
              resetText: 'Cancel',
              submitText: 'Update',
            },
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <ProFormText
                label="User Name"
                name="fullname"
                rules={[{ required: true, message: 'Please do not leave blank' }]}
                placeholder="Enter user name..."
              />
            </Col>
            <Col span={12}>
              <ProFormText
                label="Email"
                name="email"
                disabled
              />
            </Col>
            <Col span={12}>
              <ProFormText
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please do not leave blank' }]}
                placeholder="Enter phone number..."
              />
            </Col>
            <Col span={12}>
              <ProFormText
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please do not leave blank' }]}
                placeholder="Enter address..."
              />
            </Col>
          </Row>
        </ModalForm>
      )}
    </>
  );
};

export default ModalUser;