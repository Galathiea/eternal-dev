import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-orange-100">
      <div className="container px-4 mx-auto">
        {/* Heading */}
        <h1 className="mb-8 text-4xl font-bold text-center">Our Story</h1>

        {/* Introduction */}
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <p className="mb-4 text-gray-700">
            Founded in 2025, EternalHaven Kitchen began as a small blog sharing family recipes and has grown into a community of food lovers from around the world.
          </p>
          <p className="text-gray-700">
            Our mission is to make cooking accessible to everyone, regardless of skill level, and to inspire people to create delicious, homemade meals that bring joy to the table.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="p-8 mb-12 bg-white rounded-lg shadow-md">
          <h2 className="mb-8 text-3xl font-bold text-center">Our Values</h2>
          <p className="mb-8 text-center text-gray-700">
            At EternalHaven Kitchen, we’re guided by these core principles in everything we do.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Value 1 */}
            <div className="text-center">
              <h3 className="mb-4 text-xl font-bold">Passion for Food</h3>
              <p className="text-gray-700">
                We believe cooking is an act of love and creativity that brings people together.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center">
              <h3 className="mb-4 text-xl font-bold">Community</h3>
              <p className="text-gray-700">
                We foster a supportive community where food enthusiasts can share and learn.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center">
              <h3 className="mb-4 text-xl font-bold">Quality</h3>
              <p className="text-gray-700">
                We test every recipe thoroughly to ensure consistent, delicious results.
              </p>
            </div>

            {/* Value 4 */}
            <div className="text-center">
              <h3 className="mb-4 text-xl font-bold">Accessibility</h3>
              <p className="text-gray-700">
                We create recipes that are approachable for cooks of all skill levels.
              </p>
            </div>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-8 text-3xl font-bold text-center">Meet Our Team</h2>
          <p className="mb-8 text-center text-gray-700">
            The passionate culinary experts behind Flavor Haven’s recipes and content.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full"></div>
              <h3 className="mb-2 text-xl font-bold">Threcia Mae Cabuguason</h3>
              <p className="text-gray-700">Frontend Developer</p>
              <p className="text-gray-600">
                Franilyn specializes in creating beautiful and responsive user interfaces, ensuring that Flavor Haven provides an exceptional user experience across all devices.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full"></div>
              <h3 className="mb-2 text-xl font-bold">Fanilyn Pailagao</h3>
              <p className="text-gray-700">UX/UI Designer</p>
              <p className="text-gray-600">
                Jules is the creative mind behind EternalHaven Kitchen’s simple visual design, creating an intuitive and engaging experience for our users.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-300 rounded-full"></div>
              <h3 className="mb-2 text-xl font-bold">Jules Mag-isa</h3>
              <p className="text-gray-700">Backend Developer</p>
              <p className="text-gray-600">
                Threcia handles all the server-side logic and database management, ensuring that Flavor Haven runs smoothly and securely behind the scenes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;