import type { SidebarData } from '@/types'
import {
  AudioWaveform,
  Banknote,
  BookOpenText,
  Calculator,
  ChartColumnBig,
  Command,
  DollarSign,
  FileBoxIcon,
  GalleryVerticalEnd,
  HandCoins,
  List,
  RefreshCw,
  SearchIcon,
  SquarePenIcon,
  Timer,
} from 'lucide-vue-next'

export const defaultSidebarData: SidebarData = {
  user: {
    name: 'Landrex Rebuera',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    { name: 'Administrator', logo: GalleryVerticalEnd, plan: 'Head Office' },
    { name: 'Finance', logo: AudioWaveform, plan: 'Admininstrator' },
    { name: 'Evil Corp.', logo: Command, plan: 'Free' },
  ],
  navMain: [
    {
      title: 'Sourcenet',
      url: '/accounting',
      icon: BookOpenText,
      isActive: false,
      actions: [
        {
          title: 'Part no. Search',
          icon: SearchIcon,
          url: '#',
        },
        // {
        //   title: 'Account Summary',
        //   icon: DollarSign,
        //   url: '#',
        // },
        // {
        //   title: 'Account Details',
        //   icon: List,
        //   url: '#',
        // },
        // {
        //   title: 'Reclassify Journal Entries',
        //   icon: RefreshCw,
        //   url: '#',
        // },
      ],
      groups: [
        {
          seq_no: 1,
          label: 'Enquiry',
          items: [
            { title: 'Journal Transactions', url: '#' },
            { title: 'Disbursement Voucher', url: '#' },
            { title: 'Journal Entry Voucher', url: '#' },
          ],
        },
        {
          seq_no: 2,
          label: 'Quotations',
          items: [
            { title: 'Run Allocations', url: '#' },
            { title: 'Reclassify Transactions', url: '#' },
            { title: 'Import Consolidation Data', url: '#' },
            { title: 'Manage Financial Periods', url: '#' },
          ],
        },
        {
          seq_no: 3,
          label: 'Invoices',
          items: [
            { title: 'Trial Balance Summary', url: '#' },
            { title: 'Transactions for Period', url: '#' },
            { title: 'Transactions for Account', url: '#' },
          ],
        },
        {
          seq_no: 4,
          label: 'Financial Statements',
          items: [
            { title: 'Balance Sheet', url: '#' },
            { title: 'Profit & Loss', url: '#' },
            { title: 'Cash Flow Statement', url: '#' },
            { title: 'Profit & Loss Quarterly', url: '#' },
            { title: 'Balance Sheet EU Consolidation', url: '#' },
          ],
        },
        {
          seq_no: 5,
          label: 'Profiles',
          items: [
            { title: 'Master Financial Calendar', url: '#' },
            { title: 'Allocations', url: '#' },
            { title: 'Chart of Accounts', url: '#' },
            { title: 'Subaccounts', url: '#' },
          ],
        },
      ],
    },
    // {
    //   title: 'Inventory Planning',
    //   url: '#',
    //   icon: FileBoxIcon,
    //   actions: [],
    //   groups: [
    //     {
    //       label: 'Setup',
    //       items: [
    //         { title: 'Genesis Config', url: '#' },
    //         { title: 'Explorer Options', url: '#' },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Time and Expenses',
    //   url: '#',
    //   icon: Timer,
    //   actions: [],
    //   groups: [
    //     {
    //       label: 'Setup',
    //       items: [
    //         { title: 'Genesis Config', url: '#' },
    //         { title: 'Explorer Options', url: '#' },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Finance',
    //   url: '#',
    //   icon: Calculator,
    //   actions: [],
    //   groups: [
    //     {
    //       label: 'Setup',
    //       items: [
    //         { title: 'Genesis Config', url: '#' },
    //         { title: 'Explorer Options', url: '#' },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Banking',
    //   url: '#',
    //   icon: Banknote,
    //   actions: [],
    //   groups: [
    //     {
    //       label: 'Setup',
    //       items: [
    //         { title: 'Genesis Config', url: '#' },
    //         { title: 'Explorer Options', url: '#' },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Receivables',
    //   url: '#',
    //   icon: HandCoins,
    //   actions: [],
    //   groups: [
    //     {
    //       label: 'Setup',
    //       items: [
    //         { title: 'Genesis Config', url: '#' },
    //         { title: 'Explorer Options', url: '#' },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Payables',
    //   url: '#',
    //   icon: FileBoxIcon,
    //   actions: [],
    //   groups: [
    //     {
    //       label: 'Setup',
    //       items: [
    //         { title: 'Genesis Config', url: '#' },
    //         { title: 'Explorer Options', url: '#' },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Sales Order',
    //   url: '#',
    //   icon: FileBoxIcon,
    //   actions: [],
    //   groups: [
    //     {
    //       label: 'Setup',
    //       items: [
    //         { title: 'Genesis Config', url: '#' },
    //         { title: 'Explorer Options', url: '#' },
    //       ],
    //     },
    //   ],
    // },
    {
      title: 'Dashboards',
      url: '#',
      icon: ChartColumnBig,
      actions: [],
      groups: [
        {
          seq_no: 1,
          label: 'Setup',
          items: [
            { title: 'Genesis Config', url: '#' },
            { title: 'Explorer Options', url: '#' },
          ],
        },
      ],
    },
  ],
}
