import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';

// Desktop components
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

// Mobile-optimized component
const MobileAnimatedLines = dynamic(() => import("./components/mobile/AnimatedLines"), { 
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
        {/* Content Layer */}
        <div className="relative z-20">
          {children}
        </div>

        {/* Background Effects Layer */}
        <div className="fixed inset-0 z-10">
          {mobile ? (
            // Mobile: Only AnimatedLines with reduced opacity
            <div className="opacity-30">
              <MobileAnimatedLines />
            </div>
          ) : (
            // Desktop: All effects (unchanged)
            <>
              <BackgroundWebs />
              <AnimatedLines />
              <CornerWeb />
              <WebEffect />
              <FloatingIcons />
            </>
          )}
        </div>
      </body>
    </html>
  );
}
