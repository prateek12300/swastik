"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ShoppingCart, Search, Menu, User, Flame, Heart, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { categories } from "@/lib/puja-data"

const navLinks = [
  { href: "/packages", label: "All Packages" },
  { href: "/packages?featured=true", label: "Bestsellers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const { totalItems } = useCart()
  const { items: wishlistItems } = useWishlist()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/packages?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-sm py-1.5">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className="hidden sm:block">Free Delivery on orders above ₹999</p>
          <p className="sm:hidden text-xs">Free Delivery above ₹999</p>
          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-1 hover:underline">
              <Phone className="h-3 w-3" />
              <span className="hidden sm:inline">+91 98765 43210</span>
              <span className="sm:hidden">Call Us</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Flame className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-foreground">PujaSamagri</span>
              <span className="block text-xs text-muted-foreground">पूजा सामग्री</span>
            </div>
          </Link>



          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1">
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/packages?category=${category.id}`} className="cursor-pointer">
                      <span className="flex-1">{category.name}</span>
                      <span className="text-xs text-muted-foreground">{category.nameHindi}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex relative mr-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-48 lg:w-64 pl-9 bg-secondary border-0 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            {/* Wishlist */}
            <Link href="/account" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                    {wishlistItems.length}
                  </Badge>
                )}
                <span className="sr-only">Wishlist ({wishlistItems.length} items)</span>
              </Button>
            </Link>

            {/* Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
                    {totalItems}
                  </Badge>
                )}
                <span className="sr-only">Cart ({totalItems} items)</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search pujas..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>

                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2 px-3">Categories</h3>
                    <nav className="space-y-1">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/packages?category=${category.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          <span>{category.name}</span>
                          <span className="text-xs">{category.nameHindi}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Navigation */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2 px-3">Menu</h3>
                    <nav className="space-y-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Account Links */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2 px-3">Account</h3>
                    <nav className="space-y-1">
                      <Link
                        href="/account"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      >
                        <User className="h-4 w-4" />
                        My Account
                      </Link>
                      <Link
                        href="/account"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        Wishlist
                        {wishlistItems.length > 0 && (
                          <Badge className="ml-auto" variant="secondary">{wishlistItems.length}</Badge>
                        )}
                      </Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
