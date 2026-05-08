import React from "react";

export default function ProductCard({ product, role, onDelete, onEdit }) {
  // A placeholder image in case the URL is broken or missing
  const fallbackImage = "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Product Image */}
      <div className="h-48 w-full bg-gray-50 border-b border-gray-100">
        <img
          src={product.image || fallbackImage}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = fallbackImage }}
        />
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description || "No description available."}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price?.toLocaleString()}
          </span>
          <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        {/* Action Buttons based on Role */}
        <div className="pt-4 border-t border-gray-100 flex gap-2">
          {role === "admin" ? (
            <>
              <button 
                onClick={() => onEdit(product)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(product._id)}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </>
          ) : (
            <button 
              onClick={() => {
                // Add to Cart Logic
                // This would normally hit an API, but we'll show a toast for now
                if(product.stock > 0) {
                  import("react-hot-toast").then((toast) => {
                    toast.default.success(`${product.name} added to cart!`);
                  });
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
