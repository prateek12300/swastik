"use client"

import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  CreditCard,
  Truck,
  Shield,
  CheckCircle2,
  Smartphone,
  Building,
  Wallet,
  Copy,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToastContext } from "@/lib/toast-context"

type Step = "address" | "payment" | "confirmation"

interface Address {
  id: string
  name: string
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
  landmark: string
  isDefault: boolean
}

// Mock saved addresses
const savedAddresses: Address[] = [
  {
    id: "1",
    name: "Home",
    fullName: "Amit Kumar",
    phone: "9876543210",
    email: "amit@email.com",
    address: "123, Temple Street, Sector 15",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201301",
    landmark: "Near Shiv Temple",
    isDefault: true,
  },
  {
    id: "2",
    name: "Office",
    fullName: "Amit Kumar",
    phone: "9876543211",
    email: "amit.work@email.com",
    address: "456, Business Park, Cyber City",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122001",
    landmark: "Near Metro Station",
    isDefault: false,
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart, couponCode, couponDiscount } = useCart()
  const { showToast } = useToastContext()
  const [currentStep, setCurrentStep] = useState<Step>("address")
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(savedAddresses[0]?.id || null)
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [copiedUpi, setCopiedUpi] = useState(false)

  const deliveryFee = totalPrice > 999 ? 0 : 49
  const finalTotal = totalPrice - couponDiscount + deliveryFee

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  })

  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const [upiId, setUpiId] = useState("")

  // Redirect if cart is empty and not on confirmation
  useEffect(() => {
    if (items.length === 0 && currentStep !== "confirmation") {
      router.push("/cart")
    }
  }, [items.length, currentStep, router])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAddressId && !isAddingNewAddress) {
      showToast("Please select or add a delivery address", "error")
      return
    }
    if (isAddingNewAddress) {
      // Validate new address
      if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
        showToast("Please fill all required fields", "error")
        return
      }
    }
    setCurrentStep("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate payment details
    if (paymentMethod === "upi" && !upiId) {
      showToast("Please enter your UPI ID", "error")
      return
    }
    if (paymentMethod === "card" && (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name)) {
      showToast("Please fill all card details", "error")
      return
    }

    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // Generate order ID
    const newOrderId = `PS${Date.now().toString().slice(-8)}`
    setOrderId(newOrderId)
    
    setIsProcessing(false)
    setCurrentStep("confirmation")
    clearCart()
    
    // TODO: Backend integration - Save order to database
    // await saveOrder({ orderId: newOrderId, items, address, payment, total: finalTotal })
  }

  const copyUpiId = () => {
    navigator.clipboard.writeText("pujasamagri@upi")
    setCopiedUpi(true)
    showToast("UPI ID copied!", "success")
    setTimeout(() => setCopiedUpi(false), 2000)
  }

  if (items.length === 0 && currentStep !== "confirmation") {
    return null
  }

  if (currentStep === "confirmation") {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-6">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground mb-4">
              Thank you for your order. Your puja samagri will be delivered soon.
            </p>
            <div className="bg-secondary/50 rounded-xl p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Order ID</p>
              <p className="text-xl font-mono font-semibold">#{orderId}</p>
              <p className="text-sm text-muted-foreground mt-4">
                Estimated Delivery: 2-4 business days
              </p>
            </div>
            
            <Card className="mb-8 text-left">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">What happens next?</h3>
                <div className="space-y-3">
                  {[
                    "You will receive an order confirmation email",
                    "Our team will pack your puja items with care",
                    "You will get tracking updates via SMS",
                    "Delivery partner will contact you before arrival",
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/account">
                <Button variant="outline" className="bg-transparent">Track Order</Button>
              </Link>
              <Link href="/packages">
                <Button className="bg-primary hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/cart"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep === "address"
                  ? "bg-primary text-primary-foreground"
                  : "bg-green-500 text-white"
              }`}
            >
              {currentStep !== "address" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                "1"
              )}
            </div>
            <span className="ml-2 font-medium">Address</span>
          </div>
          <div className={`w-16 h-0.5 mx-4 ${currentStep !== "address" ? "bg-green-500" : "bg-border"}`} />
          <div className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep === "payment"
                  ? "bg-primary text-primary-foreground"
                  : currentStep === "confirmation"
                    ? "bg-green-500 text-white"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              {currentStep === "confirmation" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                "2"
              )}
            </div>
            <span className="ml-2 font-medium">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {currentStep === "address" && (
              <div className="space-y-6">
                {/* Saved Addresses */}
                {savedAddresses.length > 0 && !isAddingNewAddress && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Select Delivery Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={selectedAddressId || ""}
                        onValueChange={setSelectedAddressId}
                        className="space-y-3"
                      >
                        {savedAddresses.map((addr) => (
                          <div
                            key={addr.id}
                            className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedAddressId === addr.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedAddressId(addr.id)}
                          >
                            <RadioGroupItem value={addr.id} id={addr.id} className="mt-1" />
                            <Label htmlFor={addr.id} className="flex-1 cursor-pointer">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{addr.name}</span>
                                {addr.isDefault && (
                                  <Badge variant="secondary" className="text-xs">Default</Badge>
                                )}
                              </div>
                              <p className="text-sm font-medium">{addr.fullName}</p>
                              <p className="text-sm text-muted-foreground">{addr.address}</p>
                              <p className="text-sm text-muted-foreground">
                                {addr.city}, {addr.state} - {addr.pincode}
                              </p>
                              <p className="text-sm text-muted-foreground">Phone: {addr.phone}</p>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      <Button
                        variant="outline"
                        className="w-full mt-4 bg-transparent"
                        onClick={() => {
                          setIsAddingNewAddress(true)
                          setSelectedAddressId(null)
                        }}
                      >
                        + Add New Address
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* New Address Form */}
                {(isAddingNewAddress || savedAddresses.length === 0) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Truck className="h-5 w-5" />
                          {savedAddresses.length > 0 ? "Add New Address" : "Delivery Address"}
                        </span>
                        {savedAddresses.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setIsAddingNewAddress(false)
                              setSelectedAddressId(savedAddresses[0]?.id || null)
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddressSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              placeholder="10-digit mobile number"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your@email.com"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address *</Label>
                          <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            placeholder="House no., Building, Street, Area"
                            rows={3}
                          />
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              placeholder="City"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State *</Label>
                            <Input
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              required
                              placeholder="State"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pincode">Pincode *</Label>
                            <Input
                              id="pincode"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleInputChange}
                              required
                              placeholder="6-digit pincode"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="landmark">Landmark (Optional)</Label>
                          <Input
                            id="landmark"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleInputChange}
                            placeholder="Near temple, school, etc."
                          />
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                <Button
                  onClick={handleAddressSubmit}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {currentStep === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div
                        className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === "upi"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <RadioGroupItem value="upi" id="upi" />
                        <Label
                          htmlFor="upi"
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <Smartphone className="h-5 w-5" />
                          <div>
                            <p className="font-medium">UPI</p>
                            <p className="text-sm text-muted-foreground">
                              Pay using Google Pay, PhonePe, Paytm, etc.
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === "card"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <RadioGroupItem value="card" id="card" />
                        <Label
                          htmlFor="card"
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Credit / Debit Card</p>
                            <p className="text-sm text-muted-foreground">
                              Visa, Mastercard, RuPay accepted
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === "netbanking"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                        onClick={() => setPaymentMethod("netbanking")}
                      >
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Label
                          htmlFor="netbanking"
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <Building className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Net Banking</p>
                            <p className="text-sm text-muted-foreground">
                              All major banks supported
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div
                        className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === "cod"
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                        onClick={() => setPaymentMethod("cod")}
                      >
                        <RadioGroupItem value="cod" id="cod" />
                        <Label
                          htmlFor="cod"
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <Wallet className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">
                              Pay when you receive your order
                            </p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "upi" && (
                      <div className="space-y-4 p-4 bg-secondary/50 rounded-lg">
                        <div className="space-y-2">
                          <Label htmlFor="upiId">Enter your UPI ID</Label>
                          <Input
                            id="upiId"
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">Or pay to our UPI:</p>
                          <div className="flex items-center justify-center gap-2">
                            <code className="bg-card px-3 py-1 rounded border">pujasamagri@upi</code>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={copyUpiId}
                            >
                              {copiedUpi ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="space-y-4 p-4 bg-secondary/50 rounded-lg">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardData.number}
                            onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={cardData.expiry}
                              onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              type="password"
                              maxLength={4}
                              value={cardData.cvv}
                              onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardData.name}
                            onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "netbanking" && (
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          You will be redirected to your bank&apos;s secure payment page after clicking Pay.
                        </p>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Pay ₹{finalTotal.toLocaleString()} in cash when your order is delivered.
                          Please keep exact change ready.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep("address")}
                        className="bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 bg-primary hover:bg-primary/90"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                            Processing...
                          </>
                        ) : (
                          `Pay ₹${finalTotal.toLocaleString()}`
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Your payment is secure and encrypted</span>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-secondary shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Coupon ({couponCode})</span>
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
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>

                {/* Delivery Info */}
                <div className="p-3 bg-secondary/50 rounded-lg text-sm">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <Truck className="h-4 w-4" />
                    <span className="font-medium">Estimated Delivery</span>
                  </div>
                  <p className="text-muted-foreground">2-4 business days</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
