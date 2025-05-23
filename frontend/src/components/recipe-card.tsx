// src/components/RecipeCard.tsx
import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
}

const RecipeCard = ({ id, title, description }: RecipeCardProps) => {
  return (
    <Link
      to={`/product/${id}`}
      style={{
        border: "1px solid #ddd",
        padding: "1.5rem",
        borderRadius: "8px",
        textDecoration: "none",
        color: "#333",
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
};

export default RecipeCard;