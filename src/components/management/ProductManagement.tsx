import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  MoreHorizontal,
  Package,
  FolderPlus,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductDialog } from "./ProductDialog";
import { CategoryDialog } from "./CategoryDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const generateMockProducts = (count: number, categories: any[]) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: `Product ${i + 1}`,
    categoryId: categories[Math.floor(Math.random() * categories.length)].id,
    description: `Description for Product ${i + 1}`,
    url: `https://example.com/product-${i + 1}`,
    image: `https://images.unsplash.com/photo-${1460925895917 + i}?q=80&w=2426&auto=format&fit=crop`,
    aiInstructions: `AI instructions for handling Product ${i + 1} related queries.`,
    activeTickets: Math.floor(Math.random() * 10),
    price: Math.floor(Math.random() * 1000) + 99,
    status: ["active", "draft", "archived"][Math.floor(Math.random() * 3)],
  }));
};

const ProductCard = ({ product, category, onEdit, onDelete }) => (
  <div className="group bg-card hover:bg-accent/5 p-6 rounded-xl space-y-4 transition-all border border-border hover:shadow-lg">
    <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-muted">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
        <p className="text-sm line-clamp-2">{product.description}</p>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 flex-1">
          <h3 className="font-medium text-lg text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="bg-primary/5">
              {category?.name || "Uncategorized"}
            </Badge>
            {product.url && (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline"
              >
                View Product
              </a>
            )}
            <Badge
              variant="outline"
              className={`${
                product.status === "active"
                  ? "bg-green-500/10 text-green-600"
                  : product.status === "draft"
                    ? "bg-yellow-500/10 text-yellow-600"
                    : "bg-gray-500/10 text-gray-600"
              }`}
            >
              {product.status}
            </Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(product)}>
              Edit Product
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(product.id)}
              className="text-destructive focus:text-destructive"
            >
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          <span>{product.activeTickets} tickets</span>
        </div>
        <span className="font-medium text-foreground">${product.price}</span>
      </div>
    </div>
  </div>
);

const CategoryList = ({ categories, onEdit, onDelete, searchTerm = "" }) => {
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="space-y-2 p-2">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-2 bg-card rounded-lg border border-border hover:shadow-sm transition-all"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {category.description}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(category)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => onDelete(category.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([
    { id: "1", name: "Software", description: "Software products" },
    { id: "2", name: "Hardware", description: "Hardware products" },
    { id: "3", name: "Services", description: "Professional services" },
  ]);
  const [products, setProducts] = useState(() =>
    generateMockProducts(6, categories),
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");

  const handleAddCategory = useCallback(
    (data) => {
      const newCategory = {
        id: `${categories.length + 1}`,
        ...data,
      };
      setCategories((prev) => [...prev, newCategory]);
    },
    [categories],
  );

  const handleEditCategory = useCallback((data) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === data.id ? { ...category, ...data } : category,
      ),
    );
  }, []);

  const handleDeleteCategory = useCallback((categoryId) => {
    setCategories((prev) =>
      prev.filter((category) => category.id !== categoryId),
    );
    setProducts((prev) =>
      prev.map((product) =>
        product.categoryId === categoryId
          ? { ...product, categoryId: "" }
          : product,
      ),
    );
  }, []);

  const handleAddProduct = useCallback(
    (data) => {
      const newProduct = {
        id: `${products.length + 1}`,
        ...data,
        activeTickets: 0,
        price: 99,
        status: "draft",
      };
      setProducts((prev) => [...prev, newProduct]);
    },
    [products],
  );

  const handleEditProduct = useCallback((data) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === data.id ? { ...product, ...data } : product,
      ),
    );
  }, []);

  const handleDeleteProduct = useCallback((productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  }, []);

  const openEditCategoryDialog = useCallback((category) => {
    setSelectedCategory(category);
    setCategoryDialogOpen(true);
  }, []);

  const openEditDialog = useCallback((product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-foreground">
            Product Management
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setSelectedCategory(null);
                setCategoryDialogOpen(true);
              }}
            >
              <FolderPlus className="h-4 w-4" />
              Add Category
            </Button>
            <Button
              className="gap-2"
              onClick={() => {
                setSelectedProduct(null);
                setProductDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 bg-background border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="tickets">Active Tickets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter(
                    (product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) &&
                      (categoryFilter === "all" ||
                        product.categoryId === categoryFilter) &&
                      (statusFilter === "all" ||
                        product.status === statusFilter),
                  )
                  .sort((a, b) => {
                    if (sortBy === "name") return a.name.localeCompare(b.name);
                    if (sortBy === "price") return a.price - b.price;
                    if (sortBy === "tickets")
                      return b.activeTickets - a.activeTickets;
                    return 0;
                  })
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      category={categories.find(
                        (c) => c.id === product.categoryId,
                      )}
                      onEdit={openEditDialog}
                      onDelete={handleDeleteProduct}
                    />
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search categories..."
                className="pl-10 bg-background border-border"
                value={categorySearchTerm}
                onChange={(e) => setCategorySearchTerm(e.target.value)}
              />
            </div>
            <CategoryList
              categories={categories}
              onEdit={openEditCategoryDialog}
              onDelete={handleDeleteCategory}
              searchTerm={categorySearchTerm}
            />
          </TabsContent>
        </Tabs>

        <CategoryDialog
          open={categoryDialogOpen}
          onOpenChange={setCategoryDialogOpen}
          mode={selectedCategory ? "edit" : "add"}
          defaultValues={selectedCategory || undefined}
          onSubmit={selectedCategory ? handleEditCategory : handleAddCategory}
        />

        <ProductDialog
          open={productDialogOpen}
          onOpenChange={setProductDialogOpen}
          mode={selectedProduct ? "edit" : "add"}
          categories={categories}
          defaultValues={selectedProduct || undefined}
          onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
