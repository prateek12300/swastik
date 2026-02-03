"use client"

import { X, CheckCircle2, AlertCircle, Info } from "lucide-react"
import { useToastContext } from "@/lib/toast-context"

export function ToastContainer() {
  const { toasts, removeToast } = useToastContext()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[280px] max-w-[400px] animate-in slide-in-from-right-full duration-300 ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : toast.type === "error"
                ? "bg-red-600 text-white"
                : "bg-blue-600 text-white"
          }`}
        >
          {toast.type === "success" && <CheckCircle2 className="h-5 w-5 shrink-0" />}
          {toast.type === "error" && <AlertCircle className="h-5 w-5 shrink-0" />}
          {toast.type === "info" && <Info className="h-5 w-5 shrink-0" />}
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 hover:opacity-80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
