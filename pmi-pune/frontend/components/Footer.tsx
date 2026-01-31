import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">PMI Pune-Deccan</h3>
            <p className="text-gray-400 mb-4">
              Empowering project management professionals in Pune and surrounding regions through
              networking, education, and professional development.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/events/calendar" className="text-gray-400 hover:text-white transition">
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-gray-400 hover:text-white transition">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-gray-400 hover:text-white transition">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white transition">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-400 hover:text-white transition">
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sponsorship" className="text-gray-400 hover:text-white transition">
                  Sponsorship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://www.pmi.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  PMI Global
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@pmipunechapter.com" className="text-gray-400 hover:text-white transition">
                  info@pmipunechapter.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">+91-XXXX-XXXXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Pune, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} PMI Pune-Deccan India Chapter. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
