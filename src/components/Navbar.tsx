import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { brand, navLinks } from '../data/content'
import { EASE, useUI } from '../lib/ui'

export function Logo({ className = '', size = 'sm' }: { className?: string; size?: 'sm' | 'lg' }) {
  const big = size === 'lg'
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 32 32" className={`${big ? 'h-10 w-10' : 'h-8 w-8'} text-gold`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M16 28L4 13l4-7h16l4 7z" strokeLinejoin="round" />
        <path d="M4 13h24M11 6l5 22 5-22" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-serif ${big ? 'text-[1.8rem]' : 'text-[1.35rem]'} font-medium tracking-[0.18em] text-ivory`}>{brand.name}</span>
        <span className={`${big ? 'mt-1.5' : 'mt-1'} text-[9px] tracking-[0.34em] text-mist`}>{brand.sub}</span>
      </span>
    </span>
  )
}

export function Navbar() {
  const { open } = useUI()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('#top')

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
    const probe = y + window.innerHeight * 0.4
    let best = -1
    let cur = '#top'
    for (const l of navLinks) {
      const el = document.querySelector<HTMLElement>(l.href)
      if (el && el.offsetTop <= probe && el.offsetTop > best) {
        best = el.offsetTop
        cur = l.href
      }
    }
    setActive(cur)
  })

  useEffect(() => {
    if (!menu) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menu])

  const icons = [
    { Icon: Search, label: 'Search jewelry', action: () => open({ kind: 'search' }), always: true },
    { Icon: User, label: 'Your account', action: () => open({ kind: 'booking' }), always: false },
    { Icon: Heart, label: 'Wishlist', action: () => open({ kind: 'booking', subject: 'Wishlist' }), always: false },
    { Icon: ShoppingBag, label: 'Shopping bag', action: () => open({ kind: 'booking', subject: 'Shopping bag' }), always: false },
  ]

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ${
          scrolled ? 'border-b border-line bg-night/88 py-3 backdrop-blur-xl' : 'border-b border-transparent py-5'
        }`}
      >
        <nav aria-label="Main" className="frame flex items-center justify-between gap-4">
          <a href="#top" aria-label={`${brand.name} ${brand.sub} — home`}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 xl:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={`relative py-2.5 text-[13px] transition-colors duration-300 ${active === l.href ? 'text-ivory' : 'text-ivory/65 hover:text-ivory'}`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ${
                      active === l.href ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-0.5 sm:gap-1.5">
            {icons.map(({ Icon, label, action, always }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                aria-label={label}
                className={`${always ? 'grid' : 'hidden sm:grid'} h-10 w-10 place-items-center text-ivory/80 transition-colors hover:text-gold`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.4} />
              </button>
            ))}
            <span className="mx-2 hidden h-5 w-px bg-line sm:block" />
            <button type="button" onClick={() => open({ kind: 'booking' })} className="btn-gold group ml-1 hidden px-5 py-2.5 text-[11.5px] sm:inline-flex">
              Book a Consultation
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className="grid h-11 w-11 shrink-0 place-items-center text-ivory xl:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.3} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[80] flex flex-col bg-night xl:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="frame flex items-center justify-between py-5">
              <Logo />
              <button type="button" onClick={() => setMenu(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center" autoFocus>
                <X className="h-6 w-6" strokeWidth={1.3} />
              </button>
            </div>
            <ul className="frame flex flex-1 flex-col justify-center">
              {navLinks.map((l, i) => (
                <li key={l.label} className="border-b border-line">
                  <motion.a
                    href={l.href}
                    onClick={() => setMenu(false)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.5, ease: EASE }}
                    className="flex items-baseline justify-between py-4 font-serif text-[2rem] font-light"
                  >
                    {l.label}
                    <span className="text-[11px] tracking-[0.3em] text-gold">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="frame pb-10">
              <button
                type="button"
                onClick={() => {
                  setMenu(false)
                  open({ kind: 'booking' })
                }}
                className="btn-gold w-full justify-center py-4"
              >
                Book a Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
