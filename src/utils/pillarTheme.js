/**
 * Utility helper untuk styling 6 Pilar Ekosistem Gerakan Mahreen Nusantara
 * Bersih, natural, tanpa efek gradien berlebihan
 */

export const PILLAR_THEMES = {
  kreativitas: {
    id: 'kreativitas',
    name: 'Kreativitas & Seni Budaya',
    shortName: 'Kreativitas',
    colorName: 'terracotta',
    badgeVariant: 'terracotta',
    accentText: 'text-terracotta-700',
    borderHover: 'hover:border-terracotta-400',
    cardBg: 'bg-orange-50/25 hover:bg-orange-50/50 border-orange-200/80',
    iconBg: 'bg-orange-100/80 text-terracotta-800 border-orange-200',
    headline: 'Revitalisasi kriya tradisi, wastra, dan ekspresi budaya ke panggung modern.',
  },
  teknologi: {
    id: 'teknologi',
    name: 'Teknologi Digital & Rekayasa',
    shortName: 'Teknologi',
    colorName: 'emerald',
    badgeVariant: 'emerald',
    accentText: 'text-emerald-700',
    borderHover: 'hover:border-emerald-400',
    cardBg: 'bg-emerald-50/25 hover:bg-emerald-50/50 border-emerald-200/80',
    iconBg: 'bg-emerald-100/80 text-emerald-800 border-emerald-200',
    headline: 'Rekayasa sensor IoT murah dan software tepat guna untuk pelosok negeri.',
  },
  talenta: {
    id: 'talenta',
    name: 'Pengembangan Talenta Muda',
    shortName: 'Talenta',
    colorName: 'indigo',
    badgeVariant: 'indigo',
    accentText: 'text-blue-700',
    borderHover: 'hover:border-blue-400',
    cardBg: 'bg-blue-50/25 hover:bg-blue-50/50 border-blue-200/80',
    iconBg: 'bg-blue-100/80 text-blue-800 border-blue-200',
    headline: 'Jalur fellowship, kepemimpinan publik, dan bimbingan praktisi industri.',
  },
  bisnis: {
    id: 'bisnis',
    name: 'Bisnis & Kemandirian UMKM',
    shortName: 'Bisnis & UMKM',
    colorName: 'amber',
    badgeVariant: 'amber',
    accentText: 'text-amber-800',
    borderHover: 'hover:border-amber-400',
    cardBg: 'bg-amber-50/25 hover:bg-amber-50/50 border-amber-200/80',
    iconBg: 'bg-amber-100/80 text-amber-900 border-amber-200',
    headline: 'Modernisasi usaha rakyat, kemasan produk lokal, dan akses pasar nasional.',
  },
  komunitas: {
    id: 'komunitas',
    name: 'Jejaring Komunitas & Kolaborasi',
    shortName: 'Komunitas',
    colorName: 'purple',
    badgeVariant: 'purple',
    accentText: 'text-purple-700',
    borderHover: 'hover:border-purple-400',
    cardBg: 'bg-purple-50/25 hover:bg-purple-50/50 border-purple-200/80',
    iconBg: 'bg-purple-100/80 text-purple-800 border-purple-200',
    headline: 'Menyatukan simpul gerakan mahasiswa, karang taruna, dan kolektif seni.',
  },
  sosial: {
    id: 'sosial',
    name: 'Kontribusi Sosial & Pengabdian',
    shortName: 'Sosial & 3T',
    colorName: 'rose',
    badgeVariant: 'rose',
    accentText: 'text-rose-700',
    borderHover: 'hover:border-rose-400',
    cardBg: 'bg-rose-50/25 hover:bg-rose-50/50 border-rose-200/80',
    iconBg: 'bg-rose-100/80 text-rose-800 border-rose-200',
    headline: 'Aksi relawan kemanusiaan, literasi maritim, dan kelestarian mata air.',
  },
};

export function getPillarTheme(pillarId) {
  return PILLAR_THEMES[pillarId] || PILLAR_THEMES.kreativitas;
}
