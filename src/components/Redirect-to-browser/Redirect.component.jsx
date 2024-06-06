"use client"
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';

const RedirectToBrowser = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent  || window.opera;

    const isAndroid = /Android/i.test(userAgent);
    const isiOS = /iPhone|iPad|iPod/i.test(userAgent);

    const targetUrl = "https://www.google.com/" + router.asPath;

    if (isAndroid) {
      window.location.href = `intent://${targetUrl.replace('https://', '')}#Intent;scheme=https;package=com.android.chrome;end`;
    } 
    else if (isiOS) {
        const isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')
         
        if (isSafari) {
            window.location.href = targetUrl;
        } else {
            window.location.href = `https://www.google.com/apple-app-site-association`;
        }
    }
    else{
        setLoading(false);
        router.push("https://www.google.com/");
    }
  }, [router]);

  if (loading) {
    return <p>Redirecting, please wait...</p>;
  }

  return null;
};

export default RedirectToBrowser;