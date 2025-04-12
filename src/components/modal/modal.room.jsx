import { useState } from 'react';
import {
  CheckSquareOutlined,
} from '@ant-design/icons';
import {
  FooterToolbar,
  ModalForm,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import {
  Col,
  Form,
  message,
  notification,
  Row,
} from 'antd';
import 'react-quill/dist/quill.snow.css';

import '../../styles/reset.scss';
import { callCreateRoom, callUpdateRoom } from '../../config/api.room';

const ROOM_TYPES = [
  { label: 'Single', value: 'SINGLE' },
  { label: 'Double', value: 'DOUBLE' },
  { label: 'Suite', value: 'SUITE' },
  { label: 'Deluxe', value: 'DELUXE' },
  { label: 'Presidential', value: 'PRESIDENTIAL' },
];

const ROOM_FEATURES = [
  { label: 'WiFi', value: 'WIFI' },
  { label: 'TV', value: 'TV' },
  { label: 'Air Conditioning', value: 'AIR_CONDITIONING' },
  { label: 'Minibar', value: 'MINIBAR' },
  { label: 'Sea View', value: 'SEA_VIEW' },
  { label: 'Balcony', value: 'BALCONY' },
];

const ModalRoom = (props) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
  const [form] = Form.useForm();
  const [animation, setAnimation] = useState('open');

  const handleReset = async () => {
    form.resetFields();
    setDataInit(null);

    setAnimation('close');
    await new Promise((r) => setTimeout(r, 400));
    setOpenModal(false);
    setAnimation('open');
  };

  const submitRoom = async (valuesForm) => {
    const {
      roomNumber,
      type,
      pricePerNight,
      maxOccupancy,
      features,
    } = valuesForm;

    if (dataInit?.id) {
      const res = await callUpdateRoom(
        dataInit.id,
        roomNumber,
        type,
        pricePerNight,
        maxOccupancy,
        features,
      );
      if (res.data) {
        message.success('Vaccine updated successfully');
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: 'An error occurred',
          description: res.message,
        });
      }
    } else {

      const res = await callCreateRoom(
        roomNumber,
        type,
        pricePerNight,
        maxOccupancy,
        features,
      );
      if (res.data) {
        message.success('Vaccine created successfully');
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: 'An error occurred',
          description: res.message,
        });
      }
    }
  };

  return (
    <>
      {openModal && (
        <>
          <ModalForm
            title={
              <>
                {dataInit?.id ? 'Update Room' : 'Create New Room'}
              </>
            }
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
            scrollToFirstError={true}
            preserve={false}
            form={form}
            onFinish={submitRoom}
            initialValues={dataInit?.id ? dataInit : {}}
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
              submitButtonProps: {
                icon: <CheckSquareOutlined />,
              },
              searchConfig: {
                resetText: 'Cancel',
                submitText: <>{dataInit?.vaccineId ? 'Update' : 'Create'}</>,
              },
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label="Room Number"
                  name="roomNumber"
                  rules={[{ required: true, message: 'Please do not leave blank' }]}
                  placeholder="Enter room number..."
                />
              </Col>
              <Col span={12}>
                <ProFormSelect
                  label="Type"
                  name="type"
                  rules={[{ required: true, message: 'Please select a room type' }]}
                  placeholder="Select room type"
                  options={ROOM_TYPES}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Price Per Night"
                  name="pricePerNight"
                  rules={[{ required: true, message: 'Please do not leave blank' }]}
                  placeholder="Enter price per night..."
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label="Max Occupancy"
                  name="maxOccupancy"
                  rules={[{ required: true, message: 'Please do not leave blank' }]}
                  placeholder="Enter max occupancy..."
                />
              </Col>
              <Col span={12}>
                <ProFormSelect
                  label="Features"
                  name="features"
                  rules={[{ required: true, message: 'Please select at least one feature' }]}
                  placeholder="Select room features"
                  mode="multiple"
                  options={ROOM_FEATURES}
                />
              </Col>
            </Row>
          </ModalForm>

        </>
      )}
    </>
  );
};

export default ModalRoom;