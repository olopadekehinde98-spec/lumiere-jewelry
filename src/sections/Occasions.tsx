import { motion, useTransform } from 'framer-motion'
import { ArrowRight, CalendarHeart, Gem, Gift, Heart } from 'lucide-react'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { occasions } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { EASE, useUI } from '../lib/ui'

const icons = [Gem, Heart, CalendarHeart, Gift]

/** Jewelry for life's moments — the closing band. */
export function Occasions() {
  const { open } = useUI()
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start end', 'end start'])
  const y = useTransform(p, [0, 1], ['-8%', '8%'])
  const scale = useTransform(p, [0, 1], [1.14, 1])

  return (
    <section ref={ref} className="relative isolate flex min-h-[560px] items-center overflow-hidden border-t border-line bg-night py-20 md:py-24">
      <motion.div className="absolute inset-x-0 -top-[10%] -bottom-[10%] -z-20" style={motionOK ? { y, scale } : undefined}>
        <Img photo={occasions.photo} widths={[828, 1280, 1600]} className="opacity-90" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/75 to-night/25" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/85 to-transparent" />

      <div className="frame relative grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <p className="eyebrow mb-5">For every celebration</p>
          <SplitLines className="display text-[clamp(1.75rem,4.6vw,3.8rem)] uppercase" lines={['Jewelry for', 'Life’s Most Beautiful', 'Moments']} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[430px] text-[15px] leading-[1.8] text-ivory/75">
              Engagements, weddings, anniversaries, or simply because — celebrate every moment with a piece that lasts forever.
            </p>
            <button type="button" onClick={() => open({ kind: 'booking', subject: 'Gifting' })} className="btn-gold group mt-8">
              Find the Perfect Gift
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </button>
          </Reveal>
        </div>

        <ul className="min-w-0 space-y-3">
          {occasions.items.map((o, i) => {
            const Icon = icons[i]
            return (
              <motion.li
                key={o.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => open({ kind: 'booking', subject: o.title })}
                  className="group flex w-full items-center gap-4 border border-line bg-night/70 px-5 py-4 text-left backdrop-blur-sm transition-colors duration-300 hover:border-gold/70"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-gold transition-colors duration-300 group-hover:border-gold">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.3} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] tracking-[0.2em] text-ivory uppercase">{o.title}</span>
                    <span className="mt-1 block text-[12.5px] text-mist">{o.note}</span>
                  </span>
                  <ArrowRight
                    className="ml-auto h-4 w-4 shrink-0 -translate-x-2 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    strokeWidth={1.6}
                  />
                </button>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
