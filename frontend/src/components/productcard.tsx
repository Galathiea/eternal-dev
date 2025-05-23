import { Link } from "react-router-dom";
import './ProductCard.css';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    time?: string;
    servings?: string;
    difficulty?: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {product.imageUrl && (
        <img 
          src={product.imageUrl} 
          alt={product.title}
          className="product-image"
        />
      )}
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      {(product.time || product.servings || product.difficulty) && (
        <div className="product-meta">
          {product.time && <span>⏱️ {product.time}</span>}
          {product.servings && <span>🍽️ {product.servings}</span>}
          {product.difficulty && <span>📊 {product.difficulty}</span>}
        </div>
      )}
    </Link>
  );
};

export default ProductCard;