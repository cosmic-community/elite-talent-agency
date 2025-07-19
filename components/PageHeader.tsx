interface PageHeaderProps {
  title: string
  description: string
  count?: number
}

export default function PageHeader({ title, description, count }: PageHeaderProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          {description}
        </p>
        {count !== undefined && (
          <p className="text-lg text-primary font-semibold">
            {count} {count === 1 ? 'professional' : 'professionals'} available
          </p>
        )}
      </div>
    </section>
  )
}