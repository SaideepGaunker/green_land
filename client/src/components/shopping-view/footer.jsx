// Importing necessary icons from lucide-react library
import { Mail, MapPin, Phone } from "lucide-react"; // Icons for email, location, and phone

/**
 * Component: Footer
 * This component represents the footer section of a website. It includes contact information,
 * quick links to important pages, and an embedded Google Map showing the business location.
 * The footer also displays a copyright notice dynamically based on the current year.
 */
function Footer() {
  return (
    <footer className="text-white py-8 bg-[#5f4035a8] mx-auto border rounded-t-[20px] max-w-[99vw] backdrop-blur-md">
      {/* Container for the main content */}
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Contact Information Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          {/* Address */}
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-yellow-400" /> {/* Location icon */}
            Ponda Goa
          </p>
          {/* Phone Number */}
          <p className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-yellow-400" /> {/* Phone icon */}
            +91 7768993857
          </p>
          {/* Email Address */}
          <p className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-yellow-400" /> {/* Email icon */}
            gatewaygarden437@gmail.com
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="text-sm flex flex-row gap-2 md:flex-col md:gap-4">
            {/* Link to Home Page */}
            <li>
              <a href="/shop/home" className="hover:underline text-[#d7edbb]">
                Home
              </a>
            </li>
            {/* Link to Products Page */}
            <li>
              <a href="/shop/listing" className="hover:underline text-[#d7edbb]">
                Products
              </a>
            </li>
            {/* Link to My Account Page */}
            <li>
              <a href="/shop/account" className="hover:underline text-[#d7edbb]">
                My Account
              </a>
            </li>
            {/* Link to Checkout Page */}
            <li>
              <a href="/shop/checkout" className="hover:underline text-[#d7edbb]">
                Checkout
              </a>
            </li>
          </ul>
        </div>

        {/* Google Map Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Our Location</h2>
          {/* Embedded Google Map */}
          <iframe
            className="w-full h-40 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112811.5114155048!2d73.92581742587357!3d15.438801994974602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfbabfcfe07ead%3A0x9c903a261e1e41c4!2sPonda%2C%20Goa!5e1!3m2!1sen!2sin!4v1738163873938!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        {/* Dynamically display the current year in the copyright notice */}
        <p>&copy; {new Date().getFullYear()} Garden Gateway. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

/**
 * Explanation of the Code:
 * This component is designed to serve as the footer section of a website. It provides essential information
 * such as contact details, quick navigation links, and the business location via an embedded Google Map.
 *
 * Key Features:
 * - **Contact Information:** Displays the business address, phone number, and email using icons for better
 *   visual representation.
 * - **Quick Links:** Provides links to important pages like Home, Products, My Account, and Checkout. These
 *   links are styled to highlight when hovered over, improving user interaction.
 * - **Google Map Integration:** An embedded Google Map shows the business location, allowing users to easily
 *   locate the physical address.
 * - **Dynamic Copyright Notice:** The copyright year is dynamically updated based on the current year using
 *   JavaScript's `Date` object.
 * - **Responsive Design:** The layout adapts to different screen sizes using a responsive grid system (`grid-cols-1`,
 *   `md:grid-cols-2`, `lg:grid-cols-3`), ensuring a clean and organized appearance on all devices.
 *
 * How It Works:
 * 1. The footer is divided into three main sections: Contact Information, Quick Links, and Our Location.
 * 2. Each section is rendered within a responsive grid layout that adjusts based on the screen size.
 * 3. The `iframe` embeds a Google Map with the business location preloaded.
 * 4. The copyright notice dynamically updates the year using `new Date().getFullYear()`.
 *
 * Usage:
 * This footer can be used in any website or web application to provide essential information and improve user
 * navigation. It is particularly useful for e-commerce websites, blogs, or business websites where users need
 * quick access to contact details, important pages, and the business location.
 */