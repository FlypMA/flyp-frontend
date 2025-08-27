import { HeroUIProvider } from '@heroui/react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <div data-overlay-container="true">
          <div data-testid="app-container" className="min-h-screen bg-background text-foreground">
            {/* Your app content will go here */}
          </div>
        </div>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;
