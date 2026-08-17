import type { SidebarData } from '@/types'
import {
  AudioWaveform,
  ChartColumnBig,
  Command,
  DatabaseSearch,
  GalleryVerticalEnd,
  SearchIcon
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
      icon: DatabaseSearch,
      isActive: false,
      actions: [
        {
          title: 'Part no. Search',
          icon: SearchIcon,
          url: '/sourcenet2/part-search',
        },
      ],
      groups: [
        {
          seq_no: 1,
          label: 'Enquiry',
          items: [
            { seq_no: 1, title: 'Enquiry Parts', url: '#' },
            { seq_no: 2, title: 'Enquiry Query', url: '#' },
          ],
        },
        {
          seq_no: 2,
          label: 'Quotations',
          items: [
            { seq_no: 1, title: 'Quotation Parts', url: '/sourcenet2/quotation' },
            { seq_no: 2, title: 'Quotation General', url: '#' },
            { seq_no: 3, title: 'Quotation Service', url: '#' },
            { seq_no: 4, title: 'Quotation Query', url: '#' },
          ],
        },
        {
          seq_no: 3,
          label: 'Invoices',
          items: [
            { seq_no: 1, title: 'Invoice Parts', url: '#' },
            { seq_no: 2, title: 'Invoice General', url: '#' },
            { seq_no: 3, title: 'Invoice Service', url: '#' },
          ],
        },
        {
          seq_no: 4,
          label: 'Lost Sales',
          items: [
            { seq_no: 1, title: 'Lost Sale Entry', url: '#' },
            { seq_no: 2, title: 'Lost Sale Modify', url: '#' },
            { seq_no: 3, title: 'Lost Sale Query', url: '#' },
            { seq_no: 4, title: 'Lost Sale HO Feedback', url: '#' },
            // { title: 'Balance Sheet EU Consolidation', url: '#' },
          ],
        },
        {
          seq_no: 5,
          label: 'Transfer',
          items: [
            { seq_no: 1, title: 'Request for Parts', url: '#' },
            { seq_no: 2, title: 'Transfer Stock Update', url: '#' },
            { seq_no: 3, title: 'Transfer Query', url: '#' },
          ],
        },
        {
          seq_no: 6,
          label: 'Utilities',
          items: [
            { seq_no: 1, title: 'Convert', url: '#' },
            { seq_no: 2, title: 'Import Data to Quotation', url: '#' },
          ],
        },
        {
          seq_no: 7,
          label: 'Stock Transaction List',
          items: [
            { seq_no: 1, title: 'Transaction List', url: '#' },
          ],
        },
        {
          seq_no: 8,
          label: 'Quick Reference Guide',
          items: [
            { seq_no: 1, title: 'Part Sales Kit', url: '#' },
            { seq_no: 2, title: 'Information Bulletin', url: '#' }
          ],
        },
        {
          seq_no: 9,
          label: 'Options',
          items: [
            { seq_no: 1, title: 'Bin Locations', url: '#' },
            { seq_no: 2, title: 'Daily Sales Report (DSR) Update', url: '#' },
            { seq_no: 3, title: 'Price and Availability (P & A)', url: '#' },
            { seq_no: 4, title: 'P & A to Order', url: '#' },
            { seq_no: 5, title: 'Web to Quote', url: '#' },
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
            { seq_no: 1, title: 'Genesis Config', url: '#' },
            { seq_no: 2, title: 'Explorer Options', url: '#' },
          ],
        },
      ],
    },
  ],
}
