import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { materials } from '../data/content'
import { EASE, useUI } from '../lib/ui'

/** Rare materials — the stones themselves, shown close. */
export function Materials() {
  const { open } = useUI()

  return (
    <section id="materials" className="relative border-t border-line bg-coal py-20 md:py-24">
      <div className="frame grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:items-center">
        <div>
          <p className="eyebrow mb-5">Rare materials</p>
          <SplitLines className="display text-[clamp(2rem,4.2vw,3.4rem)] uppercase" lines={['Nature’s', 'Finest Treasures']} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[330px] text-[14.5px] leading-[1.8] text-mist">
              From conflict-free diamonds to rare gemstones, we source the world’s most exquisite materials to create extraordinary jewelry.
            </p>
            <button type="button" onClick={() => open({ kind: 'booking', subject: 'Materials' })} className="btn-gold group mt-8">
              Explore Our Materials
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </button>
          </Reveal>
        </div>

        <ul className="no-scrollbar min-w-0 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {materials.map((m, i) => (
            <motion.li
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="w-[60vw] shrink-0 snap-center sm:w-[36vw] lg:w-auto"
            >
              <button
                type="button"
                onClick={() => open({ kind: 'booking', subject: m.name })}
                className="group relative block aspect-[3/4] w-full overflow-hidden border border-transparent bg-ash text-left transition-colors duration-500 hover:border-gold/70"
              >
                <Img
                  photo={m.photo}
                  sizes="(min-width: 1024px) 17vw, 60vw"
                  widths={[320, 600, 900]}
                  className="transition-transform duration-[1600ms] ease-cine group-hover:scale-[1.12]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/20 to-transparent" />
                <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-ivory/22 to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation:shine_1.2s_ease-out]" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-serif text-[1.2rem] leading-tight font-light">{m.name}</h3>
                  <p className="mt-1 text-[11.5px] text-mist">{m.note}</p>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
