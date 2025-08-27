import React from 'react';

interface PlatformCardProps {
  name: string;
  visits: number;
  logoUrl: string;
  bgColor: string;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ name, visits, logoUrl, bgColor }) => {
  return (
    <div
      className="shadow-md rounded-xl overflow-hidden p-4 hover:shadow-lg transition-shadow duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-center">
        {/* White circle container for the favicon */}
        <div className="flex items-center justify-center bg-white rounded-full w-12 h-12">
          <img src={logoUrl} alt={`${name} Logo`} className="w-6 h-6 object-cover" />
        </div>
      </div>
      <h3 className="font-semibold text-md text-center text-gray-100 mt-4">{name}</h3>
      <p className="text-gray-100 text-xs text-center">{visits} visits</p>
    </div>
  );
};

export default PlatformCard;
