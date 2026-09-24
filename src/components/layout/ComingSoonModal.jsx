'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Bell, CheckCircle2 } from 'lucide-react';
import { useMahreenStore } from '@/store/useMahreenStore';

export default function ComingSoonModal({ isOpen, onClose, featureName = 'Mentorship Hub' }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const showToast = useMahreenStore((state) => state.showToast);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Masukkan alamat email yang valid', 'info');
      return;
    }
    setSubscribed(true);
    showToast(`Terima kasih! Notifikasi ${featureName} akan dikirim ke ${email}`, 'success');
  };

  const featureDetails = {
    'Mentorship Hub': {
      desc: 'Platform pencocokan 1-on-1 dengan 150+ praktisi teknologi, pengusaha UMKM senior, desainer grafis, dan pembuat kebijakan publik untuk membimbing proyek karyamu.',
      timeline: 'Q4 2026 (Fase 3)',
      highlights: ['Sesi privat bimbingan karir', 'Review portofolio karya', 'Akses koneksi industri'],
    },
    'Leaderboard Nasional': {
      desc: 'Papan peringkat kontribusi talenta muda dari 34 provinsi berdasarkan dampak riil di masyarakat dan proyek kolaboratif yang terealisasi.',
      timeline: 'Q4 2026 (Fase 3)',
      highlights: ['Peringkat per provinsi & kampus', 'Kategori Inovator Terinspiratif', 'Hadiah dana hibah karya'],
    },
    'UMKM Sinergi Bangsa': {
      desc: 'Marketplace kolaborasi B2B di mana UMKM daerah memposting kebutuhan solusi digital mereka, dan tim talenta muda mengajukan proposal karya gotong-royong.',
      timeline: 'Q3 2026 (Fase 2)',
      highlights: ['Brief tantangan nyata UMKM', 'Kontrak karya terstandar', 'Pendampingan inkubator'],
    },
  };

  const current = featureDetails[featureName] || {
    desc: 'Fitur inovatif ekosistem digital Mahreen yang sedang dalam tahap perancangan dan riset bersama komunitas.',
    timeline: 'Dalam Pengembangan',
    highlights: ['Integrasi ekosistem nasional', 'Pengalaman terpersonalisasi'],
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSubscribed(false);
        onClose();
      }}
      title={
        <div className="flex items-center gap-2.5">
          <span>{featureName}</span>
          <Badge variant="amber" size="sm">Coming Soon</Badge>
        </div>
      }
      subtitle={`Target Rilis: ${current.timeline}`}
      maxWidth="max-w-lg"
    >
      <div className="space-y-5">
        <p className="text-sm sm:text-base text-nusantara-charcoalMuted leading-relaxed">
          {current.desc}
        </p>

        <div className="p-4 rounded-2xl bg-ivory-100/80 border border-ivory-200">
          <h5 className="text-xs font-bold uppercase tracking-wider text-terracotta-700 mb-2.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Fitur Utama yang Sedang Disiapkan:
          </h5>
          <ul className="space-y-1.5 text-xs sm:text-sm text-nusantara-charcoal">
            {current.highlights.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {subscribed ? (
          <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            <span>Kamu terdaftar! Kami akan mengirimkan undangan beta saat fitur siap diuji coba.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3">
            <label className="block text-xs font-semibold text-nusantara-charcoal">
              Dapatkan Akses Awal (Early Access)
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-300 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-nusantara-charcoal"
              />
              <Button type="submit" variant="primary" size="sm" leftIcon={<Bell className="w-3.5 h-3.5" />}>
                Kabari Saya
              </Button>
            </div>
            <p className="text-[11px] text-nusantara-charcoalMuted">
              Tanpa spam. Hanya pembaruan rilis dan undangan eksklusif.
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
}
