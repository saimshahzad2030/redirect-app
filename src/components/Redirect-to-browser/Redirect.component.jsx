 "use client"
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';

const RedirectToBrowser = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    const isAndroid = /Android/i.test(userAgent);
    const isiOS = /iPhone|iPad|iPod/i.test(userAgent);

    const targetUrl = "https://www.inappsolutions.com/" + router.asPath;

    if (isAndroid) {
      window.location.href = `intent://${targetUrl.replace('https://', '')}#Intent;scheme=https;package=com.android.chrome;end`;
    } else if (isiOS) {
      window.location.href = targetUrl;
    }
    else{
        setLoading(false);
        router.push("https://www.inappsolutions.com/");
    }
  }, [router]);

  if (loading) {
    return <p>Redirecting, please wait...</p>;
  }

  return null;
};

export default RedirectToBrowser;
