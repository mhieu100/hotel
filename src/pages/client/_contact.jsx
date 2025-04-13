
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { callCreateFeedback } from '../../config/api.feedback';

const Contact = () => {
    const [rating, setRating] = useState(0);
    const [dateStay, setDateStay] = useState('');
    const [roomType, setRoomType] = useState('');
    const [feedback, setFeedback] = useState('');
    const [agreed, setAgreed] = useState(false);
    const user = useSelector(state => state.account.user);
    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user?.id) {
            message.error('Vui lòng đăng nhập để gửi đánh giá');
            return;
        }

        if (rating === 0) {
            message.error('Vui lòng chọn số sao đánh giá');
            return;
        }

        if (!dateStay) {
            message.error('Vui lòng chọn ngày ở');
            return;
        }

        if (!roomType) {
            message.error('Vui lòng chọn loại phòng');
            return;
        }

        if (!agreed) {
            message.error('Vui lòng đồng ý với điều khoản và điều kiện');
            return;
        }

        try {
            const res = await callCreateFeedback(
                user.id,
                rating,
                dateStay,
                roomType.toUpperCase(),
                feedback
            );

            if (res?.data) {
                message.success('Gửi đánh giá thành công');
                // Reset form
                setRating(0);
                setDateStay('');
                setRoomType('');
                setFeedback('');
                setAgreed(false);
            }
        } catch (error) {
            message.error('Có lỗi xảy ra khi gửi đánh giá');
            console.error('Submit feedback error:', error);
        }
    };
    return (
        <>
            <section className="relative py-20 bg-primary">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">We&apos;re here to help and answer any questions you may have</p>
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-6">Get In Touch</h2>

                            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                                <div className="flex items-start mb-6">
                                    <div className="bg-gold text-primary p-3 rounded-full mr-4">
                                        <i className="fas fa-map-marker-alt text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Address</h3>
                                        <p className="text-gray-600">103 - 105 Vo Nguyen Giap Street, Khue My Ward, Ngu Hanh Son District, Danang, Vietnam</p>
                                    </div>
                                </div>

                                <div className="flex items-start mb-6">
                                    <div className="bg-gold text-primary p-3 rounded-full mr-4">
                                        <i className="fas fa-phone-alt text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Phone</h3>
                                        <p className="text-gray-600">84-236-3847 333/888</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-gold text-primary p-3 rounded-full mr-4">
                                        <i className="fas fa-envelope text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Email</h3>
                                        <p className="text-gray-600">reservation@furamavietnam.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Our Location</h3>
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.9244627094486!2d108.2513977141696!3d16.039943143703427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31420fdbc8cc38ef%3A0x9a6a3e31121225d2!2sFurama%20Resort%20Danang!5e0!3m2!1sen!2s!4v1632735755181!5m2!1sen!2s"
                                        width="100%"
                                        height="400"
                                        allowfullscreen=""
                                        loading="lazy"
                                        className="rounded-lg"
                                     />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-primary mb-6">Đánh giá của bạn</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Số sao đánh giá</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                type="button"
                                className={`text-2xl ${rating >= value ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 focus:outline-none`}
                                onClick={() => handleStarClick(value)}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="stay-date" className="block text-gray-700 font-medium mb-2">Ngày ở</label>
                    <input
                        type="date"
                        id="stay-date"
                        value={dateStay}
                        onChange={(e) => setDateStay(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="room-type" className="block text-gray-700 font-medium mb-2">Loại phòng</label>
                    <select
                        id="room-type"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                    >
                        <option value="">Chọn loại phòng</option>
                        <option value="DELUXE">Phòng Deluxe</option>
                        <option value="SINGLE">Phòng Đơn</option>
                        <option value="DOUBLE">Phòng Đôi</option>
                        <option value="SUITE">Phòng Suite</option>
                        <option value="PRESIDENTIAL">Phòng Presidential</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="feedback" className="block text-gray-700 font-medium mb-2">Nội dung đánh giá</label>
                    <textarea
                        id="feedback"
                        rows="4"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                        placeholder="Chia sẻ trải nghiệm của bạn..."
                    />
                </div>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="rounded text-gold focus:ring-gold"
                            required
                        />
                        <span className="ml-2 text-gray-700">Tôi đồng ý với điều khoản và điều kiện</span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-gold hover:bg-yellow-600 text-primary font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                    Gửi đánh giá
                </button>
            </form>
        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact


