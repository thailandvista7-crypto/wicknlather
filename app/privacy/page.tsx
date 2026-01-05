export const metadata = {
  title: 'Privacy Policy | Wick & Lather',
  description: 'Privacy Policy for Wick & Lather ecommerce website.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 space-y-6">
          <section>
            <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            <p className="text-gray-700 leading-relaxed">
              At Wick & Lather, we are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Name, email address, and phone number</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely through Stripe and PayPal)</li>
              <li>Order history and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information.
              Payment information is processed securely through our payment partners and is not
              stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to access, update, or delete your personal information at any time.
              Please contact us if you wish to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at
              hello@wicknlather.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
