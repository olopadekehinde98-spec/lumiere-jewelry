import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { collections } from '../data/content'
import { EASE, useUI } from '../lib/ui'

/** The exhibition case: six collections, each piece lit as you pass it. */
export function Collections() {
  const { open } = useUI()
  const rail = useRef<HTMLUListElement>(null)

  const page = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    el.scrollBy({ left: ((card?.offsetWidth ?? 260) + 12) * dir, behavior: 'smooth' })
  }

  return (
    <section id="collections" className="relative border-t border-line bg-coal py-20 md:py-24">
      <div className="frame grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:items-center">
        <div>
          <p className="eyebrow mb-5">Our collections</p>
          <SplitLines className="display text-[clamp(2.2rem,4.4vw,3.6rem)]" lines={['Discover', 'Extraordinary']} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[320px] text-[14.5px] leading-[1.8] text-mist">
              Explore our curated collections, each crafted with passion and precision.
            </p>
            <button type="button" onClick={() => open({ kind: 'booking', subject: 'Collections' })} className="btn-line group mt-8">
              View All Collections
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
            </button>
          </Reveal>
        </div>

        <div className="relative min-w-0">
          <div className="mb-4 hidden justify-end gap-2 lg:flex">
            <button
              type="button"
              onClick={() => page(-1)}
              aria-label="Previous collections"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => page(1)}
              aria-label="Next collections"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </button>
          </div>

          <ul ref={rail} className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
            {collections.map((c, i) => (
              <motion.li
                key={c.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                className="w-[62vw] shrink-0 snap-center sm:w-[38vw] lg:w-[calc((100%-3.75rem)/6)]"
              >
                <button
                  type="button"
                  onClick={() => open({ kind: 'booking', subject: c.name })}
                  className="group relative block aspect-[3/4.2] w-full overflow-hidden border border-transparent bg-ash text-left transition-colors duration-500 hover:border-gold/70"
                >
                  <Img
                    photo={c.photo}
                    sizes="(min-width: 1024px) 15vw, 62vw"
                    widths={[320, 600, 900]}
                    className="transition-transform duration-[1400ms] ease-cine group-hover:scale-[1.09]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/25 to-transparent" />
                  {/* Light sweeps across the piece on hover */}
                  <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-ivory/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation:shine_1.1s_ease-out]" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-serif text-[1.25rem] leading-tight font-light">{c.name}</h3>
                    <p className="mt-1 text-[11.5px] text-mist">{c.note}</p>
                    <p className="mt-2 text-[10.5px] tracking-[0.16em] text-gold uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {c.count}
                    </p>
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
