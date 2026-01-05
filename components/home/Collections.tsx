import Link from 'next/link';
import Image from 'next/image';

export default function Collections() {
  return (
    <section className="py-16 bg-primary-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-primary-dark mb-12">
          Our Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/shop/soaps"
            className="relative h-96 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-green/80 to-primary-dark/80 z-10" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-8">
              <h3 className="text-4xl font-serif font-bold mb-4">Handmade Soaps</h3>
              <p className="text-lg text-center mb-6">
                Natural ingredients, gentle on skin, beautifully scented
              </p>
              <span className="bg-white text-primary-green px-6 py-2 rounded-full font-semibold group-hover:bg-primary-cream transition">
                Shop Now
              </span>
            </div>
            <div className="absolute inset-0 bg-gray-300">
              <div className="w-full h-full bg-gradient-to-br from-primary-green/20 to-primary-dark/20" />
            </div>
          </Link>

          <Link
            href="/shop/candles"
            className="relative h-96 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-amber/80 to-primary-dark/80 z-10" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-8">
              <h3 className="text-4xl font-serif font-bold mb-4">Scented Candles</h3>
              <p className="text-lg text-center mb-6">
                Premium candles with long-lasting fragrances
              </p>
              <span className="bg-white text-primary-amber px-6 py-2 rounded-full font-semibold group-hover:bg-primary-cream transition">
                Shop Now
              </span>
            </div>
            <div className="absolute inset-0 bg-gray-300">
              <div className="w-full h-full bg-gradient-to-br from-primary-amber/20 to-primary-dark/20" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
