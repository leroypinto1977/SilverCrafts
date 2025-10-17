"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShoppingBag,
  Plus,
  RotateCcw,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Package,
  Settings,
  FileText,
  ClipboardList,
} from "lucide-react";
import { toast } from "sonner";
import AdminHeader from "@/components/admin/AdminHeader";
import CreateUserDialog from "@/components/admin/CreateUserDialog";
import AddProductDialog from "@/components/admin/AddProductDialog";
import CategoryManagementDialog from "@/components/admin/CategoryManagementDialog";
import QuoteDetailsDialog from "@/components/admin/QuoteDetailsDialog";
import OrderDetailsDialog from "@/components/admin/OrderDetailsDialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isTemporary: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface ProductVariant {
  id: string;
  width?: string;
  height?: string;
  diameter?: string;
  weight: string;
  purities: string[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  images?: string[];
  variants?: ProductVariant[];
}

interface QuoteRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  products: {
    productName: string;
    quantity: number;
    specifications?: string;
  }[];
  message?: string;
  status: "pending" | "sent" | "rejected";
  createdAt: string;
}

interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  products: {
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
  shippingAddress: string;
}

type TabType = "users" | "products" | "quotes" | "orders";

const defaultCategories = [
  "All Categories",
  "Cutlery Sets",
  "Dinner Forks",
  "Dinner Knives",
  "Dinner Spoons",
  "Soup Spoons",
  "Tea Spoons",
  "Serving Spoons",
  "Cake Servers",
  "Serving Trays",
  "Serving Bowls",
  "Tea Sets",
  "Coffee Sets",
  "Specialty Items",
  "Gift Sets",
  "Custom Orders",
  "Antique Collection",
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [productCategories, setProductCategories] =
    useState<string[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);
  const [showQuoteDetails, setShowQuoteDetails] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");

  // Redirect non-admin users
  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session?.user) {
      window.location.href = "/auth";
      return;
    }

    if (session.user.role !== "ADMIN") {
      window.location.href = "/";
      return;
    }
  }, [session, status]);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetchUsers();
      fetchProducts();
      fetchQuotes();
      fetchOrders();
    }
  }, [session]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    // Mock data - replace with actual API call (prices in INR)
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Sterling Silver Fork Set",
        description: "Elegant 12-piece sterling silver fork set",
        price: 24899.0,
        image: "/assets/fork-elegance.jpg",
        category: "Dinner Forks",
        variants: [
          {
            id: "1-1",
            weight: "50g",
            purities: ["80", "92.5"],
          },
        ],
      },
      {
        id: "2",
        name: "Ornate Serving Tray",
        description: "Handcrafted serving tray with detailed engravings",
        price: 15749.0,
        image: "/assets/tray-ornate.jpg",
        category: "Serving Trays",
        variants: [
          {
            id: "2-1",
            width: "30cm",
            height: "40cm",
            weight: "500g",
            purities: ["92.5"],
          },
        ],
      },
      {
        id: "3",
        name: "Premium Dinner Knife Set",
        description: "Professional-grade dinner knives",
        price: 33199.0,
        image: "/assets/knife-carved.jpg",
        category: "Dinner Knives",
        variants: [
          {
            id: "3-1",
            weight: "75g",
            purities: ["80"],
          },
        ],
      },
      {
        id: "4",
        name: "Classic Spoon Collection",
        description: "Traditional sterling silver spoons",
        price: 20749.0,
        image: "/assets/spoon-sterling.jpg",
        category: "Dinner Spoons",
        variants: [
          {
            id: "4-1",
            weight: "40g",
            purities: ["80"],
          },
        ],
      },
      {
        id: "5",
        name: "Elegant Tea Set",
        description: "Complete tea set with intricate designs",
        price: 49799.0,
        image: "/assets/tea-set-elegant.jpg",
        category: "Tea Sets",
        variants: [
          {
            id: "5-1",
            weight: "800g",
            purities: ["92.5"],
          },
        ],
      },
      {
        id: "6",
        name: "Soup Spoon Collection",
        description: "Set of 6 soup spoons",
        price: 15749.0,
        image: "/assets/soup-spoons-collection.jpg",
        category: "Soup Spoons",
        variants: [
          {
            id: "6-1",
            weight: "45g",
            purities: ["80", "92.5"],
          },
        ],
      },
    ];
    setAllProducts(mockProducts);
    setProducts(mockProducts);
  };

  const fetchQuotes = async () => {
    // Mock quote data - from anyone (no authentication required)
    const mockQuotes: QuoteRequest[] = [
      {
        id: "Q001",
        customerName: "Sarah Johnson",
        customerEmail: "sarah.j@email.com",
        customerPhone: "+1 (555) 123-4567",
        products: [
          {
            productName: "Sterling Silver Fork Set",
            quantity: 2,
            specifications: "Engraving: 'SJ' initials",
          },
          {
            productName: "Ornate Serving Tray",
            quantity: 1,
          },
        ],
        message: "Looking for wedding gift set. Need by next month.",
        status: "pending",
        createdAt: "2024-10-14T10:30:00Z",
      },
      {
        id: "Q002",
        customerName: "Michael Chen",
        customerEmail: "m.chen@company.com",
        customerPhone: "+1 (555) 234-5678",
        products: [
          {
            productName: "Premium Dinner Knife Set",
            quantity: 10,
            specifications: "Bulk order for restaurant",
          },
          {
            productName: "Classic Spoon Collection",
            quantity: 10,
          },
        ],
        message: "Corporate order. Need pricing for bulk purchase.",
        status: "sent",
        createdAt: "2024-10-12T14:20:00Z",
      },
      {
        id: "Q003",
        customerName: "Emily Rodriguez",
        customerEmail: "emily.rod@gmail.com",
        customerPhone: "+1 (555) 345-6789",
        products: [
          {
            productName: "Elegant Tea Set",
            quantity: 1,
            specifications: "92.5% purity only",
          },
        ],
        message: "Gift for mother's birthday",
        status: "pending",
        createdAt: "2024-10-15T09:15:00Z",
      },
      {
        id: "Q004",
        customerName: "David Thompson",
        customerEmail: "d.thompson@email.com",
        customerPhone: "+1 (555) 456-7890",
        products: [
          {
            productName: "Soup Spoon Collection",
            quantity: 3,
          },
        ],
        status: "rejected",
        createdAt: "2024-10-10T16:45:00Z",
      },
    ];
    setQuotes(mockQuotes);
  };

  const fetchOrders = async () => {
    // Mock order data - from verified accounts only (prices in INR)
    const mockOrders: Order[] = [
      {
        id: "ORD-2024-001",
        userId: "user_123",
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        products: [
          {
            productName: "Sterling Silver Fork Set",
            quantity: 1,
            price: 24899.0,
          },
          {
            productName: "Ornate Serving Tray",
            quantity: 1,
            price: 15749.0,
          },
        ],
        totalAmount: 40648.0,
        status: "delivered",
        paymentStatus: "paid",
        createdAt: "2024-10-01T10:00:00Z",
        shippingAddress: "123 MG Road, Bangalore, Karnataka 560001, India",
      },
      {
        id: "ORD-2024-002",
        userId: "user_456",
        customerName: "Jane Smith",
        customerEmail: "jane.smith@example.com",
        products: [
          {
            productName: "Premium Dinner Knife Set",
            quantity: 2,
            price: 33199.0,
          },
        ],
        totalAmount: 66398.0,
        status: "processing",
        paymentStatus: "paid",
        createdAt: "2024-10-13T14:30:00Z",
        shippingAddress: "456 Park Street, Kolkata, West Bengal 700016, India",
      },
      {
        id: "ORD-2024-003",
        userId: "user_789",
        customerName: "Robert Wilson",
        customerEmail: "robert.w@example.com",
        products: [
          {
            productName: "Elegant Tea Set",
            quantity: 1,
            price: 49799.0,
          },
          {
            productName: "Classic Spoon Collection",
            quantity: 2,
            price: 20749.0,
          },
        ],
        totalAmount: 91297.0,
        status: "shipped",
        paymentStatus: "paid",
        createdAt: "2024-10-08T11:20:00Z",
        shippingAddress: "789 Marine Drive, Mumbai, Maharashtra 400020, India",
      },
      {
        id: "ORD-2024-004",
        userId: "user_321",
        customerName: "Lisa Anderson",
        customerEmail: "lisa.a@example.com",
        products: [
          {
            productName: "Soup Spoon Collection",
            quantity: 3,
            price: 15749.0,
          },
        ],
        totalAmount: 47247.0,
        status: "pending",
        paymentStatus: "pending",
        createdAt: "2024-10-15T09:45:00Z",
        shippingAddress: "321 Connaught Place, New Delhi, Delhi 110001, India",
      },
      {
        id: "ORD-2024-005",
        userId: "user_654",
        customerName: "Mark Davis",
        customerEmail: "mark.davis@example.com",
        products: [
          {
            productName: "Sterling Silver Fork Set",
            quantity: 1,
            price: 24899.0,
          },
        ],
        totalAmount: 24899.0,
        status: "cancelled",
        paymentStatus: "refunded",
        createdAt: "2024-10-05T15:10:00Z",
        shippingAddress: "654 Brigade Road, Bangalore, Karnataka 560025, India",
      },
    ];
    setOrders(mockOrders);
  };

  const handleToggleUserStatus = async (
    userId: string,
    currentStatus: boolean
  ) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      if (response.ok) {
        toast.success(
          `User ${!currentStatus ? "activated" : "deactivated"} successfully`
        );
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update user");
      }
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  const handleResetPassword = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "reset-password",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(
          `Password reset! Temporary password: ${data.temporaryPassword}`,
          {
            duration: 10000,
          }
        );
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete user");
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const handleUserCreated = () => {
    setShowCreateUser(false);
    fetchUsers();
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      // Mock delete - replace with actual API call
      const updatedAllProducts = allProducts.filter((p) => p.id !== productId);
      setAllProducts(updatedAllProducts);
      setProducts(products.filter((p) => p.id !== productId));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  const handleEditProduct = (productId: string) => {
    const productToEdit = allProducts.find((p) => p.id === productId);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setShowAddProduct(true);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (category === "All Categories") {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) => product.category === category
      );
      setProducts(filtered);
    }
  };

  const handleProductAdded = (newProduct: Product) => {
    setAllProducts([...allProducts, newProduct]);

    // Update displayed products based on current filter
    if (
      selectedCategory === "All Categories" ||
      selectedCategory === newProduct.category
    ) {
      setProducts([...products, newProduct]);
    }
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    // Update in all products
    const updatedAllProducts = allProducts.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setAllProducts(updatedAllProducts);

    // Update in displayed products
    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);

    // Reset editing state
    setEditingProduct(null);
  };

  const handleProductDialogClose = (open: boolean) => {
    setShowAddProduct(open);
    if (!open) {
      setEditingProduct(null);
    }
  };

  const handleCategoriesUpdate = (updatedCategories: string[]) => {
    setProductCategories(updatedCategories);
    // If the currently selected category was deleted, reset to "All Categories"
    if (!updatedCategories.includes(selectedCategory)) {
      setSelectedCategory("All Categories");
      setProducts(allProducts);
    }
  };

  const handleQuoteClick = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setShowQuoteDetails(true);
  };

  const handleQuoteSent = (quoteId: string) => {
    // Update quote status to "sent"
    setQuotes(
      quotes.map((q) =>
        q.id === quoteId ? { ...q, status: "sent" as const } : q
      )
    );
    toast.success("Quote sent successfully!");
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleOrderStatusUpdate = (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order status updated to ${newStatus}!`);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not admin (will be redirected)
  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {session?.user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="py-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                {users.filter((u) => u.isActive).length} active users
              </p>
            </CardContent>
          </Card>

          <Card className="py-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                Total products in catalog
              </p>
            </CardContent>
          </Card>

          <Card className="py-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Temporary Passwords
              </CardTitle>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.isTemporary).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Users need to change passwords
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("users")}
                className={`${
                  activeTab === "users"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                <Users className="h-5 w-5" />
                User Management
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`${
                  activeTab === "products"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                <Package className="h-5 w-5" />
                Products
              </button>
              <button
                onClick={() => setActiveTab("quotes")}
                className={`${
                  activeTab === "quotes"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                <FileText className="h-5 w-5" />
                Quotes
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`${
                  activeTab === "orders"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                <ClipboardList className="h-5 w-5" />
                Orders
              </button>
            </nav>
          </div>
        </div>

        {/* User Management Tab */}
        {activeTab === "users" && (
          <Card className="py-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage user accounts and permissions
                  </CardDescription>
                </div>
                <Button onClick={() => setShowCreateUser(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge
                            variant={
                              user.role === "ADMIN" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                          {user.isTemporary && (
                            <Badge variant="destructive">Temp Password</Badge>
                          )}
                          <Badge
                            variant={user.isActive ? "default" : "secondary"}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleToggleUserStatus(user.id, user.isActive)
                        }
                        disabled={user.role === "ADMIN"}
                      >
                        {user.isActive ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResetPassword(user.id)}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset Password
                      </Button>

                      {user.role !== "ADMIN" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <label
                  htmlFor="category-filter"
                  className="text-sm font-medium text-gray-700"
                >
                  Filter by Category:
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-sm"
                >
                  {productCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500">
                  ({products.length}{" "}
                  {products.length === 1 ? "product" : "products"})
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCategoryManagement(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Categories
                </Button>
                <Button onClick={() => setShowAddProduct(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </div>

            <Card className="py-6">
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">
                      No products found in this category
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {/* Product Image */}
                          <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {product.description}
                            </p>
                            <div className="mt-1">
                              <Badge variant="secondary">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === "quotes" && (
          <div>
            <Card className="py-6">
              <CardHeader>
                <CardTitle>Quote Requests ({quotes.length})</CardTitle>
                <CardDescription>
                  Click on a quote to view details and send response
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quotes.map((quote) => (
                    <div
                      key={quote.id}
                      onClick={() => handleQuoteClick(quote)}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                          {quote.customerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {quote.customerName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {quote.products.length} product
                            {quote.products.length !== 1 ? "s" : ""} requested •{" "}
                            {new Date(quote.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          quote.status === "pending"
                            ? "default"
                            : quote.status === "sent"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {quote.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <Card className="py-6">
              <CardHeader>
                <CardTitle>Orders ({orders.length})</CardTitle>
                <CardDescription>
                  Click on an order to view details and manage status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => handleOrderClick(order)}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                          {order.customerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {order.customerName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {order.id} • ₹
                            {order.totalAmount.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            • {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "secondary"
                              : order.status === "shipped"
                                ? "default"
                                : order.status === "cancelled"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                        <Badge
                          variant={
                            order.paymentStatus === "paid"
                              ? "default"
                              : order.paymentStatus === "refunded"
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <CreateUserDialog
        open={showCreateUser}
        onOpenChange={setShowCreateUser}
        onUserCreated={handleUserCreated}
      />

      <AddProductDialog
        open={showAddProduct}
        onOpenChange={handleProductDialogClose}
        onProductAdded={handleProductAdded}
        onProductUpdated={handleProductUpdated}
        categories={productCategories}
        editProduct={editingProduct}
      />

      <CategoryManagementDialog
        open={showCategoryManagement}
        onOpenChange={setShowCategoryManagement}
        categories={productCategories}
        onCategoriesUpdate={handleCategoriesUpdate}
      />

      <QuoteDetailsDialog
        open={showQuoteDetails}
        onOpenChange={setShowQuoteDetails}
        quote={selectedQuote}
        onQuoteSent={handleQuoteSent}
      />

      <OrderDetailsDialog
        open={showOrderDetails}
        onOpenChange={setShowOrderDetails}
        order={selectedOrder}
        onStatusUpdate={handleOrderStatusUpdate}
      />
    </div>
  );
}
