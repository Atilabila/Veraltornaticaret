import { requireAdmin } from '@/lib/auth/requireAdmin';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    try {
        await requireAdmin();
    } catch (error) {
        // Redirect to login page (outside /admin segment to avoid guard loop)
        redirect('/admin-login');
    }

    return (
        <div className="min-h-screen bg-slate-100">
            {children}
        </div>
    );
}
