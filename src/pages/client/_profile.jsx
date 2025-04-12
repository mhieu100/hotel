
const Profile = () => {
  return (
    <div className="container mx-auto px-6 py-12 mt-5">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                <i className="fas fa-user text-4xl text-gray-400"/>
              </div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-600">Member since 2022</p>
            </div>
            
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-2 p-2 bg-primary text-white rounded-lg">
                <i className="fas fa-user-circle"/>
                <span>Profile Information</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-calendar-alt"/>
                <span>Booking History</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-heart"/>
                <span>Wishlist</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-cog"/>
                <span>Settings</span>
              </a>
              <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
                <i className="fas fa-sign-out-alt"/>
                <span>Logout</span>
              </a>
            </nav>
          </div>
        </div>
  
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Profile Information</h2>
              <button className="text-gold hover:text-yellow-600">
                <i className="fas fa-edit"/> Edit Profile
              </button>
            </div>
  
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500">Full Name</p>
                    <p className="font-medium">John Michael Doe</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">john.doe@example.com</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone Number</p>
                    <p className="font-medium">+84 123 456 789</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date of Birth</p>
                    <p className="font-medium">15/05/1990</p>
                  </div>
                </div>
              </div>
  
              <div>
                <h3 className="text-lg font-semibold mb-2">Address Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500">Country</p>
                    <p className="font-medium">Vietnam</p>
                  </div>
                  <div>
                    <p className="text-gray-500">City</p>
                    <p className="font-medium">Ho Chi Minh City</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium">123 Nguyen Hue Street, District 1</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Postal Code</p>
                    <p className="font-medium">70000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">Booking History</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-Out</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#FRM-2023-001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Deluxe Ocean View</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/06/2023</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20/06/2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-primary hover:text-secondary mr-3">
                        <i className="fas fa-eye"/>
                      </button>
                      <button className="text-gold hover:text-yellow-600">
                        <i className="fas fa-file-invoice"/>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#FRM-2023-002</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Executive Suite</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10/08/2023</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15/08/2023</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Upcoming</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-primary hover:text-secondary mr-3">
                        <i className="fas fa-eye"/>
                      </button>
                      <button className="text-gold hover:text-yellow-600">
                        <i className="fas fa-file-invoice"/>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#FRM-2022-015</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Presidential Suite</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20/12/2022</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25/12/2022</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-primary hover:text-secondary mr-3">
                        <i className="fas fa-eye"/>
                      </button>
                      <button className="text-gold hover:text-yellow-600">
                        <i className="fas fa-file-invoice"/>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#FRM-2022-008</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Family Suite</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">05/10/2022</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10/10/2022</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-primary hover:text-secondary mr-3">
                        <i className="fas fa-eye"/>
                      </button>
                      <button className="text-gold hover:text-yellow-600">
                        <i className="fas fa-file-invoice"/>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing 1 to 4 of 4 entries
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 bg-primary text-white rounded">1</button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile