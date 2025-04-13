import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Empty, Spin } from 'antd';
import dayjs from 'dayjs';

const AvailableRoomsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchParams = location.state;

    useEffect(() => {
        if (!searchParams) {
            navigate('/');
            return;
        }
        setRooms(searchParams.availableRooms || []);
        setLoading(false);
    }, [searchParams, navigate]);

    const handleBookNow = (roomId) => {
        navigate('/checkout', {
            state: {
                roomId,
                checkInDate: searchParams.checkInDate,
                checkOutDate: searchParams.checkOutDate,
                numberOfGuests: searchParams.numberOfGuests
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8 mt-[100px]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-4">Available Rooms</h1>
                <div className="text-gray-600">
                    <p>Check-in: {dayjs(searchParams?.checkInDate).format('DD/MM/YYYY')}</p>
                    <p>Check-out: {dayjs(searchParams?.checkOutDate).format('DD/MM/YYYY')}</p>
                    <p>Guests: {searchParams?.numberOfGuests}</p>
                    <p>Room Type: {searchParams?.roomType}</p>
                </div>
            </div>

            {rooms.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <Card
                            key={room.id}
                            hoverable
                            className="w-full"
                            cover={
                                <div className={`h-48 bg-[url('http://localhost:8080/storage/rooms/${room.imageUrl}')] bg-cover bg-center`} />
                            }
                        >
                            <Card.Meta
                                title={`Room ${room.roomNumber}`}
                                description={
                                    <div>
                                        <p>Type: {room.type}</p>
                                        <p>Max Occupancy: {room.maxOccupancy} guests</p>
                                        <p className="text-gold font-bold">
                                            ${room.pricePerNight} / night
                                        </p>
                                        <Button
                                            type="primary"
                                            className="mt-4 w-full bg-gold hover:bg-yellow-600"
                                            onClick={() => handleBookNow(room.id)}
                                        >
                                            Book Now
                                        </Button>
                                    </div>
                                }
                            />
                        </Card>
                    ))}
                </div>
            ) : (
                <Empty
                    description={
                        <span className="text-gray-600">
                            No rooms available for the selected criteria
                        </span>
                    }
                >
                    <Button type="primary" onClick={() => navigate('/')}>
                        Try Different Dates
                    </Button>
                </Empty>
            )}
        </div>
    );
};

export default AvailableRoomsPage; 