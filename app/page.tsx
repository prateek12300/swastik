import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Users, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroSection } from "@/components/hero-section"
import { CategoryCard } from "@/components/category-card"
import { PujaCard } from "@/components/puja-card"
import { categories, getFeaturedPujas, pujaPackages } from "@/lib/puja-data"

export default function HomePage() {
  const featuredPujas = getFeaturedPujas()

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find the perfect puja kit for your spiritual needs
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Bestselling Puja Kits
              </h2>
              <p className="text-muted-foreground">
                Most popular packages chosen by our customers
              </p>
            </div>
            <Link href="/packages?featured=true" className="hidden md:block">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPujas.map((puja) => (
              <PujaCard key={puja.id} puja={puja} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/packages?featured=true">
              <Button variant="outline">
                View All Bestsellers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Get your complete puja kit in 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Choose Your Ritual",
                description: "Browse our catalog and select the puja or ritual you want to perform",
              },
              {
                step: "2",
                title: "Add to Cart",
                description: "Get a complete kit with all items needed - no need to shop separately",
              },
              {
                step: "3",
                title: "Receive & Worship",
                description: "Get fast delivery and start your sacred ritual with authentic materials",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Packages Preview */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-3">
                All Puja Packages
              </h2>
              <p className="text-muted-foreground">
                Explore our complete collection of ritual kits
              </p>
            </div>
            <Link href="/packages" className="hidden md:block">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pujaPackages.slice(0, 8).map((puja) => (
              <PujaCard key={puja.id} puja={puja} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/packages">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Browse All Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-primary-foreground/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-primary-foreground/80">Puja Packages</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Cities Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground">
              Trusted by thousands of families across India
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Priya Sharma",
                location: "Delhi",
                text: "The Satyanarayan Katha kit was complete and authentic. Every item was carefully packed. Highly recommend!",
                rating: 5,
              },
              {
                name: "Rajesh Patel",
                location: "Mumbai",
                text: "We performed Griha Shanti using their kit. The quality of materials was excellent. Will order again.",
                rating: 5,
              },
              {
                name: "Sunita Devi",
                location: "Varanasi",
                text: "Fast delivery and premium quality havan samagri. The fragrance during havan was divine.",
                rating: 5,
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{`"${testimonial.text}"`}</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Ready to Start Your Sacred Journey?
          </h2>
          <p className="text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            Browse our collection of authentic puja materials and get everything delivered to your doorstep.
          </p>
          <Link href="/packages">
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
              Explore All Packages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
