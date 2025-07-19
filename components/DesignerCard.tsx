import Link from 'next/link';
import { Designer } from '@/types';

interface DesignerCardProps {
  designer: Designer;
}

export default function DesignerCard({ designer }: DesignerCardProps) {
  const { metadata } = designer;
  const profileImage = metadata.profile_photo?.imgix_url;

  return (
    <Link href={`/designers/${designer.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
        {/* Profile Image */}
        <div className="relative h-80 overflow-hidden">
          {profileImage ? (
            <img
              src={`${profileImage}?w=600&h=640&fit=crop&auto=format,compress`}
              alt={metadata.full_name || designer.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-gray-500 text-6xl">🎨</div>
            </div>
          )}
          
          {/* Available Badge */}
          {metadata.available_for_projects && (
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Available
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {metadata.full_name || designer.title}
          </h3>
          
          {/* Design Specialty and Experience */}
          <div className="flex justify-between items-center mb-3">
            {metadata.design_specialty && (
              <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                {metadata.design_specialty.value}
              </span>
            )}
            {metadata.years_of_experience && (
              <span className="text-sm text-gray-600">
                {metadata.years_of_experience} years
              </span>
            )}
          </div>

          {/* Style Categories */}
          {metadata.style_categories && metadata.style_categories.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {metadata.style_categories.slice(0, 3).map((category, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {category}
                  </span>
                ))}
                {metadata.style_categories.length > 3 && (
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    +{metadata.style_categories.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bio Preview */}
          {metadata.bio && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {metadata.bio.replace(/<[^>]*>/g, '').substring(0, 100)}...
            </p>
          )}

          {/* Notable Collaborations Preview */}
          {metadata.notable_collaborations && (
            <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
              <strong>Recent:</strong> {metadata.notable_collaborations.substring(0, 60)}...
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              {metadata.email && (
                <span>📧 Contact</span>
              )}
              {metadata.website && (
                <span>🌐 Portfolio</span>
              )}
              {metadata.instagram && (
                <span>📸 Instagram</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}