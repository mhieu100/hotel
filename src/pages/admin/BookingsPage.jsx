import { useEffect, useState } from 'react';
import { Table, Tag, DatePicker, Select, Button, Space, message } from 'antd';
import { callGetAllBookings, callUpdateBookingStatus, callCancelBooking } from '../../config/api.booking';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    status: undefined,
    fromDate: undefined,
    toDate: undefined
  });

  const fetchBookings = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const res = await callGetAllBookings({
        page,
        size: pageSize,
        ...filters
      });
      console.log('API Response:', res);
      console.log('Data:', res?.data);
      console.log('Result:', res?.data?.result);
      if (res?.data) {
        const bookingsData = res.data.result || [];
        console.log('Bookings to display:', bookingsData);
        setBookings(bookingsData);
        setPagination({
          ...pagination,
          total: res.data.meta.total,
          current: res.data.meta.page,
          pageSize: res.data.meta.pageSize
        });
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      message.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(pagination.current, pagination.pageSize);
  }, [filters]);

  const handleTableChange = (newPagination) => {
    fetchBookings(newPagination.current, newPagination.pageSize);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await callUpdateBookingStatus(bookingId, newStatus);
      message.success('Booking status updated successfully');
      fetchBookings(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error('Failed to update booking status');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await callCancelBooking(bookingId);
      message.success('Booking cancelled successfully');
      fetchBookings(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error('Failed to cancel booking');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Room',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Guest',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Check In',
      dataIndex: 'checkInDate',
      key: 'checkInDate',
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOutDate',
      key: 'checkOutDate',
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Special Requests',
      dataIndex: 'specialRequests',
      key: 'specialRequests',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colorMap = {
          PENDING: 'gold',
          CONFIRMED: 'green',
          CANCELLED: 'red',
          COMPLETED: 'blue'
        };
        return status ? <Tag color={colorMap[status]}>{status}</Tag> : '';
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          {record.status === 'PENDING' && (
            <>
              <Button type="primary" size="small" onClick={() => handleStatusChange(record.id, 'CONFIRMED')}>
                Confirm
              </Button>
              <Button danger size="small" onClick={() => handleCancelBooking(record.id)}>
                Cancel
              </Button>
            </>
          )}
          {record.status === 'CONFIRMED' && (
            <Button type="primary" size="small" onClick={() => handleStatusChange(record.id, 'COMPLETED')}>
              Complete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-4">Bookings Management</h1>
        <Space className="mb-4">
          <Select
            placeholder="Filter by status"
            allowClear
            style={{ width: 200 }}
            onChange={(value) => setFilters({ ...filters, status: value })}
            options={[
              { value: 'PENDING', label: 'Pending' },
              { value: 'CONFIRMED', label: 'Confirmed' },
              { value: 'CANCELLED', label: 'Cancelled' },
              { value: 'COMPLETED', label: 'Completed' },
            ]}
          />
          <RangePicker
            onChange={(dates) => {
              if (dates) {
                setFilters({
                  ...filters,
                  fromDate: dates[0].format('YYYY-MM-DD'),
                  toDate: dates[1].format('YYYY-MM-DD'),
                });
              } else {
                setFilters({
                  ...filters,
                  fromDate: undefined,
                  toDate: undefined,
                });
              }
            }}
          />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default BookingsPage; 