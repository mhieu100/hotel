import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, message, Tag } from 'antd';
import { fetchAccount } from '../../redux/slice/accountSlide';
import { callUpdateUser } from '../../config/api.user';
import { callGetUserBookings } from '../../config/api.booking';
import dayjs from 'dayjs';

const Profile = () => {
  const user = useSelector(state => state.account.user);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUserBookings();
  }, [user.id]);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const res = await callGetUserBookings(user.id);
      console.log(res.data)
      if (res?.data) {
        setBookings(res.data || []);
      }
    } catch (error) {
      console.error('Fetch bookings error:', error);
      message.error('Không thể tải lịch sử đặt phòng');
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    form.setFieldsValue({
      fullname: user.fullname,
      phone: user.phone,
      address: user.address
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateProfile = async (values) => {
    try {
      const res = await callUpdateUser(
        user.id,
        values.fullname,
        values.address,
        values.phone
      );
      
      if (res && res.data) {
        message.success('Cập nhật thông tin thành công');
        dispatch(fetchAccount());
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      message.error('Cập nhật thông tin thất bại');
    }
  };

  const getStatusTag = (status) => {
    const colorMap = {
      PENDING: 'gold',
      CONFIRMED: 'green',
      CANCELLED: 'red',
      COMPLETED: 'blue'
    };
    const labelMap = {
      PENDING: 'Đang chờ',
      CONFIRMED: 'Đã xác nhận',
      CANCELLED: 'Đã hủy',
      COMPLETED: 'Hoàn thành'
    };
    return <Tag color={colorMap[status]}>{labelMap[status]}</Tag>;
  };

  return (
    <div className="container mx-auto px-6 py-12 mt-5">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <i className="fas fa-user text-4xl text-gray-400"/>
              </div>
              <h2 className="text-xl font-bold">{user.fullname || 'Chưa cập nhật'}</h2>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
            
            <nav className="space-y-2">
              <a href="#profile" className="flex items-center space-x-2 p-2 bg-primary text-white rounded-lg">
                <i className="fas fa-user-circle"/>
                <span>Thông tin cá nhân</span>
              </a>
              <a href="#bookings" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-calendar-alt"/>
                <span>Lịch sử đặt phòng</span>
              </a>
            </nav>
          </div>
        </div>
  
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6" id="profile">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Thông tin cá nhân</h2>
              <Button type="primary" onClick={showModal}>
                <i className="fas fa-edit"/> Cập nhật thông tin
              </Button>
            </div>
  
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Thông tin chi tiết</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500">Họ và tên</p>
                    <p className="font-medium">{user.fullname || 'Chưa cập nhật'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Số điện thoại</p>
                    <p className="font-medium">{user.phone || 'Chưa cập nhật'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Vai trò</p>
                    <p className="font-medium">{user.roleName}</p>
                  </div>
                </div>
              </div>
  
              <div>
                <h3 className="text-lg font-semibold mb-2">Địa chỉ</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500">Địa chỉ chi tiết</p>
                    <p className="font-medium">{user.address || 'Chưa cập nhật'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow-md p-6" id="bookings">
            <h2 className="text-2xl font-bold text-primary mb-6">Lịch sử đặt phòng</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đặt phòng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số phòng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày nhận</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày trả</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.roomNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dayjs(booking.checkInDate).format('DD/MM/YYYY')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dayjs(booking.checkOutDate).format('DD/MM/YYYY')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusTag(booking.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.specialRequests || 'Không có'}
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        Chưa có lịch sử đặt phòng
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Cập nhật thông tin cá nhân"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
        >
          <Form.Item
            name="fullname"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Button type="default" className="mr-2" onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;