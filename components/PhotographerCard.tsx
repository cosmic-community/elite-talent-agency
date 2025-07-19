import Link from 'next/link';
import { Photographer } from '@/types';

interface PhotographerCardProps {
  photographer: Photographer;
}

export default function PhotographerCard({ photographer }: PhotographerCardProps) {
  const { metadata } = photographer;
  const profileImage = metadata.profile_photo?.imgix_url;

  return (
    <Link href={`/photographers/${photographer.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
        {/* Profile Image */}
        <div className="relative h-80 overflow-hidden">
          {profileImage ? (
            <img
              src={`${profileImage}?w=600&h=640&fit=crop&auto=format,compress`}
              alt={metadata.full_name || photographer.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-gray-500 text-6xl">📷</div>
            </div>
          )}
          
          {/* Studio Available Badge */}
          {metadata.studio_available && (
            <div className="absolute top-4 right-4">
              <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Studio
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {metadata.full_name || photographer.title}
          </h3>
          
          {/* Experience and Day Rate */}
          <div className="flex justify-between items-center mb-3">
            {metadata.years_of_experience && (
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                {metadata.years_of_experience} years exp.
              </span>
            )}
            {metadata.day_rate && (
              <span className="text-lg font-bold text-blue-600">
                {metadata.day_rate}
              </span>
            )}
          </div>

          {/* Photography Styles */}
          {metadata.photography_styles && metadata.photography_styles.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {metadata.photography_styles.slice(0, 3).map((style, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {style}
                  </span>
                ))}
                {metadata.photography_styles.length > 3 && (
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    +{metadata.photography_styles.length - 3} more
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

          {/* Contact Info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              {metadata.email && (
                <span>📧 Available</span>
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