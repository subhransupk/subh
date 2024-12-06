import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import heavy components with loading fallbacks
const BackgroundWebs = dynamic(() => import("./components/BackgroundWebs"), { 
  ssr: false,
  loading: () => null
});
const AnimatedLines = dynamic(() => import("./components/AnimatedLines"), { 
  ssr: false,
  loading: () => null
});
const CornerWeb = dynamic(() => import("./components/CornerWeb"), { 
  ssr: false,
  loading: () => null
});
const WebEffect = dynamic(() => import("./components/WebEffect"), { 
  ssr: false,
  loading: () => null
});
const FloatingIcons = dynamic(() => import("./components/FloatingIcons"), { 
  ssr: false,
  loading: () => null
});

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Subhransu | Portfolio",
  description: "Portfolio website of Subhransu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.className} bg-[#0a0a0a] text-[#ededed] overflow-x-hidden`}>
        {/* Content first to ensure it's visible */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Background effects loaded after content */}
        <Suspense fallback={null}>
          <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
            <BackgroundWebs />
            <AnimatedLines />
            <CornerWeb />
            <WebEffect />
            <FloatingIcons />
          </div>
        </Suspense>
      </body>
    </html>
  );
}
