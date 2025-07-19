import { getPhotographers } from '@/lib/api'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PhotographerCard from '@/components/PhotographerCard'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: 'Photographers | Elite Talent Agency',
  description: 'Browse our professional photographers specializing in fashion, commercial, and editorial photography.',
}

export default async function PhotographersPage() {
  const photographers = await getPhotographers()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeader 
          title="Our Photographers"
          description="Professional photographers with expertise across all genres"
          count={photographers.length}
        />
        <section className="py-16 px-4 max-w-7xl mx-auto">
          {photographers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photographers.map((photographer) => (
                <PhotographerCard key={photographer.id} photographer={photographer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No photographers available at the moment.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}