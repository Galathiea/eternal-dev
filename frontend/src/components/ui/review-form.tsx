import { Button } from "@/components/ui/button";

export const ReviewForm = () => {
  return (
    <form className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="review" className="block mb-2 text-gray-700">
          Review
        </label>
        <textarea
          id="review"
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
          placeholder="Share your experience with this recipe..."
        />
      </div>
      <Button variant="default" className="w-full">
        Submit Review
      </Button>
    </form>
  );
};