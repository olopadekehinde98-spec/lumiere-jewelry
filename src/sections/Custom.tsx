import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { customSteps } from '../data/content'
import { EASE, useUI } from '../lib/ui'

/** Four steps from an idea to a finished piece. */
export function Custom() {
  const { open } = useUI()

  return (
    <section id="custom" className="relative border-t border-line bg-night py-20 md:py-24">
      <div className="frame grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:items-center">
        <div>
          <p className="eyebrow mb-5">Custom jewelry</p>
          <SplitLines className="display text-[clamp(2rem,4.2vw,3.4rem)] uppercase" lines={['Create', 'Your Unique Piece']} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[330px] text-[14.5px] leading-[1.8] text-mist">
              Work with our designers to bring your vision to life. From concept to creation, we’ll craft a piece that’s uniquely yours.
            </p>
            <button type="button" onClick={() => open({ kind: 'booking', subject: 'Custom design' })} className="btn-gold group mt-8">
              Start a Custom Design
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </button>
          </Reveal>
        </div>

        <ol className="no-scrollbar min-w-0 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {customSteps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: EASE }}
              className="w-[68vw] shrink-0 snap-center sm:w-[40vw] lg:w-auto"
            >
              <div className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-ash">
                  <Img
                    photo={s.photo}
                    sizes="(min-width: 1024px) 22vw, 68vw"
                    widths={[360, 640, 960]}
                    className="transition-transform duration-[1400ms] ease-cine group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
                </div>
                <div className="mt-4 flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/60 text-[11px] text-gold">{s.n}</span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] text-ivory">{s.title}</span>
                    <span className="mt-1 block text-[12.5px] leading-relaxed text-mist">{s.text}</span>
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
