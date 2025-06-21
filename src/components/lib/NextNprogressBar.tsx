'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NextProgressBar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.configure({ showSpinner: true, easing: 'ease' });
    }, []);

    useEffect(() => {
        NProgress.done();
        NProgress.start();
        setTimeout(() => NProgress.done(), 500);
    }, [pathname, searchParams]);

    return <>{children}</>;
}