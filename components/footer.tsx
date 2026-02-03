import Link from "next/link"
import { Flame, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Flame className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold">PujaSamagri</span>
                <span className="block text-xs opacity-70">पूजा सामग्री</span>
              </div>
            </Link>
            <p className="text-sm opacity-80">
              Your trusted destination for authentic puja materials. Complete kits for all Hindu rituals delivered to your doorstep.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/packages" className="hover:opacity-100 transition-opacity">All Packages</Link></li>
              <li><Link href="/packages?category=havan" className="hover:opacity-100 transition-opacity">Havan Samagri</Link></li>
              <li><Link href="/packages?category=katha" className="hover:opacity-100 transition-opacity">Katha & Paath</Link></li>
              <li><Link href="/packages?category=shanti" className="hover:opacity-100 transition-opacity">Shanti Puja</Link></li>
              <li><Link href="/packages?category=festival" className="hover:opacity-100 transition-opacity">Festival Special</Link></li>
              <li><Link href="/packages?featured=true" className="hover:opacity-100 transition-opacity">Bestsellers</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/account" className="hover:opacity-100 transition-opacity">My Account</Link></li>
              <li><Link href="/account" className="hover:opacity-100 transition-opacity">Track Order</Link></li>
              <li><Link href="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link href="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Return Policy</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>support@pujasamagri.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Temple Street, Varanasi, UP 221001</span>
              </li>
            </ul>
            
            {/* App Download (placeholder) */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Coming Soon on</p>
              <div className="flex gap-2">
                <div className="h-10 px-3 rounded-lg bg-background/10 flex items-center justify-center text-xs">
                  App Store
                </div>
                <div className="h-10 px-3 rounded-lg bg-background/10 flex items-center justify-center text-xs">
                  Play Store
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm opacity-70">
              <span>Payment Methods:</span>
              <div className="flex gap-2">
                {["UPI", "Visa", "Mastercard", "RuPay", "COD"].map((method) => (
                  <span key={method} className="px-2 py-1 bg-background/10 rounded text-xs">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
            <p>&copy; 2026 PujaSamagri. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
              <Link href="#" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
              <Link href="#" className="hover:opacity-100 transition-opacity">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
