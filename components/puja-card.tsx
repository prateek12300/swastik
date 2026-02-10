"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Package, ShoppingCart, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToastContext } from "@/lib/toast-context"
import type { PujaPackage } from "@/lib/puja-data"

interface PujaCardProps {
  puja: PujaPackage
}

export function PujaCard({ puja }: PujaCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { showToast } = useToastContext()
  const discount = Math.round(((puja.originalPrice - puja.price) / puja.originalPrice) * 100)
  const inWishlist = isInWishlist(puja.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: puja.id,
      name: puja.name,
      nameHindi: puja.nameHindi,
      price: puja.price,
      originalPrice: puja.originalPrice,
      image: puja.image,
      itemCount: puja.itemCount,
    })
    showToast(`${puja.name} added to cart!`, "success")
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(puja.id)
      showToast(`${puja.name} removed from wishlist`, "info")
    } else {
      addToWishlist({
        id: puja.id,
        name: puja.name,
        nameHindi: puja.nameHindi,
        price: puja.price,
        image: puja.image,
      })
      showToast(`${puja.name} added to wishlist!`, "success")
    }
  }

  return (
    <Link href={`/packages/${puja.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <Image
            src={puja.image || "/placeholder.svg"}
            alt={puja.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {discount > 0 && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              {discount}% OFF
            </Badge>
          )}
          {puja.featured && (
            <Badge className="absolute top-3 right-12 bg-primary text-primary-foreground">
              Bestseller
            </Badge>
          )}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
              inWishlist
                ? "bg-red-500 text-white"
                : "bg-white/80 text-foreground hover:bg-white"
            }`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {puja.name}
              </h3>
              <p className="text-sm text-muted-foreground">{puja.nameHindi}</p>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {puja.description}
            </p>

            {/* Items Preview */}
            <div className="text-xs text-muted-foreground bg-secondary/30 p-2 rounded-md">
              <span className="font-medium text-foreground block mb-1">Includes:</span>
              <ul className="space-y-0.5">
                {puja.items.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5 overflow-hidden">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </li>
                ))}
              </ul>
              {puja.items.length > 3 && (
                <p className="mt-1 pl-2.5 text-[10px] text-primary font-medium">
                  +{puja.items.length - 3} more items
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                {puja.itemCount} items
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {puja.duration}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{puja.rating}</span>
              <span className="text-sm text-muted-foreground">({puja.reviews} reviews)</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-foreground">
                  ₹{puja.price.toLocaleString()}
                </span>
                {puja.originalPrice > puja.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{puja.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/90"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
