const Footer = () => {
  
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-800 px-8 md:px-24 py-16 mt-auto">
      {/* UPPER SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-200 pb-10">
        
        {/* LOGO + DESCRIPTION */}
        <div>
          <img
            src="/blisslogo1.png"
            alt="Sport Shop Logo"
            className="w-40 mb-5 opacity-90 hover:opacity-100 transition"
          />
          <p className="text-gray-600 leading-relaxed text-sm max-w-xs">
            Elevate your performance with our premium sports gear — 
            built for power, precision, and endurance.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-gray-900 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {["Home", "About Us", "Shop", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-gray-900 uppercase tracking-wide">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>123 SportShop Ave, City, Country</li>
            <li>📞 (123) 456-7890</li>
            <li>✉️ info@sportshop.com</li>
          </ul>
        </div>
      </div>

      {/* LOWER SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-10 text-center md:text-left text-sm text-gray-500">
        {/* SOCIAL ICONS */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          {/* GitHub */}
          <a
            href="#"
            className="text-gray-600 hover:text-red-600 transition"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8..." />
            </svg>
          </a>

          {/* Twitter */}
          <a
            href="#"
            className="text-gray-600 hover:text-red-600 transition"
            aria-label="Twitter"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.954 4.569c-.885.392-1.83..." />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="#"
            className="text-gray-600 hover:text-red-600 transition"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.676 0H1.326A1.326..." />
            </svg>
          </a>
        </div>

        {/* COPYRIGHT */}
        <p>
          &copy; 2025{" "}
          <span className="font-semibold text-red-600">SportShop</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;