interface StatsSectionProps {
  modelsCount: number
  photographersCount: number
  designersCount: number
}

export default function StatsSection({ 
  modelsCount, 
  photographersCount, 
  designersCount 
}: StatsSectionProps) {
  const stats = [
    { label: 'Professional Models', value: modelsCount, icon: '👤' },
    { label: 'Expert Photographers', value: photographersCount, icon: '📷' },
    { label: 'Creative Designers', value: designersCount, icon: '🎨' },
    { label: 'Years of Excellence', value: '10+', icon: '⭐' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary mb-2">
                {typeof stat.value === 'number' ? stat.value : stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}