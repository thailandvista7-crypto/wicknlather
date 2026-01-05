export const metadata = {
  title: 'About Us | Wick & Lather',
  description: 'Learn about Wick & Lather, our story, and our commitment to natural, handmade soaps and candles.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-8 text-center">
          About Wick & Lather
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 space-y-6">
          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Wick & Lather was born from a passion for natural, handcrafted products that bring
              warmth and comfort to everyday life. Founded in 2020, we set out to create premium
              handmade soaps and scented candles using only the finest natural ingredients.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each product is carefully crafted by hand, ensuring quality and attention to detail
              that mass-produced items simply cannot match. We believe in the power of natural
              ingredients and the joy of small, thoughtful luxuries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to provide high-quality, natural products that enhance your daily
              routine while being kind to your skin and the environment. We are committed to
              sustainability, transparency, and the art of traditional craftsmanship.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">
              Natural Ingredients
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We source only the best natural ingredients for our products:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Organic oils and butters for our soaps</li>
              <li>Natural waxes for our candles</li>
              <li>Essential oils for authentic, long-lasting scents</li>
              <li>No synthetic fragrances or harmful chemicals</li>
              <li>Eco-friendly packaging materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-primary-green mb-2">Quality</h3>
                <p className="text-gray-700 text-sm">
                  Every product is handcrafted with care and attention to detail.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary-green mb-2">Sustainability</h3>
                <p className="text-gray-700 text-sm">
                  We prioritize eco-friendly practices and sustainable sourcing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary-green mb-2">Transparency</h3>
                <p className="text-gray-700 text-sm">
                  Full ingredient lists and honest product descriptions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary-green mb-2">Customer Care</h3>
                <p className="text-gray-700 text-sm">
                  Your satisfaction is our priority. We're here to help.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
