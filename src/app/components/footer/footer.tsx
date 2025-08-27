import React from 'react';
import { Link } from 'react-router-dom';
import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { Shield, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { BetweendealsLogo } from '../common';

const Footer = () => {
  const { openModal } = useAuthModal();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Brand Logo/Name */}
              <div className="flex items-center space-x-4">
                <div className="p-3 footer-logo-container">
                  <BetweendealsLogo
                    variant="footer"
                    className="w-12 h-12 hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">betweendeals</h3>
                  <p className="text-sm text-neutral-400">European M&A Platform</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-neutral-300 text-sm leading-relaxed max-w-md">
                  Europe's leading platform for SME mergers & acquisitions. Connecting verified
                  buyers and sellers across 15+ countries with complete transaction support.
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    <span>Secure & Confidential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    <span>Pan-European</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/for-sellers"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  For Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  For Buyers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
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
                  Due Diligence Checklist
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to={UrlGeneratorService.contact()}
                  className="text-neutral-400 hover:text-white transition-colors text-sm block py-1"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>hello@betweendeals.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>Brussels, Belgium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-neutral-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-neutral-400">
            <Link
              to={UrlGeneratorService.privacyPolicy()}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to={UrlGeneratorService.termsConditions()}
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
            <div className="text-neutral-400 text-sm">
              © 2025 betweendeals. All rights reserved.
            </div>

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
