"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  nameHindi: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  itemCount: number
}

// Valid coupon codes for demo
const VALID_COUPONS: Record<string, number> = {
  "FIRST10": 10,
  "DIWALI20": 20,
  "WELCOME15": 15,
  "PUJA25": 25,
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  totalSavings: number
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  couponCode: string | null
  couponDiscount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [couponCode, setCouponCode] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("puja-cart")
    const savedCoupon = localStorage.getItem("puja-coupon")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
    if (savedCoupon) {
      setCouponCode(savedCoupon)
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("puja-cart", JSON.stringify(items))
      if (couponCode) {
        localStorage.setItem("puja-coupon", couponCode)
      } else {
        localStorage.removeItem("puja-coupon")
      }
    }
  }, [items, couponCode, isHydrated])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => {
    setItems([])
    setCouponCode(null)
  }

  const applyCoupon = (code: string): boolean => {
    const upperCode = code.toUpperCase()
    if (VALID_COUPONS[upperCode]) {
      setCouponCode(upperCode)
      return true
    }
    return false
  }

  const removeCoupon = () => {
    setCouponCode(null)
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const totalSavings = items.reduce(
    (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
    0
  )

  const couponDiscount = couponCode
    ? Math.round((totalPrice * (VALID_COUPONS[couponCode] || 0)) / 100)
    : 0

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalSavings,
        applyCoupon,
        removeCoupon,
        couponCode,
        couponDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
