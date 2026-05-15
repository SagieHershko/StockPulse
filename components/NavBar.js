import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/',         label: 'Home',     icon: '⌂'  },
  { href: '/news',     label: 'News',     icon: '📰' },
  { href: '/heatmap',  label: 'Map',      icon: '🟩' },
  { href: '/screener', label: 'Screener', icon: '📊' },
];

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
        style={{ background: 'var(--c-surface)', borderColor: 'var(--c-border)' }}>
        <div className="max-w-[1500px] w-full mx-auto px-8 flex items-center gap-6">
          <Link href="/" className="font-syne font-extrabold text-lg tracking-tight flex items-center gap-2.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,229,160,0.5)]" />
            <span style={{ color: 'var(--c-ink)' }}>Stock</span>
            <span className="text-accent">Pulse</span>
          </Link>
          <div className="flex items-center gap-1">
            {LINKS.map(({ href, label, icon }) => (
              <Link key={href} href={href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all"
                style={{ background: isActive(href) ? 'rgba(0,229,160,0.1)' : 'transparent', color: isActive(href) ? 'var(--c-accent)' : 'var(--c-muted)' }}>
                <span>{icon}</span>{label}
              </Link>
            ))}
          </div>
          <div className="flex-1" />
          <button onClick={toggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-syne font-bold text-muted hover:text-ink transition-all"
            style={{ borderColor: 'var(--c-border)' }}>
            <span className="text-base">{dark ? '☀️' : '🌙'}</span>
            <span>{dark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile top bar ── */}
      <div className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 h-13 border-b"
        style={{ background: 'var(--c-surface)', borderColor: 'var(--c-border)', height: 52 }}>
        <Link href="/" className="font-syne font-extrabold text-base tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span style={{ color: 'var(--c-ink)' }}>Stock</span>
          <span className="text-accent">Pulse</span>
        </Link>
        <button onClick={toggle}
          className="flex items-center justify-center w-9 h-9 rounded-xl border"
          style={{ borderColor: 'var(--c-border)', background: 'var(--c-surface2)' }}>
          <span className="text-base">{dark ? '☀️' : '🌙'}</span>
        </button>
      </div>

      {/* ── Mobile bottom nav ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t"
        style={{ background: 'var(--c-surface)', borderColor: 'var(--c-border)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {LINKS.map(({ href, label, icon }) => (
          <Link key={href} href={href}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors"
            style={{ color: isActive(href) ? 'var(--c-accent)' : 'var(--c-muted)' }}>
            <span className="text-xl leading-none">{icon}</span>
            <span className="text-[10px] font-syne font-bold">{label}</span>
            {isActive(href) && (
              <span className="absolute bottom-0 w-6 h-0.5 rounded-full bg-accent" />
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
