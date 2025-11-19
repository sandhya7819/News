'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'

interface AccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [activeTab, setActiveTab] = useState(0) // 0: sign in, 1: sign up, 2: reset password, 3: terms

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white dark:bg-black dark:text-gray-200 rounded-lg max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-0 border-0 dark:text-white dark:opacity-50 hover:text-primary hover:rotate-90 duration-150 transition-all z-10"
          type="button"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col gap-2 md:gap-4 text-center p-3 lg:p-4 lg:px-4 py-4 lg:py-8">
          {/* Tabs Navigation - Hidden as per original */}
          <ul className="hidden nav-x justify-center text-lg py-2 border-b" role="tablist">
            <li className={activeTab === 0 ? 'active' : ''} role="presentation">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(0) }} aria-selected={activeTab === 0} role="tab">Sign in</a>
            </li>
            <li className={activeTab === 1 ? 'active' : ''} role="presentation">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(1) }} aria-selected={activeTab === 1} role="tab">Sign up</a>
            </li>
            <li className={activeTab === 2 ? 'active' : ''} role="presentation">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(2) }} aria-selected={activeTab === 2} role="tab">Reset password</a>
            </li>
            <li className={activeTab === 3 ? 'active' : ''} role="presentation">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(3) }} aria-selected={activeTab === 3} role="tab">Terms of use</a>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="w-full">
            {/* Sign In */}
            {activeTab === 0 && (
              <div className="flex flex-col justify-center items-center gap-2 sm:gap-4 text-center">
                <h4 className="text-xl lg:text-2xl m-0">Log in</h4>
                <div className="flex flex-col gap-2 w-full sm:max-w-sm mx-auto">
                  <form className="flex flex-col gap-2">
                    <input
                      className="w-full px-4 py-2 h-10 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                      type="email"
                      placeholder="Your email"
                      required
                    />
                    <input
                      className="w-full px-4 py-2 h-10 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      required
                    />
                    <div className="flex justify-between items-start text-start">
                      <div className="flex items-center">
                        <input className="rounded dark:bg-gray-800 dark:border-gray-700" type="checkbox" id="inputCheckRemember" />
                        <label className="flex justify-between text-xs sm:text-sm ms-2" htmlFor="inputCheckRemember">Remember me?</label>
                      </div>
                      <a href="#" className="text-sm text-primary" onClick={(e) => { e.preventDefault(); setActiveTab(2) }}>Forgot password</a>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm lg:mt-1" type="submit">Log in</button>
                  </form>
                  <div className="relative h-6 my-2">
                    <hr className="absolute top-1/2 left-0 w-full translate-y-[-50%] m-0" />
                    <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] px-1 text-xs uppercase bg-white dark:bg-gray-800">Or</span>
                  </div>
                  <div className="flex gap-2">
                    <a href="#google" className="flex items-center justify-center flex-1 h-10 rounded border border-gray-900 dark:bg-gray-800 dark:border-gray-700 border-opacity-10 text-xl">G</a>
                    <a href="#facebook" className="flex items-center justify-center flex-1 h-10 rounded border border-gray-900 dark:bg-gray-800 dark:border-gray-700 border-opacity-10 text-xl">f</a>
                    <a href="#twitter" className="flex items-center justify-center flex-1 h-10 rounded border border-gray-900 dark:bg-gray-800 dark:border-gray-700 border-opacity-10 text-xl">X</a>
                  </div>
                </div>
                <p className="text-xs sm:text-sm">Have no account yet? <a className="text-primary" href="#" onClick={(e) => { e.preventDefault(); setActiveTab(1) }}>Sign up</a></p>
              </div>
            )}

            {/* Sign Up */}
            {activeTab === 1 && (
              <div className="flex flex-col justify-center items-center gap-2 sm:gap-4 text-center">
                <h4 className="text-xl lg:text-2xl m-0">Create an account</h4>
                <div className="flex flex-col gap-2 w-full sm:max-w-sm mx-auto">
                  <form className="flex flex-col gap-2">
                    <input className="w-full px-4 py-2 h-10 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800" type="text" placeholder="Full name" required />
                    <input className="w-full px-4 py-2 h-10 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800" type="email" placeholder="Your email" required />
                    <input className="w-full px-4 py-2 h-10 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800" type="password" placeholder="Password" autoComplete="new-password" required />
                    <input className="w-full px-4 py-2 h-10 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800" type="password" placeholder="Re-enter Password" autoComplete="new-password" required />
                    <div className="flex text-start">
                      <div className="flex items-center">
                        <input id="input_checkbox_accept_terms" className="rounded dark:bg-gray-800 dark:border-gray-700" type="checkbox" required />
                        <label htmlFor="input_checkbox_accept_terms" className="flex justify-between text-xs sm:text-sm ms-2">I read and accept the <a href="#" className="text-primary ms-1" onClick={(e) => { e.preventDefault(); setActiveTab(3) }}>terms of use</a>.</label>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm lg:mt-1" type="submit">Sign up</button>
                  </form>
                  <div className="relative h-6 my-2">
                    <hr className="absolute top-1/2 left-0 w-full translate-y-[-50%] m-0" />
                    <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] px-1 text-xs uppercase bg-white dark:bg-gray-800">Or</span>
                  </div>
                  <div className="flex gap-2">
                    <a href="#google" className="flex items-center justify-center flex-1 h-10 rounded border border-gray-900 dark:bg-gray-800 dark:border-gray-700 border-opacity-10 text-xl">G</a>
                    <a href="#facebook" className="flex items-center justify-center flex-1 h-10 rounded border border-gray-900 dark:bg-gray-800 dark:border-gray-700 border-opacity-10 text-xl">f</a>
                    <a href="#twitter" className="flex items-center justify-center flex-1 h-10 rounded border border-gray-900 dark:bg-gray-800 dark:border-gray-700 border-opacity-10 text-xl">X</a>
                  </div>
                </div>
                <p className="text-xs sm:text-sm">Already have an account? <a className="text-primary" href="#" onClick={(e) => { e.preventDefault(); setActiveTab(0) }}>Log in</a></p>
              </div>
            )}

            {/* Reset Password */}
            {activeTab === 2 && (
              <div className="flex flex-col justify-center items-center gap-2 sm:gap-4 text-center">
                <h4 className="text-xl lg:text-2xl m-0">Reset password</h4>
                <div className="w-full sm:max-w-sm">
                  <form className="flex flex-col gap-2">
                    <input className="w-full px-4 py-2 h-10 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800" type="email" placeholder="Your email" required />
                    <div className="flex text-start">
                      <input className="rounded dark:bg-gray-800 dark:border-gray-700" type="checkbox" id="inputCheckVerify" required />
                      <label className="text-xs sm:text-sm ms-2" htmlFor="inputCheckVerify"> <span>I&apos;m not a robot</span>.</label>
                    </div>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm lg:mt-1" type="submit">Reset a password</button>
                  </form>
                </div>
                <p className="text-xs sm:text-sm mt-2 sm:m-0">Remember your password? <a className="text-primary" href="#" onClick={(e) => { e.preventDefault(); setActiveTab(0) }}>Log in</a></p>
              </div>
            )}

            {/* Terms of Use */}
            {activeTab === 3 && (
              <div className="flex flex-col justify-center items-center gap-2 sm:gap-4">
                <h4 className="text-xl lg:text-2xl m-0">Terms of use</h4>
                <div className="text-sm text-start max-h-96 overflow-y-auto w-full">
                  <p>Terms of use dolor sit amet consectetur, adipisicing elit. Recusandae provident ullam aperiam quo ad non corrupti sit vel quam repellat ipsa quod sed, repellendus adipisci, ducimus ea modi odio assumenda.</p>
                  <h5 className="text-base md:text-lg mt-3 mb-1">Disclaimers</h5>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, cum esse possimus officiis amet ea voluptatibus libero! Dolorum assumenda esse, deserunt ipsum ad iusto! Praesentium error nobis tenetur at, quis nostrum facere excepturi architecto totam.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, soluta alias eaque modi ipsum sint iusto fugiat vero velit rerum.</p>
                  <h5 className="text-base md:text-lg mt-3 mb-1">Limitation on Liability</h5>
                  <p>Sequi, cum esse possimus officiis amet ea voluptatibus libero! Dolorum assumenda esse, deserunt ipsum ad iusto! Praesentium error nobis tenetur at, quis nostrum facere excepturi architecto totam.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, soluta alias eaque modi ipsum sint iusto fugiat vero velit rerum.</p>
                  <h5 className="text-base md:text-lg mt-3 mb-1">Copyright Policy</h5>
                  <p>Dolor sit amet consectetur adipisicing elit. Sequi, cum esse possimus officiis amet ea voluptatibus libero! Dolorum assumenda esse, deserunt ipsum ad iusto! Praesentium error nobis tenetur at, quis nostrum facere excepturi architecto totam.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, soluta alias eaque modi ipsum sint iusto fugiat vero velit rerum.</p>
                  <h5 className="text-base md:text-lg mt-3 mb-1">General</h5>
                  <p>Sit amet consectetur adipisicing elit. Sequi, cum esse possimus officiis amet ea voluptatibus libero! Dolorum assumenda esse, deserunt ipsum ad iusto! Praesentium error nobis tenetur at, quis nostrum facere excepturi architecto totam.</p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, soluta alias eaque modi ipsum sint iusto fugiat vero velit rerum.</p>
                </div>
                <p className="text-xs sm:text-sm">Do you agree to our terms? <a className="text-primary" href="#" onClick={(e) => { e.preventDefault(); setActiveTab(1) }}>Sign up</a></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

