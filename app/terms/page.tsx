export const metadata = {
  title: 'Terms & Conditions | Wick & Lather',
  description: 'Terms and Conditions for Wick & Lather ecommerce website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-8">
          Terms & Conditions
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 space-y-6">
          <section>
            <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-gray-700 leading-relaxed">
              Please read these Terms and Conditions carefully before using the Wick & Lather
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by these Terms
              and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Products</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to provide accurate product descriptions and images. However, we reserve the
              right to correct any errors, inaccuracies, or omissions at any time.
            </p>
            <p className="text-gray-700 leading-relaxed">
              All products are subject to availability. We reserve the right to discontinue any
              product at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Pricing</h2>
            <p className="text-gray-700 leading-relaxed">
              All prices are in USD and are subject to change without notice. We reserve the right
              to refuse or cancel any order at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">
              Returns & Refunds
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer a 30-day money-back guarantee on all products. To be eligible for a return,
              items must be unused and in their original packaging.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Refund requests must be submitted through your account dashboard. Once approved,
              refunds will be processed to the original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Wick & Lather shall not be liable for any indirect, incidental, or consequential
              damages arising from the use of our products or website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms, please contact us at hello@wicknlather.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
