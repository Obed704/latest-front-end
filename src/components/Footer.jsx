// src/components/Footer.jsx
import React from "react";

// Load backend URL from environment variables if needed
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const footerData = {
  info: {
    title: "STEM Inspires",
    description:
      "Inspiring the next generation of innovators through hands-on STEM education.",
    socials: [
      { icon: "S", href: "#", color: "bg-green-500" },
      { icon: "T", href: "#", color: "bg-yellow-400" },
      { icon: "E", href: "#", color: "bg-purple-500" },
      { icon: "M", href: "#", color: "bg-blue-400" },
    ],
  },
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "Our Project", href: "/ourProjects" },
    { name: "Donate", href: "/donate" },
    { name: "Champions", href: "/champions" },
  ],
  programs: [
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  contact: [
    { text: "info@steminspires.tech", href: "mailto:info@steminspires.tech" },
    { text: "(555) 123-4567", href: "#" },
    { text: "123 STEM Avenue", href: "#" },
    { text: "Tech City, TC 10001", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white py-16 px-6 md:px-20 overflow-hidden">
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">{footerData.info.title}</h3>
          <p className="mb-4 text-gray-300">{footerData.info.description}</p>
          <div className="flex gap-4 mt-4">
            {footerData.info.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-lg hover:scale-110 transition-transform`}
                aria-label={`Visit our ${social.icon} page`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {footerData.quickLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:text-blue-400 transition">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h3 className="text-xl font-bold mb-4">Programs</h3>
          <ul className="space-y-2">
            {footerData.programs.map((link, idx) => (
              <li key={idx}>
                <a href={link.href} className="hover:text-blue-400 transition">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            {footerData.contact.map((item, idx) => (
              <li key={idx}>
                <a href={item.href} className="hover:text-blue-400 transition">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm relative z-10">
        &copy; {new Date().getFullYear()} STEM Inspires. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
