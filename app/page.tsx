import { headers } from 'next/headers';
import DesktopPage from './desktop-page';
import MobilePage from './mobile-page';

function isMobile(userAgent: string) {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

export default function Home() {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const mobile = isMobile(userAgent);

  return mobile ? <MobilePage /> : <DesktopPage />;
}
