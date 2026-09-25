import { AnimatePresence, motion, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Img } from '../components/Img'
import { SplitLines } from '../components/SplitLines'
import { heroChapters, heroSlides } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { EASE, goTo, useUI } from '../lib/ui'

const DWELL = 7000
/** Fixed sparkle positions so the hero twinkles without re-randomising on every render. */
const SPARKS = [
  { x: 58, y: 28, d: 0 },
  { x: 71, y: 46, d: 1.1 },
  { x: 64, y: 62, d: 2.2 },
  { x: 80, y: 33, d: 0.6 },
  { x: 52, y: 52, d: 1.7 },
]

export function Hero() {
  const { open } = useUI()
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start start', 'end start'])
  const [i, setI] = useState(0)

  const bgScale = useTransform(p, [0, 1], [1, 1.12])
  const fade = useTransform(p, [0, 0.75], [1, 0])

  useEffect(() => {
    if (!motionOK) return
    const t = window.setTimeout(() => setI((v) => (v + 1) % heroSlides.length), DWELL)
    return () => window.clearTimeout(t)
  }, [i, motionOK])

  const slide = heroSlides[i]

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[720px] flex-col justify-end overflow-hidden bg-night h-[100svh]">
      {/* The piece itself, slowly drawn closer */}
      <motion.div className="absolute inset-0 -z-20" style={motionOK ? { scale: bgScale } : undefined}>
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6 }, scale: { duration: 9, ease: 'linear' } }}
          >
            <Img photo={slide.photo} priority={i === 0} widths={[828, 1280, 1600]} className="object-[62%_50%]" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/70 to-night/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-transparent to-night/40" />

      {/* Light catching the facets */}
      {motionOK && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {SPARKS.map((s) => (
            <span
              key={`${s.x}-${s.y}`}
              className="absolute h-1.5 w-1.5 rounded-full bg-gold-light"
              style={{ left: `${s.x}%`, top: `${s.y}%`, animation: `twinkle 3.4s ease-in-out ${s.d}s infinite` }}
            />
          ))}
        </div>
      )}

      <motion.div className="frame relative flex-1 pt-32 pb-10" style={motionOK ? { opacity: fade } : undefined}>
        <div className="flex h-full max-w-[600px] flex-col justify-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="eyebrow mb-6">
            A world of timeless beauty
          </motion.p>

          <SplitLines
            as="h1"
            play
            delay={0.15}
            stagger={0.12}
            className="display text-[clamp(2.8rem,7.4vw,6rem)] uppercase"
            lines={['More', 'Than', 'Jewelry']}
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
            className="mt-7 max-w-[420px] text-[15px] leading-[1.75] text-ivory/75"
          >
            Exceptional craftsmanship. Rare materials. Pieces that tell your story.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <button type="button" onClick={() => goTo('collections')} className="btn-gold group">
              Explore the Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </button>
            <button type="button" onClick={() => open({ kind: 'booking', subject: 'Our story' })} className="group flex items-center gap-3.5 text-left text-[13px] text-ivory">
              <span className="relative grid h-11 w-11 place-items-center rounded-full border border-ivory/35 transition-colors duration-300 group-hover:border-gold group-hover:text-gold">
                <Play className="ml-0.5 h-4 w-4 fill-current" strokeWidth={1} />
                <span className="absolute inset-0 rounded-full border border-gold/40" style={{ animation: 'soft-ping 3s ease-out infinite' }} />
              </span>
              <span>
                <span className="block">Watch Our Story</span>
                <span className="block text-[11px] text-mist">1:28</span>
              </span>
            </button>
          </motion.div>
        </div>

        {/* Chapter index */}
        <motion.ol
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.15, duration: 0.9, ease: EASE }}
          className="absolute top-1/2 right-0 hidden w-[190px] -translate-y-1/2 flex-col gap-7 border-l border-line pl-6 lg:flex"
        >
          {heroChapters.map((c) => (
            <li key={c.n}>
              <a href={c.href} className="group block">
                <span className="block text-[13px] tracking-[0.18em] text-ivory/85 transition-colors group-hover:text-gold">{c.n}</span>
                <span className="mt-1 block text-[12px] leading-snug text-mist transition-colors group-hover:text-ivory">{c.label}</span>
              </a>
            </li>
          ))}
        </motion.ol>
      </motion.div>

      {/* Slide counter + scroll cue */}
      <div className="frame relative flex items-end justify-between pb-8">
        <div className="flex items-center gap-4">
          {heroSlides.map((s, k) => (
            <button key={s.piece} type="button" onClick={() => setI(k)} aria-label={`Show ${s.piece}`} className="group flex items-center gap-3 py-2.5">
              <span className={`text-[12px] tracking-[0.18em] transition-colors ${k === i ? 'text-ivory' : 'text-ivory/40 group-hover:text-ivory/70'}`}>
                0{k + 1}
              </span>
              <span className="relative block h-px w-10 bg-ivory/25 sm:w-14">
                {k === i && (
                  <motion.span
                    key={`bar-${i}`}
                    className="absolute inset-y-0 left-0 bg-gold"
                    initial={{ width: motionOK ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: motionOK ? DWELL / 1000 : 0, ease: 'linear' }}
                  />
                )}
              </span>
            </button>
          ))}
          <AnimatePresence mode="wait">
            <motion.span
              key={slide.piece}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="ml-3 hidden text-[11.5px] tracking-[0.16em] text-mist uppercase sm:block"
            >
              {slide.piece} · {slide.detail}
            </motion.span>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => goTo('collections')}
          aria-label="Scroll to collections"
          className="grid h-11 w-11 place-items-center rounded-full border border-ivory/30 text-ivory transition-colors hover:border-gold hover:text-gold"
        >
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  )
}
