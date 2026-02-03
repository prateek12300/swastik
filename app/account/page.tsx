"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Edit,
  Plus,
  Trash2,
  Eye,
  ShoppingCart,
  Bell,
  Lock,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"
import { useToastContext } from "@/lib/toast-context"
import { getPujaById } from "@/lib/puja-data"

// Mock user data - TODO: Replace with actual auth backend
const mockUser = {
  name: "Amit Kumar",
  email: "amit.kumar@email.com",
  phone: "+91 98765 43210",
  memberSince: "January 2025",
  avatar: null,
}

// Mock orders - TODO: Fetch from backend
const mockOrders = [
  {
    id: "PS12345678",
    date: "Jan 28, 2026",
    status: "Delivered",
    total: 1298,
    items: [
      { id: "satyanarayan-katha", name: "Satyanarayan Katha Kit", quantity: 1, price: 849, image: "/images/satyanarayan.jpg" },
      { id: "tulsi-pujan", name: "Tulsi Pujan Kit", quantity: 1, price: 399, image: "/images/tulsi.jpg" },
    ],
  },
  {
    id: "PS12345677",
    date: "Jan 15, 2026",
    status: "Shipped",
    total: 599,
    items: [
      { id: "havan-samagri", name: "Havan Samagri Kit", quantity: 1, price: 599, image: "/images/havan.jpg" },
    ],
  },
  {
    id: "PS12345676",
    date: "Dec 20, 2025",
    status: "Delivered",
    total: 1499,
    items: [
      { id: "griha-shanti", name: "Griha Shanti Paath Kit", quantity: 1, price: 1499, image: "/images/griha-shanti.jpg" },
    ],
  },
]

