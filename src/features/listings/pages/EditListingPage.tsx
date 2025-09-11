// ✏️ Edit Listing Page (Placeholder)
// Location: src/features/listings/pages/EditListingPage.tsx
// Purpose: Edit existing business listing page

import React from 'react';
import { useParams } from 'react-router-dom';

const EditListingPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="edit-listing-page p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Listing</h1>
      <div className="max-w-2xl">
        <p className="text-gray-600 mb-4">Editing listing: {id || 'Unknown'}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">
            🚧 This page is under development. Full listing editing functionality coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditListingPage;
