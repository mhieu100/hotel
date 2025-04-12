import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  message,
  notification,
  Popconfirm,
  Space,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { sfLike } from 'spring-filter-query-builder';
import queryString from 'query-string';

import DataTable from '../../components/data-table';
import { callDeleteRoom } from '../../config/api.room';
import { fetchRoom } from '../../redux/slice/roomSlice';
import ModalRoom from '../../components/modal/modal.room';

const RoomPage = () => {
  const tableRef = useRef();
  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const [dataInit, setDataInit] = useState(null);

  const isFetching = useSelector((state) => state.room.isFetching);
  const meta = useSelector((state) => state.room.meta);
  const rooms = useSelector((state) => state.room.result);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (id) => {
    if (id) {
      const res = await callDeleteRoom(id);
      if (res && +res.statusCode === 200) {
        message.success('Room deleted successfully');
        reloadTable();
      } else {
        notification.error({
          message: 'An error occurred',
          description: res.message,
        });
      }
    }
  };

  const columns = [
    {
      title: 'No.',
      key: 'index',
      width: 50,
      align: 'center',
      render: (text, record, index) => {
        return <>{index + 1 + (meta.page - 1) * meta.pageSize}</>;
      },
      hideInSearch: true,
    },

    {
      title: 'Number',
      dataIndex: 'roomNumber',
      hideInSearch: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Price Per Night',
      dataIndex: 'pricePerNight',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: 'Max Occupancy',
      dataIndex: 'maxOccupancy',
      sorter: true,
      hideInSearch: true,
    },
    
    {
      title: 'Available',
      dataIndex: 'available',
      hideInSearch: true,
      render: (text, record) => {
        return <>{record.available ? 'Yes' : 'No'}</>;
      }
    },
    {
      title: 'Features',
      dataIndex: 'features',
      hideInSearch: true,
      render: (text, record) => {
        return <>{record.features.join(', ')}</>;
      },
    },
    {
      title: 'Actions',
      hideInSearch: true,
      width: 50,
      render: (_value, entity) => (
        <Space>
          <EditOutlined
            style={{
              fontSize: 20,
              color: '#ffa500',
            }}
            onClick={() => {
              setOpenModal(true);
              setDataInit(entity);
            }}
          />

          <Popconfirm
            placement='leftTop'
            title='Confirm delete company' // or 'Confirm delete vaccine'
            description='Are you sure you want to delete this vaccine?'
            onConfirm={() => handleDelete(entity.id)}
            okText='Confirm'
            cancelText='Cancel'
          >
            <span style={{ cursor: 'pointer', margin: '0 10px' }}>
              <DeleteOutlined
                style={{
                  fontSize: 20,
                  color: '#ff4d4f',
                }}
              />
            </span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const buildQuery = (params, sort) => {
    const clone = { ...params };
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: '',
    };

    if (clone.type)
      q.filter = `${sfLike('type', clone.type)}`;
   

    if (!q.filter) delete q.filter;

    let temp = queryString.stringify(q);

    let sortBy = '';
    if (sort && sort.pricePerNight) {
      sortBy =
        sort.pricePerNight === 'ascend'
          ? 'sort=pricePerNight,asc'
          : 'sort=pricePerNight,desc';
    }
    if (sort && sort.maxOccupancy) {
      sortBy =
        sort.maxOccupancy === 'ascend'
          ? 'sort=maxOccupancy,asc'
          : 'sort=maxOccupancy,desc';
    }

    
    
    temp = `${temp}&${sortBy}`;

    return temp;
  };

  return (
    <>
      <DataTable
        actionRef={tableRef}
        headerTitle='Vaccine List'
        rowKey='vaccineId'
        loading={isFetching}
        columns={columns}
        dataSource={rooms}
        request={async (params, sort, filter) => {
          const query = buildQuery(params, sort, filter);
          dispatch(fetchRoom({ query }));
        }}
        scroll={{ x: true }}
        pagination={{
          current: meta.page,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} of {total} rows
              </div>
            );
          },
        }}
        rowSelection={false}
        toolBarRender={() => {
          return (
            <Button
              icon={<PlusOutlined />}
              type='primary'
              onClick={() => setOpenModal(true)}
            >
              Add new
            </Button>
          );
        }}
      />
      <ModalRoom
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </>
  );
};
export default RoomPage;