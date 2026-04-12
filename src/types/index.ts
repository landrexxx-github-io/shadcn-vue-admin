import type { FunctionalComponent, HTMLAttributes, VNodeProps, Component } from 'vue'

export type AccountData = {
  id: string
  class: string
  type: string
  module: string
  description: string
  currency: string
}

export type InvoiceData = {
  invoice: string
  paymentStatus: string
  totalAmount: string
  paymentMethod: string
}

export type SidebarUser = {
  name: string
  email: string
  avatar: string
}

export type SidebarTeam = {
  name: string
  logo: FunctionalComponent<HTMLAttributes & VNodeProps> | Component
  plan: string
}

export type NavAction = {
  title: string
  icon: FunctionalComponent<HTMLAttributes & VNodeProps> | Component
  url: string
}

export type NavSubItem = {
  title: string
  url: string
}

export type NavGroup = {
  label: string
  items: NavSubItem[]
}

export type NavItem = {
  title: string
  url: string
  icon?: FunctionalComponent<HTMLAttributes & VNodeProps> | Component
  isActive?: boolean
  actions?: NavAction[]
  groups?: NavGroup[]
}

export type SidebarData = {
  user: SidebarUser
  teams: SidebarTeam[]
  navMain: NavItem[]
}
