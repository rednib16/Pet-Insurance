import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { blogPosts, getCategoryLabel } from '@/lib/blog'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Pet Insurance Blog | Guides, Tips & Comparisons',
  description: 'Expert guides, breed-specific advice, and news about pet insurance in South Africa. Learn everything you need to know to protect your pet.',
}

export default function BlogPage() {
  return (
    <>
      <div className="container-custom py-4">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />
      </div>

      <section className="container-custom pb-12">
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
            Pet Insurance Blog
          </h1>
          <p className="text-neutral-600 max-w-2xl">
            Expert guides, tips, and comparisons to help you make the best decision for your pet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card group hover:border-primary-200 flex flex-col"
            >
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl h-40 mb-4 flex items-center justify-center">
                <span className="text-4xl">
                  {post.category === 'breed_specific' ? '🐕' : post.category === 'tips' ? '💡' : '📖'}
                </span>
              </div>

              <Badge variant={post.category === 'guide' ? 'primary' : post.category === 'breed_specific' ? 'secondary' : post.category === 'tips' ? 'accent' : 'neutral'} className="mb-2 self-start">
                {getCategoryLabel(post.category)}
              </Badge>

              <h2 className="font-heading font-bold text-lg mb-2 group-hover:text-primary-500 transition-colors">
                {post.title}
              </h2>

              <p className="text-sm text-neutral-600 mb-4 flex-1 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-neutral-400">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-ZA', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <span className="flex items-center gap-1 text-primary-500 font-semibold group-hover:gap-2 transition-all">
                  Read <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
