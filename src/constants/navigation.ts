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
      ],
      groups: [
        {
          seq_no: 1,
          label: 'Enquiry',
          items: [
            { title: 'Enquiry Parts', url: '#' },
            { title: 'Enquiry Query', url: '#' },
            // { title: 'Journal Entry Voucher', url: '#' },
          ],
        },
        {
          seq_no: 2,
          label: 'Quotations',
          items: [
            { title: 'Quotation Parts', url: '#' },
            { title: 'Quotation General', url: '#' },
            { title: 'Quotation Service', url: '#' },
            { title: 'Quotation Query', url: '#' },
          ],
        },
        {
          seq_no: 3,
          label: 'Invoices',
          items: [
            { title: 'Invoice Parts', url: '#' },
            { title: 'Invoice General', url: '#' },
            { title: 'Invoice Service', url: '#' },
          ],
        },
        {
          seq_no: 4,
          label: 'Lost Sales',
          items: [
            { title: 'Lost Sale Entry', url: '#' },
            { title: 'Lost Sale Modify', url: '#' },
            { title: 'Lost Sale Query', url: '#' },
            { title: 'Lost Sale HO Feedback', url: '#' },
            // { title: 'Balance Sheet EU Consolidation', url: '#' },
          ],
        },
        {
          seq_no: 5,
          label: 'Transfer',
          items: [
            { title: 'Request for Parts', url: '#' },
            { title: 'Transfer Stock Update', url: '#' },
            { title: 'Transfer Query', url: '#' },
          ],
        },
        {
          seq_no: 6,
          label: 'Utilities',
          items: [
            { title: 'Convert', url: '#' },
            { title: 'Import Data to Quotation', url: '#' },
          ],
        },
        {
          seq_no: 7,
          label: 'Stock Transaction List',
          items: [
            { title: 'Transaction List', url: '#' },
          ],
        },
        {
          seq_no: 8,
          label: 'Quick Reference Guide',
          items: [
            { title: 'Part Sales Kit', url: '#' },
            { title: 'Information Bulletin', url: '#' }
          ],
        },
        {
          seq_no: 9,
          label: 'Options',
          items: [
            { title: 'Bin Locations', url: '#' },
            { title: 'Daily Sales Report (DSR) Update', url: '#' },
            { title: 'Price and Availability (P & A)', url: '#' },
            { title: 'P & A to Order', url: '#' },
            { title: 'Web to Quote', url: '#' },
          ],
        },
      ],
    },
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
