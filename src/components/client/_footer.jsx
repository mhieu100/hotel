import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Furama Hotel</h3>
              <p className="mb-4">Where luxury meets comfort in the heart of the city.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gold"><i className="fab fa-facebook-f" /></a>
                <a href="#" className="hover:text-gold"><i className="fab fa-twitter" /></a>
                <a href="#" className="hover:text-gold"><i className="fab fa-instagram" /></a>
                <a href="#" className="hover:text-gold"><i className="fab fa-linkedin-in" /></a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gold">Home</a></li>
                <li><a href="#" className="hover:text-gold">Rooms &amp; Suites</a></li>
                <li><a href="#" className="hover:text-gold">Dining</a></li>
                <li><a href="#" className="hover:text-gold">Spa &amp; Wellness</a></li>
                <li><a href="#" className="hover:text-gold">Special Offers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><i className="fas fa-map-marker-alt mr-2 text-gold" /> 123 Luxury Avenue, City</li>
                <li className="flex items-center"><i className="fas fa-phone-alt mr-2 text-gold" /> +1 234 567 8900</li>
                <li className="flex items-center"><i className="fas fa-envelope mr-2 text-gold" /> <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="1466716771666275607d7b7a67547261667579757c7b6071783a777b79">[email&#160;protected]</a></li>
              </ul>
            </div>
            <div>
              < h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="mb-4">Subscribe for exclusive offers and updates.</p>
              <form className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 w-full rounded-l text-gray-800 focus:outline-none" />
                <button type="submit" className="bg-gold text-primary px-4 py-2 rounded-r"><i className="fas fa-paper-plane" /></button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>© 2023 Furama Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer