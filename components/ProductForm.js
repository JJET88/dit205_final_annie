/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Toast placeholder
const showToast = (message, type) => {
  console.log(`[${type}] ${message}`);
};

export default function ProductForm({ productId }) {
  const [form, setForm] = useState({
    name: "",
    detail: "",
    coverimage: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  // If editing, fetch existing product
  useEffect(() => {
    if (!productId) return;

    setFetching(true);
    fetch(`/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setForm({
          name: data.name || "",
          detail: data.detail || "",
          coverimage: data.coverimage || "",
        });
      })
      .catch((err) => {
        console.error(err);
        showToast("❌ Failed to fetch product.", "error");
      })
      .finally(() => setFetching(false));
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        detail: form.detail,
        coverimage: form.coverimage,
      };

      const method = productId ? "PUT" : "POST";
      const url = productId ? `/api/products/${productId}` : "/api/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save product");

      showToast(`✅ Product ${productId ? "updated" : "created"} successfully!`, "success");
      router.push("/products");
    } catch (err) {
      console.error(err);
      showToast("❌ Failed to save product.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <p className="text-xl text-cyan-400 font-bold mt-6 animate-pulse tracking-wider">
              LOADING DATA...
            </p>
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
        <div className="bg-slate-900/50 backdrop-blur-xl border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/20 rounded-3xl p-8 w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-2 shadow-lg mb-4">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <p className="text-sm font-bold text-cyan-400 tracking-wider">PRODUCT MANAGEMENT</p>
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-2">
              {productId ? "Edit Product" : "Create Product"}
            </h1>
            <p className="text-cyan-300/80">
              {productId ? "🛠️ Update product information" : "✨ Add a new product to catalog"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-cyan-400 tracking-wide uppercase">
                Product Name
              </label>
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter product name..."
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 text-white rounded-xl shadow-lg focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400 focus:outline-none placeholder-gray-500 transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-cyan-400 tracking-wide uppercase">
                Product Details
              </label>
              <textarea
                name="detail"
                rows="5"
                placeholder="Describe the product features, benefits, and specifications..."
                value={form.detail}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 text-white rounded-xl shadow-lg focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400 focus:outline-none placeholder-gray-500 resize-none transition-all duration-300"
              />
            </div>

            {/* Image URL & Preview */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-cyan-400 tracking-wide uppercase">
                Cover Image URL
              </label>
              <div className="relative">
                <input
                  name="coverimage"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={form.coverimage}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 text-white rounded-xl shadow-lg focus:ring-4 focus:ring-cyan-400/50 focus:border-cyan-400 focus:outline-none placeholder-gray-500 transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {form.coverimage && (
                <div className="mt-6 flex justify-center">
                  <div className="relative group">
                    <img
                      src={form.coverimage}
                      alt="Preview"
                      className="w-64 h-64 object-cover rounded-2xl border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3 bg-cyan-400/90 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                      Preview
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/products")}
                className="flex-1 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700/50 text-gray-300 rounded-xl font-bold hover:bg-slate-700/50 hover:text-white hover:border-slate-600 transition-all duration-300 shadow-lg"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{productId ? "💾 Update Product" : "✨ Create Product"}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer hint */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <p className="text-center text-gray-500 text-sm flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
              All fields are required
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}