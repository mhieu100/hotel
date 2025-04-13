import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { callGetFeedbacks } from '../../config/api.feedback';
import { callCheckAvailability } from '../../config/api.booking';

const HomePage = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await callGetFeedbacks(1, 4); // Get first 3 feedbacks
        if (res?.data?.result) {
          setFeedbacks(res.data.result);
        }
      } catch (error) {
        console.error('Fetch feedbacks error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);
  console.log(feedbacks)

  const renderStars = (numberStar) => {
    const stars = [];
    const fullStars = Math.floor(numberStar);
    const hasHalfStar = numberStar % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-gold" />);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-gold" />);
    }

    const remainingStars = 5 - Math.ceil(numberStar);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-gold" />);
    }

    return stars;
  };

  const handleCheckAvailability = async (e) => {
    e.preventDefault();
    const checkInDate = e.target['check-in'].value;
    const checkOutDate = e.target['check-out'].value;
    const roomType = e.target['room-type'].value;
    const numberOfGuests = parseInt(e.target['guests'].value);

    if (!checkInDate || !checkOutDate) {
      message.error('Please select check-in and check-out dates');
      return;
    }

    if (!numberOfGuests || numberOfGuests < 1) {
      message.error('Please enter valid number of guests');
      return;
    }

    try {
      const res = await callCheckAvailability(
        checkInDate,
        checkOutDate,
        roomType.toUpperCase().replace(' ', '_'),
        numberOfGuests
      );
      console.log(res)
      if (res?.data) {
        navigate('/available-rooms', {
          state: {
            availableRooms: res.data,
            checkInDate,
            checkOutDate,
            roomType,
            numberOfGuests
          }
        });
      }
    } catch (error) {
      console.error('Check availability error:', error);
      message.error('Error checking room availability');
    }
  };

  return (
    <>
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80')] bg-cover bg-center h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Experience Luxury Redefined</h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">Discover unparalleled comfort at Furama Hotel, where every detail is crafted for your pleasure.</p>
            <button className="bg-gold hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition duration-300">Book Now</button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Luxury Accommodations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-64 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Deluxe Room</h3>
                <p className="text-gray-600 mb-4">Spacious comfort with elegant furnishings and premium amenities.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-bold">$199 ~ $499/night</span>
                  <button className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded">Book Now</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-64 bg-[url('https://png.pngtree.com/background/20220720/original/pngtree-hotel-duplex-room-hd-live-shooting-log-simple-furniture-picture-image_1685095.jpg')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Executive Suite</h3>
                <p className="text-gray-600 mb-4">Luxurious living space with separate lounge area and premium services.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-bold">$499 ~ $799/night</span>
                  <button className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded">Book Now</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-64 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80')] bg-cover bg-center" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">Presidential Suite</h3>
                <p className="text-gray-600 mb-4">The ultimate in luxury with panoramic views and exclusive butler service.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-bold">$799 ~ $999/night</span>
                  <button className="bg-primary hover:bg-secondary text-white py-2 px-4 rounded">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-[url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80')] bg-cover bg-center hidden md:block" />
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">Book Your Stay</h2>
                <form onSubmit={handleCheckAvailability}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="check-in">Check-In</label>
                    <input type="date" id="check-in" name="check-in" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="check-out">Check-Out</label>
                    <input type="date" id="check-out" name="check-out" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold" required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="room-type">Room Type</label>
                    <select id="room-type" name="room-type" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold" required>
                      <option value="DELUXE">Deluxe Room</option>
                      <option value="SINGLE">Single Room</option>
                      <option value="DOUBLE">Double Room</option>
                      <option value="SUITE">Suite Room</option>
                      <option value="PRESIDENTIAL">Presidential Suite</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="guests">Guests</label>
                    <input type="number" id="guests" name="guests" min="1" max="4" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold" required />
                  </div>
                  <button type="submit" className="w-full bg-gold hover:bg-yellow-600 text-primary font-bold py-3 px-4 rounded transition duration-300">
                    Check Availability
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Hotel Amenities</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-swimming-pool text-3xl text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Infinity Pool</h3>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-spa text-3xl text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Luxury Spa</h3>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-utensils text-3xl text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Fine Dining</h3>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-dumbbell text-3xl text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Fitness Center</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Guest Experiences</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto" />
              </div>
            ) : feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <div key={feedback.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${feedback.userName}&background=random`} 
                        alt={feedback.userName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{feedback.userName}</h4>
                      <div className="flex">
                        {renderStars(feedback.numberStar)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {feedback.content || `Đánh giá về phòng ${feedback.roomType.toLowerCase()}`}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    Ngày ở: {new Date(feedback.dateStay).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">Chưa có đánh giá nào</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage