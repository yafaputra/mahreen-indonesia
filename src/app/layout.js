import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UnlockModal from '@/components/dashboard/UnlockModal';
import Toast from '@/components/layout/Toast';
import ScrollProgressRibbon from '@/components/motion/ScrollProgressRibbon';

export const metadata = {
  title: 'MAHREEN OS — Ekosistem Digital Berkarya untuk Indonesia',
  description:
    'Platform ekosistem digital karya anak muda Indonesia menghubungkan talenta, UMKM daerah, komunitas, dan pemerintah dalam gerakan kolaboratif berkelanjutan.',
  keywords: [
    'Mahreen Indonesia',
    'Berkarya untuk Indonesia',
    'Ekosistem Pemuda',
    'UMKM Digital',
    'Talenta Muda',
    'Gerakan Kolaborasi',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans relative">
        <ScrollProgressRibbon />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <UnlockModal />
        <Toast />
      </body>
    </html>
  );
}
