import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LINKS = [
  { href: '/',          label: 'Home',     icon: '⌂'  },
  { href: '/news',      label: 'News',     icon: '📰' },
  { href: '/heatmap',   label: 'Map',      icon: '🟩' },
  { href: '/screener',  label: 'Screener', icon: '📊' },
];

export default function NavBar() {
  const router = useRouter();
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = typeof window !== 'undefined'
      ? localStorage.getItem('sp-theme') || 'dark'
      : 'dark';
    setDark(saved === 'dark');
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    setDark(!dark);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('sp-theme', next);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b"
      style={{ background: 'var(--c-surface)', borderColor: 'var(--c-border)' }}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 h-14 flex items-center gap-6">

        {/* Logo */}
        <Link href="/" className="font-syne font-extrabold text-lg tracking-tight flex items-center gap-2 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(0,229,160,0.5)]" />
          <span style={{ color: 'var(--c-ink)' }}>Stock</span>
          <span className="text-accent">Pulse</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {LINKS.map(({ href, label, icon }) => {
            const active = router.pathname === href;
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-syne font-bold transition-all ${
                  active
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted hover:text-ink hover:bg-surface2'
                }`}>
                <span>{icon}</span>{label}
              </Link>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Theme toggle */}
        <button
          onClick={toggle}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-syne font-bold
                     text-muted hover:text-ink transition-all"
          style={{ borderColor: 'var(--c-border)' }}
        >
          <span className="text-base">{dark ? '☀️' : '🌙'}</span>
          <span className="hidden sm:block">{dark ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </nav>
  );
}
