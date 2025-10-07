
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  isPOS?: boolean;
}

export function ProductCard({ product, isPOS = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0
  }).format(product.price);

  return (
    <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {product.stock < 5 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            Low Stock: {product.stock}
          </div>
        )}
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg font-medium line-clamp-2">
          {product.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
        <p className="mt-2 text-xl font-bold text-primary">{formattedPrice}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {isPOS ? (
          <Button 
            className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={() => addToCart(product, 1)}
          >
            Add to Sale
          </Button>
        ) : (
          <Button 
            className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={() => addToCart(product, 1)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
