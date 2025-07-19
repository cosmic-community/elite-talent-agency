export default function Footer() {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG || 'model-agency-production'

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Elite Talent Agency</h3>
            <p className="text-gray-300">
              Representing exceptional models, photographers, and designers worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/models" className="hover:text-white transition-colors">Models</a></li>
              <li><a href="/photographers" className="hover:text-white transition-colors">Photographers</a></li>
              <li><a href="/designers" className="hover:text-white transition-colors">Designers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">
              Ready to book talent?<br />
              Contact us for inquiries.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Elite Talent Agency. All rights reserved.
          </p>
          <a
            href={`https://www.cosmicjs.com?utm_source=bucket_${bucketSlug}&utm_medium=referral&utm_campaign=app_footer&utm_content=built_with_cosmic`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#11171A',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s ease'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1a2326')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#11171A')}
          >
            <img 
              src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg" 
              alt="Cosmic Logo" 
              style={{
                width: '20px',
                height: '20px',
              }}
            />
            Built with Cosmic
          </a>
        </div>
      </div>
    </footer>
  )
}