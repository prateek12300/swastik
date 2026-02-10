"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Star,
  Package,
  Clock,
  Truck,
  Shield,
  ShoppingCart,
  ChevronRight,
  Check,
  Minus,
  Plus,
  Heart,
  Share2,
  Copy,
  Facebook,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToastContext } from "@/lib/toast-context"
import { getPujaById, pujaPackages } from "@/lib/puja-data"
import { PujaCard } from "@/components/puja-card"

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    name: "Amit Kumar",
    date: "2 weeks ago",
    rating: 5,
    comment: "Excellent quality materials. Everything was fresh and properly packed. The havan samagri had amazing fragrance. Highly recommended!",
    verified: true,
  },
  {
    id: "2",
    name: "Priya Singh",
    date: "1 month ago",
    rating: 5,
    comment: "Complete kit with all items mentioned. Very convenient for performing puja at home. Delivery was quick and packaging was great.",
    verified: true,
  },
  {
    id: "3",
    name: "Rajesh Sharma",
    date: "1 month ago",
    rating: 4,
    comment: "Good quality products. Delivery was on time. Will order again. Just wish there were more detailed instructions included.",
    verified: true,
  },
  {
    id: "4",
    name: "Sunita Devi",
    date: "2 months ago",
    rating: 5,
    comment: "Perfect for our monthly Satyanarayan Katha. Everything was authentic and fresh. Customer service was also very helpful.",
    verified: true,
  },
]

