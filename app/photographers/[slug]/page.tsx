// app/photographers/[slug]/page.tsx
import { getPhotographer, getPhotographers } from '@/lib/api'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TalentProfile from '@/components/TalentProfile'
import type { Metadata } from 'next'

interface PhotographerPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const photographers = await getPhotographers()
  return photographers.map((photographer) => ({
    slug: photographer.slug,
  }))
}

export async function generateMetadata({ params }: PhotographerPageProps): Promise<Metadata> {
  const { slug } = await params
  const photographer = await getPhotographer(slug)

  if (!photographer) {
    return {
      title: 'Photographer Not Found | Elite Talent Agency',
    }
  }

  return {
    title: `${photographer.metadata?.full_name || photographer.title} | Elite Talent Agency`,
    description: photographer.metadata?.bio ? 
      photographer.metadata.bio.replace(/<[^>]*>/g, '').substring(0, 160) : 
      `Professional photographer ${photographer.metadata?.full_name || photographer.title}`,
    openGraph: {
      title: `${photographer.metadata?.full_name || photographer.title} | Elite Talent Agency`,
      description: photographer.metadata?.bio ? 
        photographer.metadata.bio.replace(/<[^>]*>/g, '').substring(0, 160) : 
        `Professional photographer ${photographer.metadata?.full_name || photographer.title}`,
      images: photographer.metadata?.profile_photo ? [photographer.metadata.profile_photo.imgix_url] : [],
    },
  }
}

export default async function PhotographerPage({ params }: PhotographerPageProps) {
  const { slug } = await params
  const photographer = await getPhotographer(slug)

  if (!photographer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <TalentProfile talent={photographer} type="photographer" />
      </main>
      <Footer />
    </div>
  )
}