import Link from 'next/link'

const footerLinks = {
  'Compare': [
    { href: '/compare', label: 'Compare Plans' },
    { href: '/providers', label: 'All Providers' },
    { href: '/providers/oneplan', label: 'Oneplan' },
    { href: '/providers/dotsure', label: 'Dotsure' },
    { href: '/providers/medipet', label: 'MediPet' },
    { href: '/providers/outsurance', label: 'OUTsurance' },
  ],
  'Resources': [
    { href: '/blog', label: 'Blog' },
    { href: '/blog/best-pet-insurance-south-africa-2026', label: 'Best Pet Insurance 2026' },
    { href: '/blog/pet-insurance-cost-south-africa', label: 'Cost Guide' },
    { href: '/blog/is-pet-insurance-worth-it-south-africa', label: 'Is It Worth It?' },
  ],
  'Company': [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-and-conditions', label: 'Terms & Conditions' },
    { href: '/disclaimer', label: 'Disclaimer' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <circle cx="16" cy="16" r="3.5" fill="#2A9D8F"/>
                <circle cx="10" cy="10" r="2.5" fill="#2A9D8F"/>
                <circle cx="16" cy="7" r="2.5" fill="#2A9D8F"/>
                <circle cx="22" cy="10" r="2.5" fill="#2A9D8F"/>
                <path d="M11.5 19c0 0-0.8 5 4.5 5s4.5-5 4.5-5-1.5-3.5-4.5-3.5-4.5 3.5-4.5 3.5z" fill="#2A9D8F"/>
              </svg>
              <span className="font-heading font-extrabold text-xl text-white">
                <span className="text-primary-500">Paw</span>Compare
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              South Africa&apos;s pet insurance comparison site. Compare plans from top providers and find the best cover for your furry friend.
            </p>
            <p className="text-xs text-neutral-500">
              PawCompare is an independent comparison site. We are not an insurer or financial advisor.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-heading font-bold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} PawCompare. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">
            Made with love for South African pets
          </p>
        </div>
      </div>
    </footer>
  )
}
