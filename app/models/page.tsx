import { getModels } from '@/lib/api'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ModelCard from '@/components/ModelCard'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: 'Models | Elite Talent Agency',
  description: 'Browse our diverse roster of professional models for fashion, commercial, and editorial work.',
}

export default async function ModelsPage() {
  const models = await getModels()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeader 
          title="Our Models"
          description="Discover our exceptional roster of professional models"
          count={models.length}
        />
        <section className="py-16 px-4 max-w-7xl mx-auto">
          {models.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {models.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No models available at the moment.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}