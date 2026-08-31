import React from 'react'
import { useApp } from './state/store'
import ModeToggle from './components/ModeToggle'
import ToastHost from './components/ToastHost'
import OccasionDock from './components/OccasionDock'
import BottomNav from './components/BottomNav'

import CustomerHome from './screens/customer/CustomerHome'
import ItemDetail from './screens/customer/ItemDetail'
import Cart from './screens/customer/Cart'
import Checkout from './screens/customer/Checkout'
import OrderTracking from './screens/customer/OrderTracking'
import OrdersList from './screens/customer/OrdersList'
import Wallet from './screens/customer/Wallet'
import Refer from './screens/customer/Refer'
import Account from './screens/customer/Account'
import Onboarding from './screens/customer/Onboarding'
import PlayScreen from './screens/customer/PlayScreen'

import RestaurantShell from './screens/restaurant/RestaurantShell'
import RestaurantDashboard from './screens/restaurant/RestaurantDashboard'
import CommissionPromotion from './screens/restaurant/CommissionPromotion'
import CampusContext from './screens/restaurant/CampusContext'

function CustomerApp() {
  const { stack, onboarded } = useApp()
  const top = stack[stack.length - 1]

  if (!onboarded) return <Onboarding />

  let screenEl
  switch (top.screen) {
    case 'home':
      screenEl = <CustomerHome />
      break
    case 'itemDetail':
      screenEl = <ItemDetail id={top.params.id} />
      break
    case 'cart':
      screenEl = <Cart />
      break
    case 'checkout':
      screenEl = <Checkout />
      break
    case 'tracking':
      screenEl = <OrderTracking orderId={top.params.orderId} />
      break
    case 'orders':
      screenEl = <OrdersList />
      break
    case 'wallet':
      screenEl = <Wallet />
      break
    case 'refer':
      screenEl = <Refer />
      break
    case 'account':
      screenEl = <Account />
      break
    case 'play':
      screenEl = <PlayScreen />
      break
    default:
      screenEl = <CustomerHome />
  }

  const hideNav = ['itemDetail', 'checkout', 'tracking', 'wallet', 'refer'].includes(top.screen)

  return (
    <>
      <div className="scroll-area" style={{ paddingBottom: hideNav ? 0 : 78 }}>
        {screenEl}
      </div>
      {!hideNav && <BottomNav />}
      <OccasionDock />
    </>
  )
}

function RestaurantApp() {
  const { restaurantTab } = useApp()
  let screenEl
  switch (restaurantTab) {
    case 'dashboard':
      screenEl = <RestaurantDashboard />
      break
    case 'campus':
      screenEl = <CampusContext />
      break
    case 'commission':
      screenEl = <CommissionPromotion />
      break
    default:
      screenEl = <RestaurantDashboard />
  }
  return (
    <div className="scroll-area" style={{ paddingBottom: 20 }}>
      <RestaurantShell>{screenEl}</RestaurantShell>
    </div>
  )
}

export default function App() {
  const { mode } = useApp()
  return (
    <div className="app-shell">
      <ModeToggle />
      {mode === 'customer' ? <CustomerApp /> : <RestaurantApp />}
      <ToastHost />
    </div>
  )
}
