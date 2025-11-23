import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function UserProfile() {
      const { data: session, status } = useSession();
    
  return (
    <div>
       <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-cyan-400/20 shadow-lg">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border-2 border-cyan-400/30 rounded-full flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider">Welcome back</p>
                      <p className="text-white font-bold text-lg">{session.user?.name || session.user?.email}</p>
                    </div>
                  </div>
      
                  {/* Logout Button */}
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500/20 backdrop-blur-sm border-2 border-red-400/30 text-red-400 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-400 transition-all duration-300 font-bold shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>
            </nav>
      
    </div>
  )
}
