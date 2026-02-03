"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PujaCard } from "@/components/puja-card"
import { categories, pujaPackages, searchPujas, type PujaPackage } from "@/lib/puja-data"

type SortOption = "popular" | "price-low" | "price-high" | "rating"

export default function PackagesPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || ""
  const initialSearch = searchParams.get("search") || ""
  const showFeatured = searchParams.get("featured") === "true"

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  )
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])

  const filteredPackages = useMemo(() => {
    let packages: PujaPackage[] = pujaPackages

    // Search filter
    if (searchQuery.trim()) {
      packages = searchPujas(searchQuery)
    }

    // Featured filter
    if (showFeatured) {
      packages = packages.filter((p) => p.featured)
    }

    // Category filter
    if (selectedCategories.length > 0) {
      packages = packages.filter((p) => selectedCategories.includes(p.category))
    }

    // Price filter
    packages = packages.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case "price-low":
        packages = [...packages].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        packages = [...packages].sort((a, b) => b.price - a.price)
        break
      case "rating":
        packages = [...packages].sort((a, b) => b.rating - a.rating)
        break
      case "popular":
      default:
        packages = [...packages].sort((a, b) => b.reviews - a.reviews)
        break
    }

    return packages
  }, [searchQuery, selectedCategories, sortBy, priceRange, showFeatured])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSortBy("popular")
    setPriceRange([0, 5000])
  }

  const hasActiveFilters =
    searchQuery || selectedCategories.length > 0 || sortBy !== "popular"

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <Label
                htmlFor={category.id}
                className="text-sm cursor-pointer flex-1"
              >
                {category.name}
                <span className="text-muted-foreground ml-1">
                  ({pujaPackages.filter((p) => p.category === category.id).length})
                </span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <div className="space-y-2">
          {[
            { label: "Under ₹500", range: [0, 500] },
            { label: "₹500 - ₹1000", range: [500, 1000] },
            { label: "₹1000 - ₹1500", range: [1000, 1500] },
            { label: "Above ₹1500", range: [1500, 5000] },
          ].map((option) => (
            <div key={option.label} className="flex items-center space-x-2">
              <Checkbox
                id={option.label}
                checked={
                  priceRange[0] === option.range[0] &&
                  priceRange[1] === option.range[1]
                }
                onCheckedChange={(checked) => {
                  if (checked) {
                    setPriceRange(option.range as [number, number])
                  } else {
                    setPriceRange([0, 5000])
                  }
                }}
              />
              <Label htmlFor={option.label} className="text-sm cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {showFeatured ? "Bestselling Puja Kits" : "All Puja Packages"}
          </h1>
          <p className="text-muted-foreground">
            {showFeatured
              ? "Our most popular packages chosen by thousands of customers"
              : "Complete kits for all Hindu rituals and ceremonies"}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for rituals, pujas, or items..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {selectedCategories.length > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedCategories.map((catId) => {
              const cat = categories.find((c) => c.id === catId)
              return (
                <Badge key={catId} variant="secondary" className="gap-1">
                  {cat?.name}
                  <button onClick={() => toggleCategory(catId)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground"
            >
              Clear all
            </Button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h2>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredPackages.length} packages
              </p>
            </div>

            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((puja) => (
                  <PujaCard key={puja.id} puja={puja} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-muted-foreground mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No packages found</p>
                  <p>Try adjusting your search or filters</p>
                </div>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
