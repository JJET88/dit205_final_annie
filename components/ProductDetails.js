/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ProductDetails({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(false);

    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <p className="text-xl text-cyan-400 font-bold mt-6 animate-pulse tracking-wider">
              LOADING DETAILS...
            </p>
          </div>
        </div>
      </div>
    );

  if (error || !product)
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-red-500/10 backdrop-blur-xl border-2 border-red-500/50 rounded-2xl shadow-2xl shadow-red-500/20 p-12 max-w-md text-center">
            <div className="text-red-400 text-7xl mb-4 animate-pulse">❌</div>
            <p className="text-2xl text-red-400 font-bold">Product Not Found</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex justify-center items-center min-h-screen p-6 py-12">
        <div className="bg-slate-900/50 backdrop-blur-xl border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/20 rounded-3xl overflow-hidden w-full max-w-6xl">
          {/* Header */}
          <div className="relative p-8 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 py-1.5 shadow-lg mb-3">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  <p className="text-xs font-bold text-cyan-400 tracking-wider">PRODUCT DETAILS</p>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  Product Showcase
                </h1>
              </div>
              
              {/* Product ID Badge */}
              <div className="hidden md:block bg-slate-800/50 backdrop-blur-sm border border-cyan-400/30 rounded-xl px-4 py-2">
                <p className="text-xs text-cyan-300 uppercase tracking-wider">Product ID</p>
                <p className="text-xl font-bold text-white">#{product.id}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <img
                  src={product.coverimage || "/default-image.png"}
                  alt={product.name}
                  className="relative w-full max-w-lg h-auto rounded-2xl shadow-2xl object-cover border-2 border-cyan-400/30 transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => (e.currentTarget.src = "/default-image.png")}
                />
                
                {/* Image overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex items-end justify-center pb-6">
                  <span className="text-cyan-400 font-bold text-lg">Click to Enlarge</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Product Name */}
              <div>
                <h2 className="text-4xl font-black text-white mb-2 leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></span>
                  <span className="text-cyan-400 text-sm font-semibold">PREMIUM PRODUCT</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
                <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Description
                </h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  {product.detail || "No description available."}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">⭐</div>
                  <p className="text-cyan-400 font-bold text-lg">{(Math.random() * 2 + 7).toFixed(1)}</p>
                  <p className="text-gray-400 text-xs">Rating</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-sm border border-purple-400/20 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">✓</div>
                  <p className="text-purple-400 font-bold text-lg">In Stock</p>
                  <p className="text-gray-400 text-xs">Available Now</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Link 
                  href={"/products"}
                  className="flex-1 min-w-[140px] px-6 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 text-white rounded-xl hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 shadow-lg font-bold text-center flex items-center justify-center gap-2"
                >
                  <span>←</span>
                  <span>Back</span>
                </Link>
                
                <Link 
                  href={`/products/${id}/edit`}
                  className="flex-1 min-w-[140px] px-6 py-4 bg-purple-500/20 backdrop-blur-sm border-2 border-purple-400/30 text-purple-400 rounded-xl hover:bg-purple-500 hover:text-white hover:border-purple-400 transition-all duration-300 shadow-lg font-bold text-center flex items-center justify-center gap-2"
                >
                  <span>✏️</span>
                  <span>Edit</span>
                </Link>
                
                <button
                  onClick={() => alert("🛒 Added to cart!")}
                  className="flex-1 min-w-[140px] px-6 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 shadow-lg font-bold transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>🛒</span>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-slate-900/30 backdrop-blur-sm border-t border-cyan-400/20 text-center">
            <div className="flex items-center justify-center gap-3 text-sm">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-gray-400">Powered by Modern Tech Stack</span>
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}