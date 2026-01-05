import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-cream via-white to-primary-cream py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-dark mb-6">
            Handcrafted with Care
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover our premium collection of handmade soaps and scented candles.
            Natural ingredients, beautiful scents, perfect for gifting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop/soaps"
              className="bg-primary-green text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition shadow-lg hover:shadow-xl"
            >
              Shop Soaps
            </Link>
            <Link
              href="/shop/candles"
              className="bg-primary-amber text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition shadow-lg hover:shadow-xl"
            >
              Shop Candles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
