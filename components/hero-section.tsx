"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, ArrowRight, Truck, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/packages?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/images/mandala-pattern.png')] bg-repeat opacity-5" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Delivery in hours
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
              Complete Puja Kits for{" "}
              <span className="text-primary">Sacred Rituals</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Order authentic puja samagri for Havan, Satyanarayan Katha, Rudra Abhishek, and 
              all Hindu rituals. Everything you need in one package.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for any ritual or puja..."
                className="h-14 pl-12 pr-32 text-base bg-card border-border shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Popular:</span>
            {["Havan", "Satyanarayan", "Rudra Abhishek", "Griha Shanti"].map((term) => (
              <Link
                key={term}
                href={`/packages?search=${encodeURIComponent(term)}`}
                className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/packages">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Browse All Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/packages?featured=true">
              <Button size="lg" variant="outline">
                View Bestsellers
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Same day in select cities</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">100% Authentic</h3>
              <p className="text-sm text-muted-foreground">Pure & blessed materials</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Ready to Use</h3>
              <p className="text-sm text-muted-foreground">Complete kits, no hassle</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
