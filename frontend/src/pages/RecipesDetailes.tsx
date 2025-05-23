"use client"

import type React from "react"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Clock, ChevronLeft, Printer, Share2, Bookmark, Plus, Minus } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function RecipeDetail() {
  useParams<{ slug: string} >()
  const [quantity, setQuantity] = useState<number>(1)
  const { addItem } = useCart()

  // This would normally come from an API based on the slug
  const recipe = {
    id: "1",
    title: "Creamy Garlic Pasta",
    description: "A rich and creamy pasta dish with roasted garlic, parmesan cheese, and fresh herbs.",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=880&auto=format&fit=crop",
    rating: 4.8,
    prepTime: "10 min",
    cookTime: "20 min",
    totalTime: "30 min",
    servings: 4,
    calories: 450,
    category: "Pasta",
    difficulty: "Easy",
    price: 14.99,
    ingredients: [
      "8 oz fettuccine pasta",
      "3 tbsp butter",
      "4 cloves garlic, minced",
      "1 cup heavy cream",
      "1 cup grated parmesan cheese",
      "Salt and pepper to taste",
      "Fresh parsley, chopped",
      "Red pepper flakes (optional)",
    ],
    instructions: [
      "Bring a large pot of salted water to a boil. Add pasta and cook according to package directions until al dente. Reserve 1/2 cup of pasta water before draining.",
      "While pasta is cooking, melt butter in a large skillet over medium heat. Add minced garlic and sauté for 1-2 minutes until fragrant but not browned.",
      "Reduce heat to medium-low and add heavy cream. Simmer for 3-4 minutes until it starts to thicken slightly.",
      "Add the drained pasta to the skillet and toss to coat with the sauce.",
      "Gradually add the parmesan cheese while stirring continuously until melted and smooth. If the sauce is too thick, add some of the reserved pasta water.",
      "Season with salt and pepper to taste.",
      "Garnish with chopped parsley and red pepper flakes if desired. Serve immediately.",
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah Johnson",
        rating: 5,
        comment: "This pasta dish is absolutely delicious! The garlic flavor is perfect and the sauce is so creamy.",
        date: "2024-03-15"
      },
      {
        id: 2,
        user: "Mike Thompson",
        rating: 4,
        comment: "Great recipe! I added some grilled chicken and it was even better.",
        date: "2024-03-14"
      },
      {
        id: 3,
        user: "Emily Davis",
        rating: 5,
        comment: "Made this for my family and they loved it. Will definitely make it again!",
        date: "2024-03-13"
      }
    ],
    tips: [
      "For best results, use freshly grated parmesan cheese instead of pre-grated.",
      "Don't skip reserving the pasta water - it helps create a silky sauce.",
      "You can substitute heavy cream with half-and-half for a lighter version.",
      "Add grilled chicken or shrimp for a protein boost."
    ]
  }

  const handleAddToCart = () => {
    addItem({
      id: recipe.id,
      title: recipe.title,
      price: recipe.price,
      image: recipe.image,
    })
  }

  return (
    <div className="container py-8 px-4 md:px-6 bg-[#fffaf5]">
      <div className="mb-6">
        <Link to="/recipes" className="inline-flex items-center text-sm font-medium text-[#e63946] hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Recipes
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-[#2b2b2b]">{recipe.title}</h1>
              <p className="mt-2 text-[#6b6b6b]">{recipe.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={star <= Math.floor(recipe.rating) ? "currentColor" : "none"}
                      stroke="currentColor"
                      className="w-4 h-4 text-amber-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="font-medium">{recipe.rating}</span>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">{recipe.category}</span>
              <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">{recipe.difficulty}</span>
            </div>

            <div className="overflow-hidden shadow-lg rounded-xl">
              <img
                src={recipe.image || "/placeholder.svg"}
                alt={`${recipe.title} dish`}
                className="object-cover w-full"
              />
            </div>

            <div className="flex flex-wrap justify-between gap-4 rounded-lg bg-[#f8edeb] p-4">
              <div className="text-center">
                <p className="text-sm text-[#6b6b6b]">Prep Time</p>
                <p className="font-medium text-[#2b2b2b]">{recipe.prepTime}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6b6b6b]">Cook Time</p>
                <p className="font-medium text-[#2b2b2b]">{recipe.cookTime}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6b6b6b]">Total Time</p>
                <p className="font-medium text-[#2b2b2b]">{recipe.totalTime}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6b6b6b]">Servings</p>
                <p className="font-medium text-[#2b2b2b]">{recipe.servings}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#6b6b6b]">Calories</p>
                <p className="font-medium text-[#2b2b2b]">{recipe.calories} kcal</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1 border border-[#e6d7c8] rounded-md hover:bg-[#f8edeb] flex items-center gap-1">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button className="px-3 py-1 border border-[#e6d7c8] rounded-md hover:bg-[#f8edeb] flex items-center gap-1">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="px-3 py-1 border border-[#e6d7c8] rounded-md hover:bg-[#f8edeb] flex items-center gap-1">
                <Bookmark className="w-4 h-4" />
                Save
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#2b2b2b] mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2 text-[#2b2b2b]">
                      <div className="h-2 w-2 rounded-full bg-[#e63946]"></div>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#2b2b2b] mb-4">Instructions</h2>
                <ol className="pl-5 space-y-4 list-decimal">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="pl-2 text-[#2b2b2b]">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#2b2b2b] mb-4">Chef's Tips</h2>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-[#2b2b2b]">
                      <span className="text-[#e63946]">💡</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#2b2b2b] mb-4">Reviews</h2>
                <div className="space-y-4">
                  {recipe.reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#2b2b2b]">{review.user}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={star <= review.rating ? "currentColor" : "none"}
                                stroke="currentColor"
                                className="w-4 h-4 text-amber-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-[#6b6b6b]">{review.date}</span>
                      </div>
                      <p className="text-[#6b6b6b]">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-[#e6d7c8] p-6 bg-white">
            <h3 className="text-xl font-bold text-[#2b2b2b] mb-4">Get This Recipe</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#6b6b6b]">Meal Kit Price:</span>
                <span className="text-2xl font-bold text-[#e63946]">${recipe.price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-[#6b6b6b]">
                This meal kit includes all the pre-measured ingredients you need to make this delicious recipe at home.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#6b6b6b]">
                <Clock className="w-4 h-4" />
                <span>Delivery in 1-3 business days</span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <label htmlFor="quantity" className="text-sm font-medium text-[#2b2b2b]">
                  Quantity:
                </label>
                <div className="flex items-center border border-[#e6d7c8] rounded-md">
                  <button
                    type="button"
                    className="h-8 w-8 flex items-center justify-center hover:bg-[#f8edeb]"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center" aria-label={`Quantity: ${quantity}`}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="h-8 w-8 flex items-center justify-center hover:bg-[#f8edeb]"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full px-4 py-2 bg-[#e63946] hover:bg-[#d62b39] text-white rounded-md flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart {quantity > 1 ? `(${quantity})` : ""}
              </button>
              <p className="text-xs text-center text-[#6b6b6b] mt-2">Free shipping on orders over $50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ShoppingCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}

