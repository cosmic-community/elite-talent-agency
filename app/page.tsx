import { getAllTalent } from '@/lib/api'
import HeroSection from '@/components/HeroSection'
import TalentGrid from '@/components/TalentGrid'
import StatsSection from '@/components/StatsSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function HomePage() {
  const talent = await getAllTalent()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection 
          modelsCount={talent.models.length}
          photographersCount={talent.photographers.length}
          designersCount={talent.designers.length}
        />
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Talent</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our exceptional roster of professional models, photographers, and designers
            </p>
          </div>
          <TalentGrid 
            models={talent.models.slice(0, 3)}
            photographers={talent.photographers.slice(0, 2)}
            designers={talent.designers.slice(0, 2)}
          />
        </section>
      </main>
      <Footer />
    </div>
  )
}