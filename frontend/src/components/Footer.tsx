// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 text-white bg-amber-900">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              EternalHavenKitchen
            </h3>
            <p className="max-w-md text-amber-200">
              Your go-to destination for delicious recipes that bring joy to every meal.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h4 className="mb-3 text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-amber-200 hover:text-white">Home</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white">Recipes</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white">Categories</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-lg font-semibold">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-amber-200 hover:text-white">Breakfast</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white">Main Dishes</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white">Desserts</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white">Healthy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-lg font-semibold">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-amber-200 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white">Newsletter</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-8 text-center border-t border-amber-800 text-amber-300">
          <p>&copy; {new Date().getFullYear()} EternalHaven Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;