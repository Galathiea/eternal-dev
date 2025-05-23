import React from 'react';
import { Link } from 'react-router-dom';

const OurStory: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-4xl font-bold">Our Story</h1>
      <p className="mb-8 text-lg">
        Founded in 2025, Flavor Haven began as a small blog sharing family recipes and has grown into a community of food lovers from around the world.
      </p>
      <Link to="/meet-our-team" className="px-6 py-3 text-white bg-orange-500 rounded-lg">
        Meet Our Team
      </Link>
    </div>
  );
};

export default OurStory;