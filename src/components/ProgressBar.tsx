"use client";

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

function ProgressBarEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        NProgress.done();
    }, [pathname, searchParams]);

    return null;
}

export function ProgressBar() {
    useEffect(() => {
        NProgress.configure({ showSpinner: false });

        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor) {
                const url = new URL(anchor.href, window.location.origin);
                const currentUrl = new URL(window.location.href);

                // Only start progress for internal, non-same-page links
                // that don't open in a new tab.
                if (url.origin === currentUrl.origin && url.href !== currentUrl.href && !anchor.target) {
                    NProgress.start();
                }
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            NProgress.done();
        };
    }, []);

    return (
        <Suspense fallback={null}>
            <ProgressBarEvents />
        </Suspense>
    );
}
