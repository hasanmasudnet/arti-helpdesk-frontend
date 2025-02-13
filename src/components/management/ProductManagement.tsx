import { useState, useCallback, useEffect } from "react";
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
import urls from "@/lib/urls";
import { apiInstance } from "@/lib/apiInstance";
import { ToastContainer, toast } from "react-toastify";
import Alert from "../Alert";
import { set } from "date-fns";
import { on } from "events";

const ProductCard = ({ product, category, onEdit, onDelete }) => (
  <div className="group bg-card hover:bg-accent/5 p-6 rounded-xl space-y-4 transition-all border border-border hover:shadow-lg">
    <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-muted">
      <img
        src={`${urls.baseUrl}/${product.image}`}
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
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      // Call the delete API
      onDelete(id);
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="space-y-2 p-2">
        {filteredCategories.map((category) => (
          <>
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
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
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
    { id: "1", name: "Category 1", description: "Description for Category 1" },
    { id: "2", name: "Category 2", description: "Description for Category 2" },
    { id: "3", name: "Category 3", description: "Description for Category 3" },
  ]);
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // console.log(products, "products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [categorySearchTerm, setCategorySearchTerm] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await apiInstance.get("/categories");
      console.log(response, "response");
      setCategories(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await apiInstance.get("/products");
      console.log(response, "response");
      setProducts(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategory = useCallback(
    async (data) => {
      const postData = { name: data?.name, description: data?.description };
      try {
        const response = await apiInstance.post("/categories", postData);
        console.log(response, "response");
        toast.success("Category added successfully");
        fetchCategories();
      } catch (error) {
        console.log(error);
      }
    },
    [categories]
  );

  const handleEditCategory = useCallback(async (data) => {
    const postData = { name: data?.name, description: data?.description };
    try {
      const response = await apiInstance.put(
        `/categories/${data?.id}`,
        postData
      );
      fetchCategories();
      toast.success("Category updated successfully");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteCategory = useCallback(async (categoryId) => {
    try {
      const response = await apiInstance.delete(`/categories/${categoryId}`);
      fetchCategories();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleAddProduct = useCallback(
    async (data) => {
      console.log(data, "add product data");
      try {
        const {
          name,
          price,
          status,
          url,
          ai_instructions,
          category_id,
          description,
        } = data?.data;
        const photo = data?.photo;
        const formData: any = new FormData();

        formData.append("name", name);
        formData.append("price", price);
        formData.append("status", status);
        formData.append("url", url);
        formData.append("price", price);
        formData.append("ai_instructions", ai_instructions);
        formData.append("category_id", category_id);
        formData.append("description", description);
        if (photo) {
          formData.append("image", photo);
        }

        const response = await apiInstance.post("/products", formData);
        toast.success("product added successfully");
        fetchProducts();
      } catch (error) {
        console.log(error, "error");
      }
    },
    [products]
  );

  const handleEditProduct = useCallback(async (data) => {
    console.log(data, "Update product data");
    try {
      const {
        name,
        price,
        status,
        url,
        ai_instructions,
        category_id,
        description,
      } = data?.data;
      const photo = data?.photo;
      const formData: any = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("status", status);
      formData.append("url", url);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("ai_instructions", ai_instructions);
      formData.append("category_id", category_id);
      if (photo) {
        formData.append("image", photo);
      }

      const response = await apiInstance.patch(
        `/products/${data?.id}`,
        formData
      );
      toast.success("product updated successfully");
      fetchProducts();
    } catch (error) {
      console.log(error, "error");
    }
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

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products, "products");

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <ToastContainer autoClose={1450} />
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
                  {categories.length > 0 &&
                    categories.map((category) => (
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
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    category={product?.category}
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
