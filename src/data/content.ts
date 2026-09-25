export type Photo = { id: string; alt: string }

export const brand = {
  name: 'LUMIÈRE',
  sub: 'FINE JEWELRY',
  tagline: 'Timeless Elegance. A Brighter Tomorrow.',
}

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Collections', href: '#collections' },
  { label: 'Custom Jewelry', href: '#custom' },
  { label: 'Our Craft', href: '#craft' },
  { label: 'About', href: '#materials' },
  { label: 'Contact', href: '#footer' },
]

/** The vertical index on the right of the hero. */
export const heroChapters = [
  { n: '01', label: 'Exquisite Collections', href: '#collections' },
  { n: '02', label: 'Masterful Craftsmanship', href: '#craft' },
  { n: '03', label: 'Rare Materials', href: '#materials' },
  { n: '04', label: 'Your Unique Piece', href: '#custom' },
]

export const heroSlides: { photo: Photo; piece: string; detail: string }[] = [
  {
    photo: { id: '1605100804763-247f67b3557e', alt: 'Diamond solitaire ring resting on black velvet' },
    piece: 'The Aurelia Solitaire',
    detail: '2.1ct · Platinum',
  },
  {
    photo: { id: '1603561591411-07134e71a2a9', alt: 'Pink sapphire halo ring in rose gold' },
    piece: 'Rosé Halo',
    detail: '1.6ct · 18k Rose Gold',
  },
  {
    photo: { id: '1573408301185-9146fe634ad0', alt: 'Diamond link bracelet catching the light on black' },
    piece: 'Lumière Line Bracelet',
    detail: '4.8ct · White Gold',
  },
]

export type Collection = { name: string; note: string; count: string; photo: Photo }

export const collections: Collection[] = [
  { name: 'Rings', note: 'Symbols of forever', count: '86 pieces', photo: { id: '1603561591411-07134e71a2a9', alt: 'Pink sapphire halo ring in rose gold' } },
  { name: 'Necklaces', note: 'Grace in every detail', count: '64 pieces', photo: { id: '1589128777073-263566ae5e4d', alt: 'Delicate diamond pendant on a fine chain' } },
  { name: 'Earrings', note: 'Brilliance at every angle', count: '52 pieces', photo: { id: '1535632066927-ab7c9ab60908', alt: 'Sapphire and diamond drop earrings' } },
  { name: 'Bracelets', note: 'Elegance in motion', count: '38 pieces', photo: { id: '1573408301185-9146fe634ad0', alt: 'Diamond link bracelet on black' } },
  { name: 'Watches', note: 'Timeless sophistication', count: '24 pieces', photo: { id: '1524592094714-0f0654e20314', alt: 'Minimal wristwatch held in the hand' } },
  { name: 'Custom Jewelry', note: 'Designed for you', count: 'By appointment', photo: { id: '1608042314453-ae338d80c427', alt: 'Cluster of fine rings arranged on a stone' } },
]

export const craft = {
  photo: { id: '1558618666-fcd25c85cd64', alt: 'Artisan working precious metal at the bench with a torch' },
  features: [
    { title: 'Handcrafted Excellence', text: 'Every piece is meticulously made.' },
    { title: 'Premium Materials', text: 'We use only the finest gemstones and precious metals.' },
    { title: 'Attention to Detail', text: 'Perfection in every facet.' },
    { title: 'A Legacy of Trust', text: 'Jewelry you can cherish forever.' },
  ],
}

export type Material = { name: string; note: string; photo: Photo }

export const materials: Material[] = [
  { name: 'Diamonds', note: 'Unmatched brilliance', photo: { id: '1605100804763-247f67b3557e', alt: 'Brilliant-cut diamond ring on black velvet' } },
  { name: 'Emeralds', note: 'A touch of royalty', photo: { id: '1599643477877-530eb83abc8e', alt: 'Emerald pendant with a deep green stone' } },
  { name: 'Sapphires', note: 'Depth and elegance', photo: { id: '1535632066927-ab7c9ab60908', alt: 'Blue sapphire and diamond earrings' } },
  { name: 'Rubies', note: 'Bold and timeless', photo: { id: '1551122089-4e3e72477432', alt: 'Raw ruby crystal catching red light' } },
  { name: 'Gold', note: 'Enduring beauty', photo: { id: '1602173574767-37ac01994b2a', alt: 'Gold chain bracelet resting on linen' } },
]

export const customSteps = [
  { n: '01', title: 'Share Your Vision', text: 'Tell us the story, the stone and the moment it marks.', photo: { id: '1581092160562-40aa08e78837', alt: 'Designer sketching jewelry drawings at a studio desk' } },
  { n: '02', title: 'Design & Refine', text: 'We sketch, render and adjust until the piece is yours.', photo: { id: '1603561591411-07134e71a2a9', alt: 'Finished halo ring photographed in studio light' } },
  { n: '03', title: 'Our Artisans Craft', text: 'Setting, polishing and finishing entirely by hand.', photo: { id: '1558618666-fcd25c85cd64', alt: 'Artisan finishing a piece at the jeweller’s bench' } },
  { n: '04', title: 'Receive Your Masterpiece', text: 'Presented in our atelier, or delivered to your door.', photo: { id: '1512909006721-3d6018887383', alt: 'Wrapped gift box held in two hands' } },
]

export const occasions = {
  photo: { id: '1606800052052-a08af7148866', alt: 'Two gold wedding bands resting on soft white fabric' },
  items: [
    { title: 'Engagements', note: 'A forever kind of love' },
    { title: 'Weddings', note: 'Begin your next chapter' },
    { title: 'Anniversaries', note: 'Celebrate your journey' },
    { title: 'Special Occasions', note: 'Make it unforgettable' },
  ],
}

export const footerColumns = [
  { title: 'Shop', links: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches'] },
  { title: 'About', links: ['Our Story', 'Our Craft', 'Sustainability', 'Careers'] },
  { title: 'Support', links: ['Contact', 'FAQs', 'Shipping & Returns', 'Size Guide', 'Care Instructions'] },
]

export const legal = ['Privacy Policy', 'Terms of Service', 'Accessibility']
