import { motion, useTransform } from 'framer-motion'
import { ArrowRight, Award, Diamond, Gem, Play, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { craft } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { EASE, useUI } from '../lib/ui'

const icons = [Sparkles, Gem, Diamond, Award]

/** The art behind every piece: the bench, then what it stands for. */
export function Craft() {
  const { open } = useUI()
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start end', 'end start'])
  const imgScale = useTransform(p, [0, 1], [1.14, 1])

  return (
    <section id="craft" ref={ref} className="relative border-t border-line bg-night">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Bench */}
        <div className="relative min-h-[320px] overflow-hidden bg-ash lg:min-h-[640px]">
          <motion.div className="absolute inset-0" style={motionOK ? { scale: imgScale } : undefined}>
            <Img photo={craft.photo} sizes="(min-width: 1024px) 46vw, 100vw" widths={[640, 1024, 1440]} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-night/45 to-transparent" />
          <button
            type="button"
            onClick={() => open({ kind: 'booking', subject: 'Our craft' })}
            aria-label="Watch the atelier film"
            className="group absolute top-1/2 left-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-ivory/50 bg-night/30 text-ivory backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            <Play className="ml-1 h-5 w-5 fill-current" strokeWidth={1} />
            <span className="absolute inset-0 rounded-full border border-gold/40" style={{ animation: 'soft-ping 3.2s ease-out infinite' }} />
          </button>
        </div>

        {/* Copy + principles */}
        <div className="grid gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:px-12 lg:py-20">
          <div>
            <p className="eyebrow mb-5">The art behind every piece</p>
            <SplitLines className="display text-[clamp(2.1rem,4vw,3.2rem)] uppercase" lines={['Crafted', 'to Perfection']} />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[400px] text-[14.5px] leading-[1.8] text-mist">
                Our master artisans combine traditional techniques with modern innovation to create exceptional pieces that last for generations.
              </p>
              <button type="button" onClick={() => open({ kind: 'booking', subject: 'Our craft' })} className="btn-gold group mt-8">
                Discover Our Craft
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
              </button>
            </Reveal>
          </div>

          <ul className="min-w-0 space-y-6">
            {craft.features.map((f, i) => {
              const Icon = icons[i]
              return (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="flex items-start gap-4 border-b border-line pb-5 last:border-0 last:pb-0"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-gold">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.3} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-medium text-ivory">{f.title}</span>
                    <span className="mt-1 block text-[12.5px] leading-relaxed text-mist">{f.text}</span>
                  </span>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
