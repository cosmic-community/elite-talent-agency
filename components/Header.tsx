import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Elite Talent
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  )
}