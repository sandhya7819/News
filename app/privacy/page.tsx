export default function PrivacyPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">GDPR Compliance</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use cookies to ensure you get the best experience on our website. By continuing to use our site, you accept our use of cookies, Privacy Policy, and Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Collection</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or make a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have the right to access, update, or delete your personal information at any time. You can also opt-out of receiving marketing communications from us.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

