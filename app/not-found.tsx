import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          {/* 404 Text */}
          <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
          
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          
          <p className="text-muted-foreground mb-8">
            Sorry, the page you are looking for does not exist or has been moved.
            Let us help you find what you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/packages">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                <Search className="h-4 w-4 mr-2" />
                Browse Packages
              </Button>
            </Link>
          </div>

          <div className="mt-12">
            <p className="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Havan", "Satyanarayan", "Rudra Abhishek", "Griha Shanti"].map((term) => (
                <Link
                  key={term}
                  href={`/packages?search=${encodeURIComponent(term)}`}
                  className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
