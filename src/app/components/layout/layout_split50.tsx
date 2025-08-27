import { Link, Outlet } from 'react-router-dom';
import { logos } from '../../../assets/logos';
import { Image } from '@heroui/react';
import UrlGeneratorService from '../../services/urlMapping/urlGeneratorService';

const SplitScreenLayout = () => {
  return (
    <div data-scope="navigation" className="h-screen">
      <div className="absolute pt-10 pl-6">
        <Link to={UrlGeneratorService.root()}>
          <Image src={logos.main} alt="betweendeals logo" width={64} className="text-white" />
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default SplitScreenLayout;
