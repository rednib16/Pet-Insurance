import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { blogPosts, getBlogPostBySlug, getCategoryLabel } from '@/lib/blog'
import { providers } from '@/lib/providers'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { ArticleJsonLd } from '@/components/seo/JsonLd'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: {
      type: 'article',
      title: post.seoTitle,
      description: post.seoDescription,
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pawcompare.co.za'
  const relatedProviderData = providers.filter(p => post.relatedProviders.includes(p.slug))

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.seoDescription}
        publishedAt={post.publishedAt}
        author={post.author}
        url={`${siteUrl}/blog/${post.slug}`}
      />

      <div className="container-custom py-4">
        <Breadcrumbs items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]} />
      </div>

      <article className="container-custom pb-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 text-sm font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <Badge variant="primary" className="mb-3">
            {getCategoryLabel(post.category)}
          </Badge>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-8 pb-8 border-b border-neutral-200">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-ZA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Content */}
          <div
            className="prose prose-neutral max-w-none
              prose-headings:font-heading prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-neutral-600 prose-p:leading-relaxed
              prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-neutral-800
              prose-li:text-neutral-600
              prose-table:text-sm
              prose-th:bg-neutral-50 prose-th:px-4 prose-th:py-2 prose-th:text-left
              prose-td:px-4 prose-td:py-2 prose-td:border-b prose-td:border-neutral-100
            "
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />

          {/* Related Providers */}
          {relatedProviderData.length > 0 && (
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <h2 className="font-heading font-bold text-xl mb-4">Related Providers</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedProviderData.map(provider => (
                  <Link
                    key={provider.id}
                    href={`/providers/${provider.slug}`}
                    className="card flex items-center gap-3 hover:border-primary-200"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="font-heading font-bold text-primary-500 text-sm">
                        {provider.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <span className="font-heading font-bold text-sm">{provider.name}</span>
                      <span className="text-xs text-neutral-500 block">{provider.plans.length} plans available</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-primary-50 rounded-2xl p-8 text-center">
            <h2 className="font-heading font-bold text-2xl mb-2">Ready to Compare?</h2>
            <p className="text-neutral-600 mb-6">
              Find the best pet insurance plan for your furry friend in 60 seconds.
            </p>
            <Link href="/compare" className="btn-primary">
              Compare Plans Now
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}

function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      return `<ul>${match}</ul>`
    })
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim())
      if (cells.every(c => c.trim().match(/^-+$/))) return ''
      const tag = match.includes('---') ? 'th' : 'td'
      return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, (match) => {
      return `<table><tbody>${match}</tbody></table>`
    })
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hultop])(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match
      return `<p>${match}</p>`
    })
}
