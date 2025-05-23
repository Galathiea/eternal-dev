export const Contact = () => {
  return (
    <div className="min-h-screen bg-orange-100">
      <div className="container p-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold">Contact Us</h1>
        <p className="mb-8 text-xl">
          Have a question, suggestion, or want to work with us? We’d love to hear from you!
        </p>

        {/* Contact Form */}
        <form className="p-8 mb-12 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2 text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="email" className="block mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="mt-6">
            <label htmlFor="subject" className="block mb-2 text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="How can we help you?"
            />
          </div>
          <div className="mt-6">
            <label htmlFor="message" className="block mb-2 text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              className="w-full p-2 border border-gray-300 rounded"
              rows={5}
              placeholder="Tell us more about your inquiry..."
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-2xl font-bold">Our Location</h3>
            <p className="text-gray-700">
              123 Culinary Street
              <br />
              Foodie District
              <br />
              California Love, CL 10001
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-2xl font-bold">Email Us</h3>
            <p className="text-gray-700">
              <a href="mailto:info@tastykitchen.com" className="text-blue-500">
                fyp@eternalhavenkitchen.com
              </a>
              <br />
              <a href="mailto:support@tastykitchen.com" className="text-blue-500">
                tmc@eternalhavenkitchen.comm
              </a>
              <br />
              <a href="mailto:partner@tastykitchen.com" className="text-blue-500">
                jmi@eternalhavenkitchen.com
              </a>
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-2xl font-bold">Call Us</h3>
            <p className="text-gray-700">
              +1 (555) 123-4567
              <br />
              Monday - Friday: 8am - 5pm EST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};