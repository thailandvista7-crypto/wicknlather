import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Collections from '@/components/home/Collections';
import Testimonials from '@/components/home/Testimonials';
import TrustBadges from '@/components/home/TrustBadges';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Wick & Lather',
    description: 'Premium handmade soaps and scented candles',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/shop?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Wick & Lather',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Premium handmade soaps and scented candles',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'Customer Service',
      email: 'hello@wicknlather.com',
    },
    sameAs: [
      'https://www.facebook.com/wicknlather',
      'https://www.instagram.com/wicknlather',
      'https://www.twitter.com/wicknlather',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Hero />
      <FeaturedProducts />
      <Collections />
      <TrustBadges />
      <Testimonials />
      <Newsletter />
    </>
  );
}
