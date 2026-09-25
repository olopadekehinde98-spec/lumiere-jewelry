import { MotionConfig } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Overlays } from './components/Overlays'
import { UIContext, type Overlay, type UI } from './lib/ui'
import { Collections } from './sections/Collections'
import { Craft } from './sections/Craft'
import { Custom } from './sections/Custom'
import { Hero } from './sections/Hero'
import { Materials } from './sections/Materials'
import { Occasions } from './sections/Occasions'

export default function App() {
  const [overlay, setOverlay] = useState<Overlay>(null)
  const open = useCallback((o: Exclude<Overlay, null>) => setOverlay(o), [])
  const close = useCallback(() => setOverlay(null), [])
  const ui: UI = useMemo(() => ({ overlay, open, close }), [overlay, open, close])

  return (
    <MotionConfig reducedMotion="user">
      <UIContext.Provider value={ui}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Collections />
          <Craft />
          <Materials />
          <Custom />
          <Occasions />
        </main>
        <Footer />
        <Overlays />
      </UIContext.Provider>
    </MotionConfig>
  )
}
