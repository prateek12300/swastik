"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface WishlistItem {
  id: string
  name: string
  nameHindi: string
  price: number
  image: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("puja-wishlist")
    if (saved) {
      setItems(JSON.parse(saved))
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("puja-wishlist", JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addToWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeFromWishlist = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const isInWishlist = (id: string) => {
    return items.some((i) => i.id === id)
  }

  const clearWishlist = () => setItems([])

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
