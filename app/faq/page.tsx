'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How do I subscribe to the newsletter?',
    answer: 'You can subscribe to our newsletter by entering your email address in the newsletter form located in the footer or on the homepage. We will send you updates about new posts, news, and tips.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can unsubscribe from our newsletter at any time by clicking the unsubscribe link in any email we send you, or by contacting us directly.',
  },
  {
    question: 'How do I create an account?',
    answer: 'Click on the "Sign up" link in the header or footer, fill in your information, accept the terms of use, and click "Sign up".',
  },
  {
    question: 'How do I reset my password?',
    answer: 'Click on "Forgot password" on the sign-in page, enter your email address, and follow the instructions sent to your email.',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can contact our support team through the contact form on our website or by sending an email to support@tnf.com.',
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Yes, we use industry-standard encryption to protect your payment information. We never store your full credit card details on our servers.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-semibold text-left">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

