
const Contact = () => {
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
                                        style="border:0;"
                                        allowfullscreen=""
                                        loading="lazy"
                                        className="rounded-lg"
                                     />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                                <h2 className="text-3xl font-bold text-primary mb-6">Send Us a Message</h2>
                                <form>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                            placeholder="Your email"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                            placeholder="Your phone number"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                                        <select
                                            id="subject"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="reservation">Room Reservation</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="complaint">Complaint</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            rows="4"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                            placeholder="Your message"
                                            required
                                         />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-3xl font-bold text-primary mb-6">Share Your Experience</h2>
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">Overall Rating</label>
                                        <div className="flex space-x-2">
                                            <button type="button" className="text-2xl text-gray-300 hover:text-gold focus:outline-none" data-rating="1">★</button>
                                            <button type="button" className="text-2xl text-gray-300 hover:text-gold focus:outline-none" data-rating="2">★</button>
                                            <button type="button" className="text-2xl text-gray-300 hover:text-gold focus:outline-none" data-rating="3">★</button>
                                            <button type="button" className="text-2xl text-gray-300 hover:text-gold focus:outline-none" data-rating="4">★</button>
                                            <button type="button" className="text-2xl text-gray-300 hover:text-gold focus:outline-none" data-rating="5">★</button>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="stay-date" className="block text-gray-700 font-medium mb-2">Date of Stay</label>
                                        <input
                                            type="date"
                                            id="stay-date"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="room-type" className="block text-gray-700 font-medium mb-2">Room Type</label>
                                        <select
                                            id="room-type"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                        >
                                            <option value="">Select room type</option>
                                            <option value="deluxe">Deluxe Room</option>
                                            <option value="executive">Executive Suite</option>
                                            <option value="presidential">Presidential Suite</option>
                                            <option value="family">Family Suite</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="feedback" className="block text-gray-700 font-medium mb-2">Your Feedback</label>
                                        <textarea
                                            id="feedback"
                                            rows="4"
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                            placeholder="Share your experience with us..."
                                            required
                                         />
                                    </div>
                                    <div className="mb-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded text-gold focus:ring-gold"
                                                required
                                            />
                                                <span className="ml-2 text-gray-700">I agree to the terms and conditions</span>
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-gold hover:bg-yellow-600 text-primary font-bold py-3 px-4 rounded-lg transition duration-300"
                                    >
                                        Submit Feedback
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact