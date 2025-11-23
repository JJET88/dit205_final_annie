import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Header() {
	return (
		<header className="flex flex-col sm:flex-row justify-between items-center mb-12 pt-6">
			<div>
				<h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-2">
					Movie Catalog
				</h1>
				<p className="text-cyan-300 text-lg">🛍️ Manage Your Inventory</p>
			</div>
            <div className=" flex items-center gap-5">

          
			<div>
				<Link
					href={`/products/create`}
					className="mt-6 sm:mt-0 px-4 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 font-bold shadow-lg transform hover:scale-105 flex items-center gap-2"
				>
					<span className="text-xl">➕</span>
					<span>Add Movie</span>
				</Link>
			</div>
			<div>
				<button
					onClick={() => signOut({ callbackUrl: "/login" })}
					className="flex items-center gap-2 px-6 py-3 bg-red-500/20 backdrop-blur-sm border-2 border-red-400/30 text-red-400 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-400 transition-all duration-300 font-bold shadow-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
							clipRule="evenodd"
						/>
					</svg>
					<span className="hidden sm:inline">Logout</span>
				</button>
			</div>
              </div>
		</header>
	);
}
