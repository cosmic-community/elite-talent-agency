export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Elite Talent Agency
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto animate-fade-in">
          Representing exceptional models, photographers, and designers who shape the future of fashion and creativity
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <a href="/models" className="btn-primary bg-white text-gray-900 hover:bg-gray-100">
            Browse Models
          </a>
          <a href="/photographers" className="btn-secondary bg-transparent border border-white text-white hover:bg-white hover:text-gray-900">
            View Photographers
          </a>
        </div>
      </div>
    </section>
  )
}