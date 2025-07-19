// app/designers/[slug]/page.tsx
import { getDesigner, getDesigners } from '@/lib/api'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TalentProfile from '@/components/TalentProfile'
import type { Metadata } from 'next'

interface DesignerPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const designers = await getDesigners()
  return designers.map((designer) => ({
    slug: designer.slug,
  }))
}

export async function generateMetadata({ params }: DesignerPageProps): Promise<Metadata> {
  const { slug } = await params
  const designer = await getDesigner(slug)

  if (!designer) {
    return {
      title: 'Designer Not Found | Elite Talent Agency',
    }
  }

  return {
    title: `${designer.metadata?.full_name || designer.title} | Elite Talent Agency`,
    description: designer.metadata?.bio ? 
      designer.metadata.bio.replace(/<[^>]*>/g, '').substring(0, 160) : 
      `Professional designer ${designer.metadata?.full_name || designer.title}`,
    openGraph: {
      title: `${designer.metadata?.full_name || designer.title} | Elite Talent Agency`,
      description: designer.metadata?.bio ? 
        designer.metadata.bio.replace(/<[^>]*>/g, '').substring(0, 160) : 
        `Professional designer ${designer.metadata?.full_name || designer.title}`,
      images: designer.metadata?.profile_photo ? [designer.metadata.profile_photo.imgix_url] : [],
    },
  }
}

export default async function DesignerPage({ params }: DesignerPageProps) {
  const { slug } = await params
  const designer = await getDesigner(slug)

  if (!designer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <TalentProfile talent={designer} type="designer" />
      </main>
      <Footer />
    </div>
  )
}