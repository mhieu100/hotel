import { useEffect, useState } from 'react';
import { callFetchRoom } from '../../config/api.room';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

const AllRooms = () => {

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [filter, setFilter] = useState('');
    const [sortQuery, setSortQuery] = useState('');
    const [listRoom, setListRoom] = useState([]);
    const [total, setTotal] = useState(0);
    const [pages, setPages] = useState(0);

    // Add new states for filters
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);

    const ROOM_TYPES = ['SINGLE', 'DOUBLE', 'SUITE', 'DELUXE', 'PRESIDENTIAL'];
    const ROOM_FEATURES = ['WIFI', 'TV', 'AIR_CONDITIONING', 'MINIBAR', 'SEA_VIEW', 'BALCONY'];

    useEffect(() => {
        setCurrent(current);
        setPageSize(pageSize);
        setSortQuery(sortQuery);
        setFilter(filter);
        fetchRoom();
    }, [current, pageSize, filter, sortQuery]);

    const handleTypeChange = (type) => {
        setSelectedTypes(prev => {
            const newTypes = prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type];

            buildFilterQuery(newTypes, selectedFeatures, priceRange);
            return newTypes;
        });
    };

    const handleFeatureChange = (feature) => {
        setSelectedFeatures(prev => {
            const newFeatures = prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature];

            buildFilterQuery(selectedTypes, newFeatures, priceRange);
            return newFeatures;
        });
    };

    const buildFilterQuery = (types, features) => {
        const conditions = [];

        if (types.length > 0) {
            // Using IN operator for types
            conditions.push(`type ~ '${types.join('\' or type ~ \'')}'`);
        }

        if (features.length > 0) {
            // Using IN operator for features
            conditions.push(`features ~ '${features.join('\' or features ~ \'')}'`);
        }

        if (conditions.length > 0) {
            setFilter(`filter=${encodeURIComponent(conditions.join(' and '))}`);
        } else {
            setFilter('');
        }
    };

   

    const formatFeatureName = (feature) => {
        return feature.replace(/_/g, ' ').toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const fetchRoom = async () => {
        let query = `page=${current}&size=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }
        const res = await callFetchRoom(query);
        if (res && res.data) {
            setListRoom(res.data.result);
            setTotal(res.data.meta.total);
            setPages(res.data.meta.pages);
        }
    };

    const handlePaginationChange = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        switch (value) {
            case 'price-asc':
                setSortQuery('sort=pricePerNight,asc');
                break;
            case 'price-desc':
                setSortQuery('sort=pricePerNight,desc');
                break;
            default:
                setSortQuery('');
        }
    };

    return (
        <>
            <section className="relative py-20 bg-primary">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Luxury Rooms</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">Discover your perfect retreat from our exquisite collection of accommodations</p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/4">
                            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                                <h3 className="text-xl font-bold text-primary mb-6">Filter Rooms</h3>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Room Type</h4>
                                    <div className="space-y-2">
                                        {ROOM_TYPES.map((type) => (
                                            <label key={type} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded text-gold focus:ring-gold"
                                                    checked={selectedTypes.includes(type)}
                                                    onChange={() => handleTypeChange(type)}
                                                />
                                                <span className="ml-2">{formatFeatureName(type)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Amenities</h4>
                                    <div className="space-y-2">
                                        {ROOM_FEATURES.map((feature) => (
                                            <label key={feature} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded text-gold focus:ring-gold"
                                                    checked={selectedFeatures.includes(feature)}
                                                    onChange={() => handleFeatureChange(feature)}
                                                />
                                                <span className="ml-2">{formatFeatureName(feature)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-3/4">
                            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
                                <div className="mb-4 md:mb-0">
                                    <span className="text-gray-600">Showing {pageSize} of {total} rooms</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600 mr-2">Sort by:</span>
                                    <select
                                        className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gold"
                                        onChange={handleSortChange}
                                        value={sortQuery === 'sort=pricePerNight,desc' ? 'price-desc' :
                                            sortQuery === 'sort=pricePerNight,asc' ? 'price-asc' : 'default'}
                                    >
                                        <option value="default">Recommended</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {listRoom.map((room, index) => (
                                    <div key={index}>
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                                            <div className="relative">
                                                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80')] bg-cover bg-center" />
                                                {!room.available && (
                                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                        Unavailable
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-primary">{room.type} Room</h3>
                                                        <p className="text-sm text-gray-500">Room {room.roomNumber}</p>
                                                    </div>
                                                    <span className="text-gold font-bold">${room.pricePerNight}/night</span>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-3">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Perfect for {room.maxOccupancy} {room.maxOccupancy > 1 ? 'guests' : 'guest'}.
                                                </p>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {room.features.map((feature, idx) => (
                                                        <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                            {feature.replace('_', ' ')}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <div className="flex items-center text-gold">
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <span className="text-gray-600 ml-1">(128)</span>
                                                    </div>
                                                    <Link
                                                        to={`/checkout/${room.id}`}
                                                        className={`${room.available
                                                            ? 'bg-primary hover:bg-secondary'
                                                            : 'bg-gray-400 cursor-not-allowed'
                                                            } text-white text-sm py-1 px-3 rounded`}
                                                        disabled={!room.available}
                                                    >
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className="mt-8 flex justify-center">
                                <Pagination
                                    current={current}
                                    pageSize={pageSize}
                                    total={total}
                                    onChange={handlePaginationChange}
                                    showSizeChanger
                                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                    pageSizeOptions={[9, 18, 36, 72]}
                                    className="custom-pagination"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AllRooms