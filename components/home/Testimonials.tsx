const testimonials = [
  {
    name: 'Sarah Johnson',
    text: 'The lavender soap is absolutely divine! My skin feels so soft and the scent is calming.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    text: 'Best candles I\'ve ever purchased. The vanilla scent fills my entire home and lasts for hours.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    text: 'Perfect gift sets! I bought the holiday collection for my family and they loved it.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-primary-dark mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-primary-cream rounded-lg p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
              <p className="font-semibold text-primary-dark">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
