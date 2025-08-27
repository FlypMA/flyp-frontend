import React from 'react';

interface BetweendealsLoadingLogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'dark' | 'gray';
  className?: string;
  showText?: boolean;
  text?: string;
}

const BetweendealsLoadingLogo: React.FC<BetweendealsLoadingLogoProps> = ({
  size = 'md',
  color = 'gray',
  className = '',
  showText = false,
  text = 'Loading...',
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6';
      case 'md':
        return 'w-8 h-8';
      case 'lg':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'white':
        return 'text-white';
      case 'dark':
        return 'text-zinc-800';
      case 'gray':
        return 'text-zinc-400';
      default:
        return 'text-zinc-400';
    }
  };

  const getFillColor = () => {
    switch (color) {
      case 'white':
        return '#ffffff';
      case 'dark':
        return '#27272a';
      case 'gray':
        return '#9ca3af';
      default:
        return '#9ca3af';
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-3 ${className}`}
      data-testid="betweendeals-loading-logo"
    >
      {/* Animated betweendeals Logo */}
      <div className={`${getSizeClass()} ${getColorClass()} relative`}>
        <svg
          className="animate-pulse duration-2000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 47 47"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))',
            animation: 'betweendealsGlow 2s ease-in-out infinite alternate',
          }}
        >
          <defs>
            <style>
              {`
                @keyframes betweendealsGlow {
                  0% { 
                    filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
                    transform: scale(1);
                  }
                  50% { 
                    filter: drop-shadow(0 0 16px rgba(99, 102, 241, 0.6));
                    transform: scale(1.05);
                  }
                  100% { 
                    filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
                    transform: scale(1);
                  }
                }
                @keyframes betweendealsRotate {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                .betweendeals-path {
                  animation: betweendealsRotate 4s linear infinite;
                  transform-origin: center;
                }
              `}
            </style>
            {/* Gradient for the logo */}
            <linearGradient id="betweendealsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#betweendealsGradient)"
            d="M17.567,15.938l-2.859-2.702c0.333-0.605,0.539-1.29,0.539-2.029c0-2.342-1.897-4.239-4.24-4.239
                c-2.343,0-4.243,1.896-4.243,4.239c0,2.343,1.9,4.241,4.243,4.241c0.826,0,1.59-0.246,2.242-0.654l2.855,2.699
                C16.536,16.922,17.023,16.399,17.567,15.938z"
          />
          <path
            fill="url(#betweendealsGradient)"
            d="M29.66,15.6l3.799-6.393c0.374,0.107,0.762,0.184,1.169,0.184c2.347,0,4.244-1.898,4.244-4.241
                c0-2.342-1.897-4.239-4.244-4.239c-2.343,0-4.239,1.896-4.239,4.239c0,1.163,0.469,2.214,1.227,2.981l-3.787,6.375
                C28.48,14.801,29.094,15.169,29.66,15.6z"
          />
          <path
            fill="url(#betweendealsGradient)"
            d="M42.762,20.952c-1.824,0-3.369,1.159-3.968,2.775l-5.278-0.521c0,0.04,0.006,0.078,0.006,0.117
                c0,0.688-0.076,1.36-0.213,2.009l5.276,0.521c0.319,2.024,2.062,3.576,4.177,3.576c2.342,0,4.238-1.896,4.238-4.238
                C47,22.85,45.104,20.952,42.762,20.952z"
          />
          <path
            fill="url(#betweendealsGradient)"
            d="M28.197,37.624l-1.18-5.156c-0.666,0.232-1.359,0.398-2.082,0.481l1.182,5.157c-1.355,0.709-2.29,2.11-2.29,3.746
                c0,2.342,1.896,4.237,4.243,4.237c2.342,0,4.238-1.896,4.238-4.237C32.311,39.553,30.479,37.692,28.197,37.624z"
          />
          <path
            fill="url(#betweendealsGradient)"
            d="M14.357,25.37l-6.57,2.201c-0.758-1.158-2.063-1.926-3.548-1.926C1.896,25.645,0,27.542,0,29.884
                c0,2.345,1.896,4.242,4.239,4.242c2.341,0,4.242-1.897,4.242-4.242c0-0.098-0.021-0.188-0.029-0.284l6.591-2.207
                C14.746,26.752,14.51,26.077,14.357,25.37z"
          />
          <circle fill="url(#betweendealsGradient)" cx="23.83" cy="23.323" r="7.271" />
        </svg>

        {/* Optional floating dots around the logo */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-ping"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="absolute top-1/2 right-0 w-1 h-1 bg-purple-400 rounded-full animate-ping"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-1/2 left-0 w-1 h-1 bg-indigo-400 rounded-full animate-ping"
            style={{ animationDelay: '1.5s' }}
          ></div>
        </div>
      </div>

      {/* Optional loading text */}
      {showText && (
        <div className="text-center">
          <p className={`text-sm font-medium ${getColorClass()}`}>{text}</p>
          <div className="flex justify-center mt-1 space-x-1">
            <div
              className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: '0s' }}
            ></div>
            <div
              className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BetweendealsLoadingLogo;
