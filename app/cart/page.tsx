"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, X, Percent, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToastContext } from "@/lib/toast-context"
import { pujaPackages } from "@/lib/puja-data"
import { PujaCard } from "@/components/puja-card"

export default function CartPage() {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    totalPrice, 
    totalSavings,
    clearCart,
    applyCoupon,
    removeCoupon,
    couponCode,
    couponDiscount
  } = useCart()
  const { showToast } = useToastContext()
  const [couponInput, setCouponInput] = useState("")

  const deliveryFee = totalPrice > 999 ? 0 : 49
  const finalTotal = totalPrice - couponDiscount + deliveryFee

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      showToast("Please enter a coupon code", "error")
      return
    }
    if (applyCoupon(couponInput)) {
      showToast("Coupon applied successfully!", "success")
      setCouponInput("")
    } else {
      showToast("Invalid coupon code", "error")
    }
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    showToast("Coupon removed", "info")
  }

  const recommendedProducts = pujaPackages
    .filter((p) => !items.find((i) => i.id === p.id))
    .slice(0, 4)

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Looks like you have not added any puja kits to your cart yet.
            </p>
            <Link href="/packages">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Browse Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Recommended Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Popular Puja Kits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pujaPackages.filter(p => p.featured).slice(0, 4).map((puja) => (
                <PujaCard key={puja.id} puja={puja} />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">
                {items.length} item{items.length > 1 ? "s" : ""} in cart
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  clearCart()
                  showToast("Cart cleared", "info")
                }}
              >
                Clear Cart
              </Button>
            </div>

            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link href={`/packages/${item.id}`} className="shrink-0">
                      <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-secondary">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            href={`/packages/${item.id}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.nameHindi}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.itemCount} items included
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-muted-foreground">
                              ₹{item.price.toLocaleString()} each
                            </div>
                          )}
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="text-xs text-green-600">
                              Save ₹{((item.originalPrice - item.price) * item.quantity).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            removeFromCart(item.id)
                            showToast(`${item.name} removed from cart`, "info")
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Available Coupons */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Available Offers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { code: "FIRST10", desc: "10% off on your first order" },
                  { code: "DIWALI20", desc: "20% off on orders above ₹1000" },
                  { code: "WELCOME15", desc: "15% off for new customers" },
                ].map((offer) => (
                  <div
                    key={offer.code}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        {offer.code}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{offer.desc}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCouponInput(offer.code)
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon Code */}
                {couponCode ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-green-600" />
                      <span className="font-mono font-medium text-green-700">
                        {couponCode}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
                      onClick={handleRemoveCoupon}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter coupon code"
                        className="pl-10"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      />
                    </div>
                    <Button variant="outline" onClick={handleApplyCoupon} className="bg-transparent">
                      Apply
                    </Button>
                  </div>
                )}

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Product Discount</span>
                      <span>-₹{totalSavings.toLocaleString()}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Coupon Discount ({couponCode})</span>
                      <span>-₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  {deliveryFee === 0 && (
                    <p className="text-xs text-green-600">
                      You saved ₹49 on delivery!
                    </p>
                  )}
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{(1000 - totalPrice).toLocaleString()} more for free delivery
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>

                {(totalSavings > 0 || couponDiscount > 0) && (
                  <p className="text-sm text-green-600 text-center">
                    You save ₹{(totalSavings + couponDiscount + (deliveryFee === 0 ? 49 : 0)).toLocaleString()} on this order!
                  </p>
                )}

                <Link href="/checkout" className="block">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/packages" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span className="text-primary">✓</span>
                      100% Authentic
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-primary">✓</span>
                      Fast Delivery
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-primary">✓</span>
                      Secure Payment
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-primary">✓</span>
                      Easy Returns
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((puja) => (
                <PujaCard key={puja.id} puja={puja} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
