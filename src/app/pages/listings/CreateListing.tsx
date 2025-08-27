import React from 'react';
import { Card, CardBody, Button } from '@heroui/react';
import { Building2 } from 'lucide-react';

const CreateListing = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardBody className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Business Listing</h1>
          <p className="text-gray-600 mb-6">
            The listing creation wizard will be implemented in Phase 3.
          </p>
          <p className="text-sm text-blue-600 mb-6">
            This will include multi-step forms, document upload, financial information capture, and
            review workflows.
          </p>
          <Button color="primary" onPress={() => window.history.back()}>
            Back to Dashboard
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateListing;
