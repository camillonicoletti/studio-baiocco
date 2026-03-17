'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setOpacity(0), 1500);
    const t2 = setTimeout(() => setVisible(false), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: '#0a1628',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity,
      transition: 'opacity 0.8s ease',
      pointerEvents: 'none',
    }}>
      <Image
        src="/img/logo/LOGO.png"
        alt="Studio Romana Baiocco"
        width={220}
        height={110}
        priority
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}