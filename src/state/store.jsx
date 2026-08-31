import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { getItemById } from '../data/mockData'

const AppCtx = createContext(null)

const REFERRAL_CODE = 'RAHUL50X'

function genOrderId() {
  return 'FKF' + Math.floor(100000 + Math.random() * 900000)
}

export function AppProvider({ children }) {
  // top-level mode: 'customer' | 'restaurant'
  const [mode, setMode] = useState('customer')

  // customer nav: bottom tab + a screen stack for drill-down flows
  const [customerTab, setCustomerTab] = useState('home')
  const [stack, setStack] = useState([{ screen: 'home' }])

  // restaurant nav
  const [restaurantTab, setRestaurantTab] = useState('dashboard')

  // demo "context" selector for occasion banners
  const [occasion, setOccasion] = useState('default')

  // customer sub-mode: regular vs tiffinx catalog
  const [foodMode, setFoodMode] = useState('regular') // 'regular' | 'tiffinx'

  const [cart, setCart] = useState({}) // id -> qty
  const [coins, setCoins] = useState(240)
  const [orders, setOrders] = useState([]) // completed/active orders
  const [toasts, setToasts] = useState([])
  const [onboarded, setOnboarded] = useState(false)
  const [userName] = useState('Rahul')

  const toastTimer = useRef(0)

  const pushToast = useCallback((title, body, tone = 'info') => {
    const id = ++toastTimer.current + '-' + Date.now()
    setToasts((t) => [...t, { id, title, body, tone }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 5000)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const push = useCallback((screen, params = {}) => {
    setStack((s) => [...s, { screen, params }])
  }, [])

  const pop = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s))
  }, [])

  const resetTo = useCallback((screen, params = {}) => {
    setStack([{ screen, params }])
  }, [])

  const goTab = useCallback((tab) => {
    setCustomerTab(tab)
    setStack([{ screen: tab === 'home' ? 'home' : tab }])
  }, [])

  const addToCart = useCallback((id, delta = 1) => {
    setCart((c) => {
      const next = { ...c }
      const qty = (next[id] || 0) + delta
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }, [])

  const clearCart = useCallback(() => setCart({}), [])

  const cartItems = useMemo(
    () =>
      Object.entries(cart).map(([id, qty]) => ({ item: getItemById(id), qty })).filter((x) => x.item),
    [cart]
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, { item, qty }) => sum + item.price * qty, 0),
    [cartItems]
  )

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart])

  const placeOrder = useCallback(
    ({ isTiffinX, total }) => {
      const id = genOrderId()
      const etaMinutes = isTiffinX ? 20 : 40
      const order = {
        id,
        items: cartItems.map(({ item, qty }) => ({ name: item.name, qty, price: item.price })),
        total,
        isTiffinX,
        placedAt: Date.now(),
        etaSeconds: etaMinutes * 60,
        status: 'placed',
      }
      setOrders((o) => [order, ...o])
      clearCart()
      return order
    },
    [cartItems, clearCart]
  )

  const completeOrder = useCallback(
    (id) => {
      setOrders((o) => o.map((ord) => (ord.id === id ? { ...ord, status: 'delivered' } : ord)))
      const earned = 15
      setCoins((c) => c + earned)
      pushToast('SuperCoins earned! 🪙', `+${earned} coins credited for your order.`, 'success')
    },
    [pushToast]
  )

  const applyReferral = useCallback(() => {
    setCoins((c) => c + 50)
    pushToast('Referral bonus! 🎉', '+₹50 SuperCoins credited — your friend got ₹50 too.', 'success')
  }, [pushToast])

  const value = {
    mode,
    setMode,
    customerTab,
    goTab,
    restaurantTab,
    setRestaurantTab,
    occasion,
    setOccasion,
    foodMode,
    setFoodMode,
    stack,
    push,
    pop,
    resetTo,
    cart,
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    clearCart,
    coins,
    setCoins,
    orders,
    placeOrder,
    completeOrder,
    toasts,
    pushToast,
    dismissToast,
    onboarded,
    setOnboarded,
    userName,
    referralCode: REFERRAL_CODE,
    applyReferral,
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
