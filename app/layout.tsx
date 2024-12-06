import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';

// Background components with mobile-optimized loading
const BackgroundWebs = dynamic(() => import("./components/BackgroundWebs"), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#0a0a0a]" />
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

function isMobile(userAgent: string) {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const mobile = isMobile(userAgent);

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1" />
      </head>
      <body className={`${inter.className} bg-[#0a0a0a] text-[#ededed]`}>
        <div className="relative min-h-screen">
          {/* Background Effects Layer */}
          <div className="fixed inset-0 z-0">
            <BackgroundWebs />
            <AnimatedLines />
            <CornerWeb />
            <WebEffect />
          </div>

          {/* Floating Icons Layer */}
          <FloatingIcons />

          {/* Content Layer */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
