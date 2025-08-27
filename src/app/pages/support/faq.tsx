import React from 'react';
import Container from '../../components/main_UI/containers/container_default';
import Heading1 from '../../components/main_UI/fonts/heading1';
import Heading2 from '../../components/main_UI/fonts/heading2';

const FAQ: React.FC = () => {
  return (
    <Container className="max-w-4xl">
      <div className="py-12">
        <Heading1 className="text-center mb-8">Frequently Asked Questions</Heading1>

        <div className="space-y-8">
          <div>
            <Heading2>What is Ilara?</Heading2>
            <p className="text-gray-600 mt-2">
              Ilara is an AI-powered platform that helps creators and businesses optimize their
              content and marketing strategies.
            </p>
          </div>

          <div>
            <Heading2>How do I get started?</Heading2>
            <p className="text-gray-600 mt-2">
              Simply sign up for an account and follow our onboarding process to get started with
              Ilara.
            </p>
          </div>

          <div>
            <Heading2>Is there a free trial?</Heading2>
            <p className="text-gray-600 mt-2">
              Yes, we offer a free trial period for new users to explore our platform.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
