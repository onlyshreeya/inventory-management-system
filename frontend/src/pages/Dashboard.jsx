import { useEffect, useState, useMemo } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import ProductFormModal from "../components/ProductFormModal";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting product (Admins only!)");
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  // Derived State (Filtering & Stats)
  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const stats = useMemo(() => {
    return {
      total: products.length,
      value: products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0),
      lowStock: products.filter(p => p.stock < 5 && p.stock > 0).length,
      outOfStock: products.filter(p => p.stock === 0).length,
    };
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">StockFlow</h1>
            <div className="flex gap-4 items-center">
              <span className="text-sm font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full capitalize">
                {role}
              </span>
              <button 
                onClick={handleLogout} 
                className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header & Stats */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Overview</h2>
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-40">
                <p className="text-sm text-gray-500 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-40">
                <p className="text-sm text-gray-500 mb-1">Inventory Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.value.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-40">
                <p className="text-sm text-gray-500 mb-1">Low/Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{stats.lowStock + stats.outOfStock}</p>
              </div>
            </div>
          </div>
          
          {role === "admin" && (
            <button 
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              + Add Product
            </button>
          )}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex gap-4">
          <input 
            type="text" 
            placeholder="Search products by name..." 
            className="flex-grow border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="w-48 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                role={role} 
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <ProductFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchProducts} 
        initialData={productToEdit}
      />
    </div>
  );
}