interface Address {
  id: string
  name: string
  fullName: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

const initialAddresses: Address[] = [
  {
    id: "1",
    name: "Home",
    fullName: "Amit Kumar",
    phone: "+91 98765 43210",
    address: "123, Temple Street, Sector 15",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    isDefault: true,
  },
  {
    id: "2",
    name: "Office",
    fullName: "Amit Kumar",
    phone: "+91 98765 43211",
    address: "456, Business Park, Cyber City",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122001",
    isDefault: false,
  },
]

type TabType = "profile" | "orders" | "addresses" | "wishlist" | "settings"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(mockUser)
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null)
  
  const { items: wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { showToast } = useToastContext()

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700"
      case "processing":
        return "bg-blue-100 text-blue-700"
      case "shipped":
        return "bg-yellow-100 text-yellow-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const handleSaveProfile = () => {
    // TODO: Save to backend
    setIsEditing(false)
    showToast("Profile updated successfully!", "success")
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
    showToast("Address deleted", "info")
  }

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    )
    showToast("Default address updated", "success")
  }

  const handleAddToCartFromWishlist = (id: string) => {
    const puja = getPujaById(id)
    if (puja) {
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
  }

  const navItems = [
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "orders" as TabType, label: "My Orders", icon: Package },
    { id: "addresses" as TabType, label: "Addresses", icon: MapPin },
    { id: "wishlist" as TabType, label: "Wishlist", icon: Heart, badge: wishlistItems.length },
    { id: "settings" as TabType, label: "Settings", icon: Settings },
  ]

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Account</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-6 p-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-semibold">
                    {profileData.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{profileData.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Member since {mockUser.memberSince}
                    </div>
                  </div>
                </div>

                <Separator className="mb-4" />

                {/* Navigation */}
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center justify-between gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === item.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </span>
                      {item.badge ? (
                        <Badge variant={activeTab === item.id ? "secondary" : "default"} className="h-5 min-w-5 flex items-center justify-center text-xs">
                          {item.badge}
                        </Badge>
                      ) : null}
                    </button>
                  ))}
                  <Separator className="my-2" />
                  <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(false)}
                        className="bg-transparent"
                      >
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveProfile}>
                        Save
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </form>

                  <Separator className="my-6" />

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{mockOrders.length}</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{wishlistItems.length}</div>
                      <div className="text-sm text-muted-foreground">Wishlist Items</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{addresses.length}</div>
                      <div className="text-sm text-muted-foreground">Saved Addresses</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mockOrders.length > 0 ? (
                      <div className="space-y-4">
                        {mockOrders.map((order) => (
                          <div
                            key={order.id}
                            className="border border-border rounded-lg p-4"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                              <div>
                                <p className="font-mono font-medium">
                                  #{order.id}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {order.date}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status}
                                </Badge>
                                <p className="text-lg font-semibold mt-1">
                                  ₹{order.total.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            
                            {/* Order Items Preview */}
                            <div className="flex gap-2 mb-3">
                              {order.items.slice(0, 3).map((item) => (
                                <div
                                  key={item.id}
                                  className="relative h-16 w-16 rounded-lg overflow-hidden bg-secondary"
                                >
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center text-sm font-medium">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>

                            <Separator className="my-3" />
                            
                            <div className="space-y-1">
                              {order.items.map((item, index) => (
                                <p
                                  key={index}
                                  className="text-sm text-muted-foreground"
                                >
                                  {item.name} x {item.quantity}
                                </p>
                              ))}
                            </div>
                            
                            <div className="mt-4 flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedOrder(order)}
                                    className="bg-transparent"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-lg">
                                  <DialogHeader>
                                    <DialogTitle>Order #{order.id}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                      <span className="text-muted-foreground">Status</span>
                                      <Badge className={getStatusColor(order.status)}>
                                        {order.status}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-muted-foreground">Date</span>
                                      <span>{order.date}</span>
                                    </div>
                                    <Separator />
                                    <div className="space-y-3">
                                      {order.items.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                          <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-secondary">
                                            <Image
                                              src={item.image || "/placeholder.svg"}
                                              alt={item.name}
                                              fill
                                              className="object-cover"
                                            />
                                          </div>
                                          <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                              Qty: {item.quantity}
                                            </p>
                                            <p className="text-sm font-medium">
                                              ₹{item.price.toLocaleString()}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                      <span>Total</span>
                                      <span>₹{order.total.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              {order.status === "Shipped" && (
                                <Button variant="outline" size="sm" className="bg-transparent">
                                  Track Order
                                </Button>
                              )}
                              {order.status === "Delivered" && (
                                <Button variant="outline" size="sm" className="bg-transparent">
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No orders yet</p>
                        <Link href="/packages">
                          <Button className="mt-4">Start Shopping</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Saved Addresses</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`border rounded-lg p-4 ${
                          address.isDefault
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{address.name}</span>
                            {address.isDefault && (
                              <Badge variant="secondary" className="text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm font-medium">{address.fullName}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.address}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {address.phone}
                        </p>
                        {!address.isDefault && (
                          <Button
                            variant="link"
                            size="sm"
                            className="px-0 mt-2"
                            onClick={() => handleSetDefaultAddress(address.id)}
                          >
                            Set as default
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist ({wishlistItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlistItems.length > 0 ? (
                    <div className="space-y-3">
                      {wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 border border-border rounded-lg"
                        >
                          <Link href={`/packages/${item.id}`}>
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-secondary">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/packages/${item.id}`}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">{item.nameHindi}</p>
                            <p className="text-lg font-semibold text-primary">
                              ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAddToCartFromWishlist(item.id)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                removeFromWishlist(item.id)
                                showToast("Removed from wishlist", "info")
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Your wishlist is empty
                      </p>
                      <Link href="/packages">
                        <Button>Explore Packages</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive order updates via email
                        </p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Get delivery updates via SMS
                        </p>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, smsNotifications: checked }))
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotional Emails</p>
                        <p className="text-sm text-muted-foreground">
                          Receive offers and discounts
                        </p>
                      </div>
                      <Switch
                        checked={settings.promotionalEmails}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({ ...prev, promotionalEmails: checked }))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">Change Password</p>
                        <p className="text-sm text-muted-foreground">
                          Update your account password
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                      <div>
                        <p className="font-medium text-destructive">
                          Delete Account
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
