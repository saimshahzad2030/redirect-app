"use client"
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
const RedirectToDefaultBrowser = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobileDevice = /Mobi/i.test(userAgent);
        
        if (isMobileDevice) {
            const targetUrl = "https://www.yourwebsite.com" + router.asPath;
            const isDefaultBrowser = isDefaultMobileBrowser();

            if (!isDefaultBrowser) {
                redirectToDefaultBrowser(targetUrl);
            } else {
                window.location.href = targetUrl;
            }
        } else {
            window.location.href = "https://www.yourwebsite.com";
        }

        setLoading(false);
    }, [router]);

    const isDefaultMobileBrowser = () => {
        const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
        const isAndroidBrowser = navigator.userAgent.includes('Android') && navigator.userAgent.includes('Version');
        
        return isSafari || isAndroidBrowser;
    };

    const redirectToDefaultBrowser = (url) => {
        window.location.href = url;
    };

    if (loading) {
        return <p>Redirecting, please wait...</p>;
    }

    return null;
};

export default RedirectToDefaultBrowser;