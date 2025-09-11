// 📞 Contact Support Page (Placeholder)
// Location: src/app/pages/support/contact.tsx
// Purpose: Contact and support page

import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Support</h1>
      <div className="max-w-2xl">
        <p className="text-gray-600 mb-6">
          Get in touch with our support team for assistance with your account or any questions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">📧 Email Support</h3>
            <p className="text-gray-600 mb-2">support@flyp.com</p>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">💬 Live Chat</h3>
            <p className="text-gray-600 mb-2">Available 9 AM - 6 PM CET</p>
            <p className="text-sm text-gray-500">Monday to Friday</p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">🚧 Full contact form and support system coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
