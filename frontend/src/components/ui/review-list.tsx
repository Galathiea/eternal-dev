import { ReviewCard } from "../review-card";

interface Review {
  id: string;
  author: string;
  date: string;
  content: string;
  rating: number;
}

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
    </div>
  );
};