export default function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const puja = getPujaById(resolvedParams.id)

  if (!puja) {
    notFound()
  }

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { showToast } = useToastContext()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  
  // State for item customizations
  const [customizations, setCustomizations] = useState<Record<number, string>>({})

  const handleCustomizationChange = (index: number, value: string) => {
    setCustomizations(prev => ({
      ...prev,
      [index]: value
    }))
  }

  const inWishlist = isInWishlist(puja.id)
  const discount = Math.round(
    ((puja.originalPrice - puja.price) / puja.originalPrice) * 100
  )

  // Mock multiple images (in real app, would come from data)
  const images = [puja.image, puja.image, puja.image]

  const handleAddToCart = () => {
    // Convert index-based customizations to name-based
    const customizationMap: Record<string, string> = {}
    if (Object.keys(customizations).length > 0) {
      Object.entries(customizations).forEach(([indexStr, value]) => {
        const idx = parseInt(indexStr)
        if (puja.items[idx]) {
           customizationMap[puja.items[idx].name] = value
        }
      })
    }
    
    // Create unique ID for cart if customizations exist
    const cartItemId = Object.keys(customizationMap).length > 0 
      ? `${puja.id}-${Object.values(customizationMap).join("-")}`
      : puja.id

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: cartItemId,
        name: puja.name,
        nameHindi: puja.nameHindi,
        price: puja.price,
        originalPrice: puja.originalPrice,
        image: puja.image,
        itemCount: puja.itemCount,
        selectedOptions: Object.keys(customizationMap).length > 0 ? customizationMap : undefined
      })
    }
    showToast(`${quantity} x ${puja.name} added to cart!`, "success")
  }

  const handleBuyNow = () => {
    handleAddToCart()
    window.location.href = "/checkout"
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(puja.id)
      showToast("Removed from wishlist", "info")
    } else {
      addToWishlist({
        id: puja.id,
        name: puja.name,
        nameHindi: puja.nameHindi,
        price: puja.price,
        image: puja.image,
      })
      showToast("Added to wishlist!", "success")
    }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out ${puja.name} on PujaSamagri!`

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(url)
        showToast("Link copied to clipboard!", "success")
        break
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank")
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank")
        break
    }
  }

  const relatedPujas = pujaPackages
    .filter((p) => p.category === puja.category && p.id !== puja.id)
    .slice(0, 4)

  const recentlyViewed = pujaPackages
    .filter((p) => p.id !== puja.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/packages"
              className="hover:text-foreground transition-colors"
            >
              Packages
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground line-clamp-1">{puja.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={puja.name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-lg px-3 py-1">
                  {discount}% OFF
                </Badge>
              )}
              {puja.featured && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  Bestseller
                </Badge>
              )}
            </div>
            {/* Thumbnail Gallery */}
            <div className="flex gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${puja.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {puja.name}
              </h1>
              <p className="text-xl text-muted-foreground">{puja.nameHindi}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(puja.rating)
                        ? "fill-primary text-primary"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{puja.rating}</span>
              <span className="text-muted-foreground">
                ({puja.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-foreground">
                ₹{puja.price.toLocaleString()}
              </span>
              {puja.originalPrice > puja.price && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{puja.originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Save ₹{(puja.originalPrice - puja.price).toLocaleString()}
                  </Badge>
                </>
              )}
            </div>

            <p className="text-muted-foreground">{puja.description}</p>

            <Separator />

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{puja.itemCount} Items</div>
                  <div className="text-sm text-muted-foreground">
                    Complete kit
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{puja.duration}</div>
                  <div className="text-sm text-muted-foreground">
                    Ritual duration
                  </div>
                </div>
              </div>
            </div>

            {/* Best For */}
            <div>
              <h3 className="font-medium mb-2">Best For:</h3>
              <div className="flex flex-wrap gap-2">
                {puja.bestFor.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-muted-foreground">
                  Total: ₹{(puja.price * quantity).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  className={`flex-1 bg-transparent ${inWishlist ? "text-red-500 border-red-200 hover:bg-red-50" : ""}`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`h-5 w-5 mr-2 ${inWishlist ? "fill-current" : ""}`} />
                  {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="lg" variant="outline" className="bg-transparent">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleShare("copy")}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
                      WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("facebook")}>
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare("twitter")}>
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-xl">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-primary" />
                <span>Secure Packaging</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 flex-wrap">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="items"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Items Included ({puja.itemCount})
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews ({puja.reviews})
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">About This Package</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {puja.longDescription}
                </p>
                <h4 className="font-semibold mb-3">Best Occasions:</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {puja.bestFor.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Items Included in This Package ({puja.itemCount} items)
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Customize quantities and options below as per your requirement.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {puja.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-secondary/50 rounded-lg border border-transparent hover:border-primary/20 transition-colors gap-2 sm:gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item.name}</div>
                          {item.quantity && !item.options && (
                            <div className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {item.options ? (
                         <div className="w-full sm:w-32 pl-11 sm:pl-0">
                           <Select
                             value={customizations[index] || item.quantity || item.options[0]}
                             onValueChange={(val) => handleCustomizationChange(index, val)}
                           >
                             <SelectTrigger className="h-8 text-xs w-full">
                               <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                               {item.options.map(opt => (
                                 <SelectItem key={opt} value={opt} className="text-xs">
                                   {opt}
                                 </SelectItem>
                               ))}
                             </SelectContent>
                           </Select>
                         </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                  <div className="text-center p-6 bg-secondary/50 rounded-xl">
                    <div className="text-5xl font-bold text-foreground">
                      {puja.rating}
                    </div>
                    <div className="flex items-center gap-1 justify-center my-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(puja.rating)
                              ? "fill-primary text-primary"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Based on {puja.reviews} reviews
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage = stars === 5 ? 75 : stars === 4 ? 18 : stars === 3 ? 5 : stars === 2 ? 1 : 1
                      return (
                        <div key={stars} className="flex items-center gap-2 mb-2">
                          <span className="w-8 text-sm">{stars}</span>
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="w-10 text-sm text-muted-foreground">{percentage}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Reviews List */}
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {review.name}
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Check className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {review.date}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-primary text-primary"
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Load More Reviews
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {[
                    {
                      q: "How fresh are the puja materials?",
                      a: "All our puja materials are freshly sourced and packed just before shipping. We ensure that flowers, leaves, and other perishables are of the highest quality.",
                    },
                    {
                      q: "Can I customize the package?",
                      a: "Currently, packages come with pre-defined items. However, you can contact our customer service for special requests or bulk orders.",
                    },
                    {
                      q: "What if an item is damaged during delivery?",
                      a: "We offer a full replacement or refund for any damaged items. Please contact us within 24 hours of delivery with photos of the damaged items.",
                    },
                    {
                      q: "Do you provide puja instructions?",
                      a: "Yes, detailed instructions and mantras are included with every package. You can also access our online video guides for step-by-step guidance.",
                    },
                    {
                      q: "What is the shelf life of the materials?",
                      a: "Most dry items have a shelf life of 6-12 months when stored properly. Perishables should be used within 3-5 days of delivery.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-0">
                      <h4 className="font-semibold mb-2">{faq.q}</h4>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedPujas.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Similar Packages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPujas.map((relatedPuja) => (
                <PujaCard key={relatedPuja.id} puja={relatedPuja} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((puja) => (
              <PujaCard key={puja.id} puja={puja} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
