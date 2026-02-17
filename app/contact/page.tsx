

'use client'


import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center p-4 text-red-500">
      <h1 className="text-4xl font-bold mb-8">Taj Mehal Restaurant</h1>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Phone Card */}
        <div className="flex items-center gap-4 bg-red-50 rounded-lg p-6 shadow-md hover:shadow-lg transition w-full md:w-80">
          <div className="text-red-500 text-2xl">
            <FaPhoneAlt />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Call Us</span>
            <span className="text-lg">032 565 8887</span>
          </div>
        </div>

        {/* Email Card */}
        <div className="flex items-center gap-4 bg-red-50 rounded-lg p-6 shadow-md hover:shadow-lg transition w-full md:w-80">
          <div className="text-red-500 text-2xl">
            <FaEnvelope />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Email</span>
            <span className="text-lg">massimo@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Optional Address / Map Section */}
      <div className="mt-12 w-full md:w-2/3 text-center">
        <h2 className="text-2xl font-bold mb-4">Visit Us</h2>
        <p className="text-red-400">123 Main Street, Islamabad, Pakistan</p>
        {/* Example: Could add map iframe here later */}
      </div>
    </div>
  )
}

export default Contact
