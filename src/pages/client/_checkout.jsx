import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { callFetchRoomById } from '../../config/api.room';
import { callCreateBooking } from '../../config/api.booking';
import { DatePicker, Input, Form, message } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [form] = Form.useForm();
  const user = useSelector(state => state.account.user);

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    const res = await callFetchRoomById(id);
    if (res && res.data) {
      setRoom(res.data);
      setTotalPrice(res.data.pricePerNight);
    }
  };

  const onDateChange = (dates) => {
    if (dates && dates[0] && dates[1]) {
      const nightCount = dates[1].diff(dates[0], 'day');
      setNights(nightCount);
      setTotalPrice(room.pricePerNight * nightCount);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const bookingData = {
        userId: user.id,
        roomId: id,
        checkInDate: values.dates[0].format('YYYY-MM-DD'),
        checkOutDate: values.dates[1].format('YYYY-MM-DD'),
        phoneNumber: values.phone,
        specialRequests: values.specialRequests
      };

      const res = await callCreateBooking(bookingData);

      if (res && res.data) {
        message.success('Booking created successfully!');
        navigate('/thankyou');
      } else {
        message.error(res.error);
      }

    } catch (error) {
      console.error('Booking error:', error);
      message.error('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="mt-5">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Room Information */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-primary mb-6">Room Information</h2>

              <div className="mb-6">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
                    alt={room?.type}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{room?.type} Room</h3>
                <p className="text-gray-600 mb-4">Room Number: {room?.roomNumber}</p>

                <div className="border-t border-b border-gray-200 py-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Price per night</span>
                    <span className="font-medium">${room?.pricePerNight}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Number of nights</span>
                    <span className="font-medium">{nights}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-4">
                    <span>Total Price</span>
                    <span className="text-gold">${totalPrice}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {room?.features?.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {feature.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Max Occupancy:</h4>
                  <p>{room?.maxOccupancy} {room?.maxOccupancy > 1 ? 'persons' : 'person'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Booking Form */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Booking Details</h2>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-6"
              >
                <Form.Item
                  label="Check-in / Check-out"
                  name="dates"
                  rules={[{ required: true, message: 'Please select dates!' }]}
                >
                  <DatePicker.RangePicker
                    className="w-full"
                    onChange={onDateChange}
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                  />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input className="w-full" placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item
                  label="Special Requests (Optional)"
                  name="specialRequests"
                >
                  <Input.TextArea rows={3} placeholder="Any special requests?" />
                </Form.Item>

                <div className="flex justify-end pt-6">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 border border-primary text-primary font-medium rounded-lg mr-4 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary flex items-center"
                  >
                    <span>Complete Booking</span>
                    <i className="fas fa-arrow-right ml-2" />
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;