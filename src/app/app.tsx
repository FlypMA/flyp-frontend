// 🚀 Main App Component
// Location: src/app/app.tsx
// Purpose: Root application component

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CoreProviders } from './providers/core-providers';
import { AuthenticationProviders } from './providers/authentication-providers';
import { FeatureProviders } from './providers/feature-providers';
import { ApplicationProviders } from './providers/application-providers';

const App: React.FC = () => {
  return (
    <CoreProviders>
      <AuthenticationProviders>
        <FeatureProviders>
          <ApplicationProviders>
            <RouterProvider router={router} />
          </ApplicationProviders>
        </FeatureProviders>
      </AuthenticationProviders>
    </CoreProviders>
  );
};

export default App;
