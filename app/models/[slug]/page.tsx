// app/models/[slug]/page.tsx
import { getModel, getModels } from '@/lib/api'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TalentProfile from '@/components/TalentProfile'
import type { Metadata } from 'next'

interface ModelPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const models = await getModels()
  return models.map((model) => ({
    slug: model.slug,
  }))
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { slug } = await params
  const model = await getModel(slug)

  if (!model) {
    return {
      title: 'Model Not Found | Elite Talent Agency',
    }
  }

  return {
    title: `${model.metadata?.full_name || model.title} | Elite Talent Agency`,
    description: model.metadata?.bio ? 
      model.metadata.bio.replace(/<[^>]*>/g, '').substring(0, 160) : 
      `Professional model ${model.metadata?.full_name || model.title}`,
    openGraph: {
      title: `${model.metadata?.full_name || model.title} | Elite Talent Agency`,
      description: model.metadata?.bio ? 
        model.metadata.bio.replace(/<[^>]*>/g, '').substring(0, 160) : 
        `Professional model ${model.metadata?.full_name || model.title}`,
      images: model.metadata?.headshot ? [model.metadata.headshot.imgix_url] : [],
    },
  }
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { slug } = await params
  const model = await getModel(slug)

  if (!model) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <TalentProfile talent={model} />
      </main>
      <Footer />
    </div>
  )
}