
const AllRooms = () => {
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
                                    <h4 className="font-semibold mb-3">Price Range</h4>
                                    <div className="flex justify-between mb-2">
                                        <span>$200</span>
                                        <span>$1000</span>
                                    </div>
                                    <input type="range" min="200" max="1000" value="500" className="w-full accent-gold" />
                                    <div className="text-center mt-2">
                                        <span className="text-gold font-bold">$200 - $500</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Room Type</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" checked="" />
                                            <span className="ml-2">Deluxe Room</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" checked="" />
                                            <span className="ml-2">Executive Suite</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" checked="" />
                                            <span className="ml-2">Presidential Suite</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" />
                                            <span className="ml-2">Family Suite</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Amenities</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" />
                                            <span className="ml-2">Ocean View</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" />
                                            <span className="ml-2">Balcony</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" />
                                            <span className="ml-2">Jacuzzi</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" />
                                            <span className="ml-2">Kitchenette</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Capacity</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" />
                                            <span className="ml-2">1 Guest</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" checked="" />
                                            <span className="ml-2">2 Guests</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" />
                                            <span className="ml-2">3-4 Guests</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded text-gold focus:ring-gold" />
                                            <span className="ml-2">5+ Guests</span>
                                        </label>
                                    </div>
                                </div>

                                <button className="w-full bg-gold hover:bg-yellow-600 text-primary font-bold py-2 px-4 rounded transition duration-300">
                                    Apply Filters
                                </button>
                            </div>
                        </div>

                        <div className="md:w-3/4">
                            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
                                <div className="mb-4 md:mb-0">
                                    <span className="text-gray-600">Showing 9 of 12 rooms</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-gray-600 mr-2">Sort by:</span>
                                    <select className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gold">
                                        <option>Recommended</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Guest Rating</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                                    <div className="relative">
                                        <div className="h-48 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80')] bg-cover bg-center" />
                                        <div className="absolute top-4 right-4 bg-gold text-primary px-3 py-1 rounded-full text-sm font-bold">Popular</div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-primary">Deluxe Ocean View</h3>
                                            <span className="text-gold font-bold">$299/night</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">Spacious room with breathtaking ocean views and premium amenities.</p>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center text-gold">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <span className="text-gray-600 ml-1">(128)</span>
                                            </div>
                                            <button className="bg-primary hover:bg-secondary text-white text-sm py-1 px-3 rounded">View Details</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                                    <div className="h-48 bg-[url('https://studiochupanhdep.com/Upload/Newsimages/phong-khach-san-tt-studio.jpg')] bg-cover bg-center" />
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-primary">Executive Suite</h3>
                                            <span className="text-gold font-bold">$499/night</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">Luxurious suite with separate living area and premium services.</p>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center text-gold">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star-half-alt" />
                                                <span className="text-gray-600 ml-1">(86)</span>
                                            </div>
                                            <button className="bg-primary hover:bg-secondary text-white text-sm py-1 px-3 rounded">View Details</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                                    <div className="h-48 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80')] bg-cover bg-center" />
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-primary">Presidential Suite</h3>
                                            <span className="text-gold font-bold">$999/night</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">The ultimate in luxury with panoramic views and exclusive butler service.</p>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center text-gold">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <span className="text-gray-600 ml-1">(42)</span>
                                            </div>
                                            <button className="bg-primary hover:bg-secondary text-white text-sm py-1 px-3 rounded">View Details</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                                    <div className="h-48 bg-[url('https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80')] bg-cover bg-center" />
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-primary">Deluxe City View</h3>
                                            <span className="text-gold font-bold">$279/night</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">Elegant room with stunning city skyline views and modern amenities.</p>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center text-gold">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <span className="text-gray-600 ml-1">(94)</span>
                                            </div>
                                            <button className="bg-primary hover:bg-secondary text-white text-sm py-1 px-3 rounded">View Details</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                                    <div className="h-48 bg-[url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80')] bg-cover bg-center" />
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-primary">Junior Suite</h3>
                                            <span className="text-gold font-bold">$399/night</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">Sophisticated suite with elegant furnishings and premium amenities.</p>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center text-gold">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star-half-alt" />
                                                <span className="text-gray-600 ml-1">(67)</span>
                                            </div>
                                            <button className="bg-primary hover:bg-secondary text-white text-sm py-1 px-3 rounded">View Details</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
                                    <div className="relative">
                                        <div className="h-48 bg-[url('https://png.pngtree.com/background/20220720/original/pngtree-hotel-duplex-room-hd-live-shooting-log-simple-furniture-picture-image_1685095.jpg')] bg-cover bg-center" />
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">Last Room</div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-primary">Executive Suite with Jacuzzi</h3>
                                            <span className="text-gold font-bold">$599/night</span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">Premium suite featuring a private jacuzzi and exclusive services.</p>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center text-gold">
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <span className="text-gray-600 ml-1">(53)</span>
                                            </div>
                                            <button className="bg-primary hover:bg-secondary text-white text-sm py-1 px-3 rounded">View Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <nav className="inline-flex rounded-md shadow">
                                    <a href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                        <i className="fas fa-chevron-left" />
                                    </a>
                                    <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-primary font-medium">1</a>
                                    <a href="#" className="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">2</a>
                                    <a href="#" className="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">3</a>
                                    <a href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
                                        <i className="fas fa-chevron-right" />
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AllRooms