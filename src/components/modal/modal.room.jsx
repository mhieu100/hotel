import { useState } from 'react';
import {
  CheckSquareOutlined,
  InboxOutlined,
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
  Upload,
} from 'antd';
import 'react-quill/dist/quill.snow.css';

import '../../styles/reset.scss';
import { callCreateRoom, callUpdateRoom } from '../../config/api.room';
import { callUploadSingleFile } from '../../config/api.file';

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
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setimageUrl] = useState(null);

  const handleReset = async () => {
    form.resetFields();
    setDataInit(null);

    setAnimation('close');
    await new Promise((r) => setTimeout(r, 400));
    setOpenModal(false);
    setAnimation('open');
  };

  const handleUpload = async (file) => {
    try {
      const res = await callUploadSingleFile(file, 'rooms');
      if (res?.data?.fileName) {
        return res.data.fileName;
      }
      throw new Error('Upload failed');
    } catch (error) {
      message.error('Không thể tải ảnh lên');
      return null;
    }
  };

  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Bạn chỉ có thể tải lên file ảnh!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 2MB!');
        return false;
      }
      setFileList([file]);
      return false;
    },
    onChange: (info) => {
      setFileList(info.fileList);
    },
    fileList,
  };

  const submitRoom = async (valuesForm) => {
    const {
      roomNumber,
      type,
      pricePerNight,
      maxOccupancy,
      features,
    } = valuesForm;

    // Upload image if exists
    let imageUrl = null;
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      if (!file) {
        message.error('Có lỗi với file ảnh, vui lòng thử lại');
        return;
      }
      imageUrl = await handleUpload(file);
      if (!imageUrl) {
        return; // Stop if image upload failed
      }
    }

    if (dataInit?.id) {
      const res = await callUpdateRoom(
        dataInit.id,
        roomNumber,
        type,
        pricePerNight,
        maxOccupancy,
        features,
        imageUrl || dataInit.imageUrl // Keep old image if no new upload
      );
      if (res.data) {
        message.success('Cập nhật phòng thành công');
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
          description: res.message,
        });
      }
    } else {
      console.log(imageUrl)
      const res = await callCreateRoom(
        roomNumber,
        type,
        pricePerNight,
        maxOccupancy,
        features,
        imageUrl
      );
      console.log(res)
      if (res.data) {
        message.success('Tạo phòng mới thành công');
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: 'Có lỗi xảy ra',
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
              <Col span={24}>
                <Form.Item
                  label="Ảnh phòng"
                  name="image"
                  rules={[{ required: !dataInit?.id, message: 'Vui lòng tải lên ảnh phòng' }]}
                >
                  <Upload.Dragger {...uploadProps} maxCount={1}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Nhấp hoặc kéo thả file ảnh vào đây</p>
                    <p className="ant-upload-hint">
                      Hỗ trợ tải lên một ảnh duy nhất. Kích thước tối đa 2MB.
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Col>
            </Row>
          </ModalForm>
        </>
      )}
    </>
  );
};

export default ModalRoom;