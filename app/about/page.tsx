import { 
  Users, 
  Target, 
  Heart, 
  Truck, 
  Shield, 
  Award,
  MapPin,
  Package,
  Star
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About PujaSamagri
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your trusted destination for authentic puja materials. We bring the sacred items
            for all Hindu rituals right to your doorstep, making worship convenient and accessible.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-4">
                PujaSamagri was founded in 2024 with a simple mission: to make authentic puja
                materials accessible to every Hindu household across India. We understand that
                gathering all the items for a traditional puja can be time-consuming and often
                overwhelming.
              </p>
              <p className="mb-4">
                Our founders, coming from traditional Brahmin families in Varanasi, noticed that
                many families struggled to perform pujas correctly because they could not find
                authentic materials or did not know exactly what items were needed for specific rituals.
              </p>
              <p>
                That is when the idea of complete puja kits was born. Each kit is carefully curated
                by our team of pandits and contains every single item needed for a specific puja,
                from the main samagri to the smallest detail like cotton wicks and sacred threads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground">
                  To preserve and promote Hindu rituals by making authentic puja materials
                  easily accessible to every household. We strive to bridge the gap between
                  tradition and convenience, ensuring that no one misses their puja due to
                  lack of proper materials.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    <Heart className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground">
                  To become India&apos;s most trusted platform for religious supplies,
                  where every family can easily perform their cherished rituals with
                  complete, authentic, and blessed puja materials delivered to their doorstep.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Why Choose PujaSamagri?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: "100% Authentic",
                description: "All materials sourced from trusted suppliers in Varanasi, Haridwar, and other holy places.",
              },
              {
                icon: Package,
                title: "Complete Kits",
                description: "Every kit contains all items needed - no running around to gather individual materials.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Same-day delivery in select cities. Pan-India delivery within 2-4 business days.",
              },
              {
                icon: Star,
                title: "Expert Curated",
                description: "Kits designed by experienced pandits ensuring nothing important is missed.",
              },
              {
                icon: Award,
                title: "Quality Assured",
                description: "Strict quality checks to ensure fresh and pure materials in every package.",
              },
              {
                icon: Users,
                title: "Customer Support",
                description: "Dedicated support team to help with any queries about rituals or orders.",
              },
            ].map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            A passionate team dedicated to preserving Hindu traditions while embracing modern convenience.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Pandit Ramesh Sharma", role: "Chief Puja Consultant", initials: "RS" },
              { name: "Amit Verma", role: "Founder & CEO", initials: "AV" },
              { name: "Priya Gupta", role: "Operations Head", initials: "PG" },
              { name: "Suresh Pandey", role: "Quality Assurance", initials: "SP" },
            ].map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                    {member.initials}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Our Office</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-2">
              PujaSamagri Pvt. Ltd.
            </p>
            <p className="text-muted-foreground">
              123 Temple Street, Dashashwamedh Ghat
            </p>
            <p className="text-muted-foreground">
              Varanasi, Uttar Pradesh 221001, India
            </p>
            <p className="text-muted-foreground mt-4">
              Phone: +91 98765 43210 | Email: info@pujasamagri.com
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
