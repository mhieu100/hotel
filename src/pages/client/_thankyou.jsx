import { Link } from 'react-router-dom'

const Thankyou = () => {
  return (
    <div><div className="container mx-auto px-6 py-16 text-center">
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="fas fa-check-circle text-green-500 text-5xl"/>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Thank You for Your Booking!</h1>
      <p className="text-gray-600 mb-8">Your reservation has been confirmed. We&apos;ve sent the details to your email address.</p>
    

      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-4">What&apos;s Next?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <div className="flex items-start bg-blue-50 p-4 rounded-lg">
            <i className="fas fa-envelope text-blue-500 text-xl mt-1 mr-4"/>
            <div>
              <h3 className="font-semibold mb-1">Confirmation Email</h3>
              <p className="text-sm text-gray-600">Check your inbox for booking confirmation and details</p>
            </div>
          </div>
          <div className="flex items-start bg-purple-50 p-4 rounded-lg">
            <i className="fas fa-calendar-check text-purple-500 text-xl mt-1 mr-4"/>
            <div>
              <h3 className="font-semibold mb-1">Prepare for Your Stay</h3>
              <p className="text-sm text-gray-600">Review our COVID-19 safety measures and policies</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a href="#" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition duration-300">
          <i className="fas fa-download mr-2"/> Download Invoice
        </a>
        <Link to="/" className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-gray-100 transition duration-300">
          <i className="fas fa-home mr-2"/> Back to Home
        </Link>
      </div>
    </div>
  </div></div>
  )
}

export default Thankyou