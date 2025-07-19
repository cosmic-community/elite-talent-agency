import Link from 'next/link'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/models', label: 'Models' },
  { href: '/photographers', label: 'Photographers' },
  { href: '/designers', label: 'Designers' },
]

export default function Navigation() {
  return (
    <nav className="hidden md:flex space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}