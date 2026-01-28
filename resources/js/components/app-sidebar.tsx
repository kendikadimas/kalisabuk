import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { 
    FileText, 
    Building2, 
    LayoutGrid, 
    BookOpen, 
    Folder, 
    Building, 
    Tag, 
    PieChart, 
    Users,
    Megaphone,
    UserCheck
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Konten',
        url: '#',
        icon: BookOpen,
        items: [
            {
                title: 'Berita & Artikel',
                url: '/dashboard/posts',
                icon: FileText,
            },
            {
                title: 'Potensi Desa',
                url: '/dashboard/potentials',
                icon: Folder,
            },
            {
                title: 'Pengumuman',
                url: '/dashboard/announcements',
                icon: Megaphone,
            },
        ],
    },
    {
        title: 'Infrastruktur',
        url: '#',
        icon: Building2,
        items: [
            {
                title: 'Lembaga Desa',
                url: '/dashboard/institutions',
                icon: Building2,
            },
            {
                title: 'Pembangunan',
                url: '/dashboard/developments',
                icon: Building,
            },
        ],
    },
    {
        title: 'Layanan Desa',
        url: '/dashboard/services',
        icon: Tag,
    },
    {
        title: 'Statistik Desa',
        url: '/dashboard/village-stats',
        icon: PieChart,
    },
    {
        title: 'Perangkat Desa',
        url: '/dashboard/village-officials',
        icon: UserCheck,
    },
    {
        title: 'Manajemen User',
        url: '/dashboard/users',
        icon: Users,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
