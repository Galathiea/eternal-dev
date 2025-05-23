import * as Slider from "@radix-ui/react-slider";
import { Button } from "./button";

export const Rating = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-xl font-bold">Rate This Recipe</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="rating" className="block mb-2 text-gray-700">
            Rating
          </label>
          <Slider.Root
            defaultValue={[5]}
            max={5}
            step={1}
            className="relative flex items-center w-full h-5 select-none touch-none"
          >
            <Slider.Track className="relative h-1 bg-gray-200 rounded-full grow">
              <Slider.Range className="absolute h-full bg-blue-500 rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full focus:outline-none focus:shadow-lg" />
          </Slider.Root>
        </div>
        <div className="mb-6">
          <label htmlFor="comment" className="block mb-2 text-gray-700">
            Comment
          </label>
          <textarea
            id="comment"
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            placeholder="Share your experience with this recipe..."
          />
        </div>
        <Button variant="default" className="w-full">
          Submit Rating
        </Button>
      </form>
    </div>
  );
};