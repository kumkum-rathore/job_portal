import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-gray-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Logo & About */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Job<span className="text-[#00bcd4]">X</span>
            </h2>
            <p className="text-sm leading-relaxed">
              Sed consequat sapien faus quam bibendum convallis quis in nulla. 
              Pellentesque volutpat odio eget diam cursus semper.
            </p>
            <div className="flex space-x-4">
              {/* Simple Social Icons Placeholder */}
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#00bcd4] cursor-pointer transition-all">f</span>
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#00bcd4] cursor-pointer transition-all">t</span>
              <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#00bcd4] cursor-pointer transition-all">in</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-[#00bcd4] cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-[#00bcd4] cursor-pointer transition-colors">Support</li>
              <li className="hover:text-[#00bcd4] cursor-pointer transition-colors">License</li>
              <li className="hover:text-[#00bcd4] cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          {/* Column 3: More Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-[#00bcd4] cursor-pointer transition-colors">Terms & Conditions</li>
              <li className="hover:text-[#00bcd4] cursor-pointer transition-colors">Privacy</li>
              <li className="hover:text-[#00bcd4] cursor-pointer transition-colors">Referral Terms</li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Need Help?</h3>
            <p className="text-sm mb-4">
              Reach out to our support team for help with posting jobs, finding candidates, or account questions.
            </p>
            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex items-start gap-2">
                <span className="mt-1 text-[#00bcd4]">•</span>
                Email: support@jobx.com
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-1 text-[#00bcd4]">•</span>
                Phone: +1 234 567 890
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-1 text-[#00bcd4]">•</span>
                Live chat available 9am–6pm Mon–Fri
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm">
          <p>Designed and Developed by <span className="text-[#00bcd4]">UIdeck</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;