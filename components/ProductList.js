/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import Header from "./Header";

const showToast = (message, type) => {
	console.log(`[${type}] ${message}`);
};

export default function ProductList() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 8;

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/products");
			if (!res.ok) throw new Error("Failed to fetch products.");
			const data = await res.json();
			setProducts(data || []);
		} catch (err) {
			console.error("Error fetching products:", err);
			showToast("❌ Failed to load products.", "error");
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		if (!confirm("Are you sure you want to delete this product?")) return;

		try {
			const res = await fetch(`/api/products/${id}`, {
				method: "DELETE",
			});

			if (!res.ok) throw new Error("Failed to delete product.");

			setProducts(products.filter((p) => p.id !== id));
			showToast("🗑️ Product deleted successfully!", "success");
		} catch (err) {
			console.error(err);
			showToast("❌ Failed to delete product.", "error");
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const categories = useMemo(
		() => [
			"All",
			...new Set(products.map((p) => p.category || "Uncategorized")),
		],
		[products]
	);

	const filteredProducts = useMemo(() => {
		let list = products;
		if (search) {
			list = list.filter((p) =>
				p.name?.toLowerCase().includes(search.toLowerCase())
			);
		}

		setCurrentPage(1);
		return list;
	}, [products, search]);

	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
	const startIndex = (currentPage - 1) * productsPerPage;
	const currentProducts = filteredProducts.slice(
		startIndex,
		startIndex + productsPerPage
	);

	if (loading)
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="relative inline-block">
							<div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
							<div
								className="absolute inset-0 w-20 h-20 border-4 border-purple-500 border-b-transparent rounded-full animate-spin"
								style={{
									animationDirection: "reverse",
									animationDuration: "1.5s",
								}}
							></div>
						</div>
						<p className="text-xl text-cyan-400 font-bold mt-6 animate-pulse tracking-wider">
							LOADING PRODUCTS...
						</p>
					</div>
				</div>
			</div>
		);

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
			<div className="relative z-10 p-8 max-w-7xl mx-auto">
				{/* Header */}
				<Header/>

				{/* Search Bar */}
				<div className="mb-10">
					<div className="relative max-w-2xl mx-auto">
						<input
							type="text"
							placeholder="🔍 Search products..."
							className="w-full p-5 pl-14 bg-slate-900/50 backdrop-blur-sm border-2 border-cyan-400/30 rounded-2xl shadow-lg focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<svg
							className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-cyan-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>

				{/* Product Grid */}
				{currentProducts.length ? (
					<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
						{currentProducts.map((p, index) => (
							<li
								key={p.id}
								className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500 overflow-hidden hover:scale-105 hover:border-cyan-400/50"
								style={{
									animationDelay: `${index * 0.05}s`,
									animation: "slideUp 0.6s ease-out forwards",
									opacity: 0,
								}}
							>
								<a
									href={`/products/${p.id}`}
									className="block relative overflow-hidden h-56 w-full bg-gradient-to-br from-slate-800 to-slate-900"
								>
									<img
										src={p.coverimage || p.imageUrl}
										alt={p.title || p.name}
										className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>

									{/* Hover overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								</a>

								<div className="p-5 flex flex-col">
									<h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 truncate">
										{p.title || p.name}
									</h2>
									<p className="text-sm text-gray-400 mb-4 line-clamp-2 min-h-[3rem] leading-relaxed">
										{p.detail}
									</p>

									<div className="pt-4 border-t border-slate-700/50 flex items-center justify-between gap-2">
										<a
											href={`/products/${p.id}`}
											className="flex-1 p-2.5 bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-300 flex items-center justify-center"
											title="View"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={2}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.181a1.012 1.012 0 010 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.575-3.01-9.963-7.181z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
										</a>

										<a
											href={`/products/${p.id}/edit`}
											className="flex-1 p-2.5 bg-purple-500/20 border border-purple-400/30 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center"
											title="Edit"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
											</svg>
										</a>

										<button
											onClick={() => handleDelete(p.id)}
											className="flex-1 p-2.5 bg-red-500/20 border border-red-400/30 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
											title="Delete"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				) : (
					<div className="flex items-center justify-center py-20">
						<div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-400/30 rounded-3xl shadow-2xl p-12 text-center">
							<div className="text-7xl mb-4 animate-pulse">🔍</div>
							<p className="text-2xl text-cyan-300 font-semibold">
								No products found
							</p>
							<p className="text-gray-400 mt-2">Try adjusting your search</p>
						</div>
					</div>
				)}

				{/* Pagination */}
				<div className="flex justify-center items-center gap-4 pb-12">
					<button
						disabled={currentPage === 1}
						onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
						className="px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 text-cyan-400 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all duration-300 font-semibold"
					>
						← Previous
					</button>

					<div className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl">
						<span className="font-bold text-white">
							Page <span className="text-cyan-400">{currentPage}</span> of{" "}
							<span className="text-purple-400">{totalPages}</span>
						</span>
					</div>

					<button
						disabled={currentPage === totalPages}
						onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
						className="px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 text-cyan-400 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all duration-300 font-semibold"
					>
						Next →
					</button>
				</div>
			</div>

			<style jsx>{`
				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
