import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-custom py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">🐾</div>
        <h1 className="font-heading text-4xl font-bold text-neutral-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-neutral-600 mb-8">
          Looks like this page wandered off. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/compare" className="btn-outline">
            Compare Plans
          </Link>
        </div>
      </div>
    </section>
  )
}
