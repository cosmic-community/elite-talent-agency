import { getDesigners } from '@/lib/api'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DesignerCard from '@/components/DesignerCard'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: 'Designers | Elite Talent Agency',
  description: 'Browse our creative designers specializing in fashion, styling, and creative direction.',
}

export default async function DesignersPage() {
  const designers = await getDesigners()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHeader 
          title="Our Designers"
          description="Creative designers and stylists shaping fashion's future"
          count={designers.length}
        />
        <section className="py-16 px-4 max-w-7xl mx-auto">
          {designers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designers.map((designer) => (
                <DesignerCard key={designer.id} designer={designer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No designers available at the moment.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}