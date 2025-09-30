// 🦶 Footer Component - Exact match to legacy footer
// Location: src/shared/components/layout/Footer.tsx
// Purpose: Footer matching legacy implementation exactly

import { Globe, Mail, MapPin, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UrlGenerator } from '../../../services';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: For Sellers */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">For Sellers</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/for-sellers"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Sell Your Business
                </Link>
              </li>
              <li>
                <Link
                  to="/valuation"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Get Free Valuation
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/valuation-guide"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Valuation Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/resources/due-diligence"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Due Diligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: For Buyers */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">For Buyers</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/search"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Browse Businesses
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/how-it-works"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={UrlGenerator.contact()}
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Help Center
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>hello@upswitch.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>Brussels, Belgium</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 text-xs text-neutral-400 mt-6">
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" />
                <span>Pan-EU</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-neutral-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-neutral-400">
            <Link to={UrlGenerator.privacyPolicy()} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link
              to={UrlGenerator.termsConditions()}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link to="/gdpr" className="hover:text-white transition-colors">
              GDPR Compliance
            </Link>
            <Link to="/security" className="hover:text-white transition-colors">
              Security
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-neutral-400 text-sm">© 2025 Upswitch. All rights reserved.</div>

            {/* Additional Info */}
            <div className="text-neutral-400 text-xs text-center lg:text-right">
              <p>Licensed M&A Platform • Regulated by Belgian Financial Services</p>
              <p>VAT: BE 0XXX.XXX.XXX</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
