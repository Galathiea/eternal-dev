import { Link } from "react-router-dom"

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-xl font-bold">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-white"
          >
            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
            <line x1="6" y1="17" x2="18" y2="17" />
          </svg>
        </div>
      </div>
      <div>
        <span className="font-serif text-amber-600">Eternal</span>
        <span className="text-[#6b4226] font-sans">Haven</span>
        <span className="font-serif text-amber-800">Kitchen</span>
      </div>
    </Link>
  )
}

