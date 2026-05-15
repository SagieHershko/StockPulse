import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Custom heatmap icon (green + orange overlapping squares)
const HeatmapIcon = ({ size = 15, active }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ display:'inline-block', flexShrink:0 }}>
    <rect x="0" y="0" width="13" height="13" rx="3" fill={active ? '#00e5a0' : '#4a9e7f'} />
    <rect x="7" y="7" width="13" height="13" rx="3" fill={active ? '#ff6535' : '#b84e2a'} />
  </svg>
);

const LINKS = [
  { href: '/',         label: 'Home',     icon: null,  emoji: '⌂'  },
  { href: '/news',     label: 'News',     icon: null,  emoji: '📰' },
  { href: '/heatmap',  label: 'Map',      icon: 'heatmap', emoji: null },
  { href: '/screener', label: 'Screener', icon: null,  emoji: '📊' },
];

function NavIcon({ link, active, size = 15 }) {
  if (link.icon === 'heatmap') return <HeatmapIcon size={size} active={active} />;
  return <span style={{ fontSize: size, lineHeight: 1 }}>{link.emoji}</span>;
}

export default function NavBar() {
  const router = useRouter();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = typeof window !== 'undefined'
      ? localStorage.getItem('sp-theme') || 'dark' : 'dark';
    setDark(saved === 'dark');
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    setDark(!dark);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('sp-theme', next);
  };

  const isActive = (href) => router.pathname === href;

  return (
    <>
      {/* ── Desktop top nav ── */}
      <nav className="hidden md:flex sticky top-0 z-50 w-full border-b h-14 items-center"
        style={{ background:'var(--c-surface)', borderColor:'var(--c-border)' }}>
        <div className="max-w-[1500px] w-full mx-auto px-8 flex items-center gap-6">
          <Link href="/" className="font-syne font-extrabold text-lg tracking-tight flex items-center gap-2.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,229,160,0.5)]" />
            <span style={{ color:'var(--c-ink)' }}>Stock</span>
            <span className="text-accent">Pulse</span>
          </Link>
          <div className="flex items-center gap-1">
            {LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link key={link.href} href={link.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all"
                  style={{ background:active?'rgba(0,229,160,0.1)':'transparent', color:active?'var(--c-accent)':'var(--c-muted)' }}>
                  <NavIcon link={link} active={active} size={14} />
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex-1" />
          <button onClick={toggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-syne font-bold transition-all"
            style={{ borderColor:'var(--c-border)', color:'var(--c-muted)' }}>
            <span className="text-base">{dark ? '☀️' : '🌙'}</span>
            <span className="hidden sm:block">{dark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile top bar ── */}
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 border-b"
        style={{ background:'var(--c-surface)', borderColor:'var(--c-border)', height:52 }}>
        <Link href="/" className="font-syne font-extrabold text-base tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span style={{ color:'var(--c-ink)' }}>Stock</span>
          <span className="text-accent">Pulse</span>
        </Link>
        <button onClick={toggle}
          className="flex items-center justify-center w-9 h-9 rounded-xl border"
          style={{ borderColor:'var(--c-border)', background:'var(--c-surface2)' }}>
          <span className="text-base">{dark ? '☀️' : '🌙'}</span>
        </button>
      </div>

      {/* ── Mobile bottom nav ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t"
        style={{ background:'var(--c-surface)', borderColor:'var(--c-border)', paddingBottom:'env(safe-area-inset-bottom)' }}>
        {LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            <Link key={link.href} href={link.href}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors"
              style={{ color:active?'var(--c-accent)':'var(--c-muted)' }}>
              <NavIcon link={link} active={active} size={20} />
              <span className="text-[10px] font-syne font-bold">{link.label}</span>
              {active && <span className="absolute bottom-0 w-6 h-0.5 rounded-full bg-accent" />}
            </Link>
          );
        })}
      </div>
    </>
  );
}
