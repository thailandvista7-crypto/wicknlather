export default function TrustBadges() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-green mb-2">100%</div>
            <p className="text-gray-600">Natural Ingredients</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-green mb-2">Free</div>
            <p className="text-gray-600">Shipping Over $50</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-green mb-2">30-Day</div>
            <p className="text-gray-600">Money Back Guarantee</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-green mb-2">5★</div>
            <p className="text-gray-600">Customer Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
