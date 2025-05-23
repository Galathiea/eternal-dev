"use client"

import { useState } from "react"

type ToastType = "default" | "destructive" | "success"

interface ToastProps {
  title: string
  description?: string
  variant?: ToastType
  duration?: number
}

interface Toast extends ToastProps {
  id: string
}

const DEFAULT_TOAST_DURATION = 3000

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      ...props,
      id,
      duration: props.duration || DEFAULT_TOAST_DURATION,
    }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto-dismiss toast after duration
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
    }, newToast.duration)

    return id
  }

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
  }

  return { toast, toasts, dismissToast }
}

// Create a ToastContext and Provider to share across components if needed
// This is a simplified version, in a real app you might want to use a context

