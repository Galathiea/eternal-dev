import { useParams } from "react-router-dom";
import { products } from "@/Data/Products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p: { id: string | undefined; }) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <p className="description">{product.description}</p>
      
      <div className="rating">{product.rating}</div>
      
      <section className="price-section">
        <h3>Oat This Recipe</h3>
        <p>Meet the Price: {product.price}</p>
        <p>This meal is divided up by an methanol ingredient per rice...</p>
      </section>
      
      <section className="diet-info">
        <h3>Ordering in a Indian diet</h3>
        <p><strong>Quantity:</strong> {product.dietInfo.quantity}</p>
        <h3>Use of the Diet</h3>
        <p>The recipes are delivered {product.dietInfo.deliveryPrice}</p>
      </section>
      
      <section className="ingredients">
        <h3>Ingredients</h3>
        <div className="nutrition">
          <h4>Nutrition Information</h4>
          <ul>
            <li>Calories: {product.nutrition.calories}</li>
            <li>Fat: {product.nutrition.fat}</li>
            <li>Carbs: {product.nutrition.carbs}</li>
            <li>Protein: {product.nutrition.protein}</li>
            <li>Per: {product.nutrition.per}</li>
            <li>Sugar: {product.nutrition.sugar}</li>
          </ul>
        </div>
      </section>
      
      {/* Add all other sections following the same pattern */}
      
      <section className="reviews">
        <h3>Customer Reviews ({product.reviews.length})</h3>
        {product.reviews.map((review, index) => (
          <div key={index} className="review">
            <h4>{review.author}</h4>
            <p>{review.comment}</p>
          </div>
        ))}
      </section>
      
      <div className="comments">Comments ({product.comments})</div>
    </div>
  );
};

export default ProductDetail;