import Container from '../../../components/main_UI/containers/container_default';
import Heading1 from '../../../components/main_UI/fonts/heading1';
import HeadingHero from '../../../components/main_UI/fonts/headingHero';
import { SEOHead } from '../../../components/SEO';
import { getSEOData } from '../../../constants/seoData';

const NoPage = () => {
  return (
    <Container>
      <SEOHead {...getSEOData('notFound')} />
      <HeadingHero>404</HeadingHero>
      <Heading1>No Page found</Heading1>
    </Container>
  );
};

export default NoPage;
