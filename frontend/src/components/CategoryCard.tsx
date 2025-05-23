import { Link } from "react-router-dom"

interface CategoryCardProps {
  title: string
  image: string
  count: number
}

export default function CategoryCard({
  title = "Category",
  image = "/placeholder.svg?height=200&width=200",
  count = 0,
}: CategoryCardProps) {

  const slug = title.toLowerCase().replace(/\s+/g, "-")

  return (
    <Link
      to={`/categories/${slug}`}
      className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
    >
      <div className="overflow-hidden transition-all bg-white border rounded-lg hover:shadow-lg border-amber-200">
        <div className="w-full overflow-hidden aspect-square">
          <img
            src={image || "/placeholder.svg"}
            alt={`${title} category`}
            className="object-cover w-full h-full transition-all hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="text-center">
            <h3 className="font-bold text-[#2b2b2b]">{title}</h3>
            <p className="text-sm text-[#6b6b6b]">{count} recipes</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

