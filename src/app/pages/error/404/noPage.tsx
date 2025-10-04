import Container from '@/shared/components/layout/container/Container';
import Heading1 from '@/shared/components/typography/Heading1';
import HeadingHero from '@/shared/components/typography/HeadingHero';
import { SEOHead } from '@/shared/components/seo/SEOHead';
import { getSEOData } from '@/shared/utils/seo/seoData';

const NoPage = () => {
  const seoData = getSEOData('notFound');
  
  return (
    <Container>
      {seoData && <SEOHead {...seoData} />}
      <HeadingHero>404</HeadingHero>
      <Heading1>No Page found</Heading1>
    </Container>
  );
};

export default NoPage;
