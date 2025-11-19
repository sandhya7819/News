'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function GDPRNotification() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('gdpr-accepted')
    if (!accepted) {
      setShow(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('gdpr-accepted', 'true')
    setShow(false)
  }

  const handleClose = () => {
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-4 lg:m-2 z-[99] show">
      <div className="bg-white dark:bg-black dark:text-gray-200 rounded-lg shadow-xl p-4 max-w-sm relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 hover:text-primary transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <h2 className="text-lg font-bold mb-1">GDPR Compliance</h2>
        <p className="text-xs mt-1 mb-2">
          We use cookies to ensure you get the best experience on our website. By continuing to use our site, you accept our use of cookies,{' '}
          <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>, and{' '}
          <Link href="/terms" className="text-primary underline">Terms of Service</Link>.
        </p>
        <button
          onClick={handleAccept}
          className="px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold"
          id="uc-accept-gdpr"
        >
          Accept
        </button>
      </div>
    </div>
  )
}

