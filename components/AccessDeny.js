import Link from 'next/link'
import React from 'react'

export default function AccessDeny() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="bg-slate-900/50 backdrop-blur-xl border-2 border-red-400/30 shadow-2xl shadow-red-500/20 rounded-3xl p-12 max-w-md text-center">
          
            
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-3">
              Access Denied
            </h2>
            <p className="text-gray-300 mb-8">
              You need to be logged in to access this page
            </p>
            
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Go to Login</span>
            </Link>
          </div>
        </div>
      </div>
  )
}
