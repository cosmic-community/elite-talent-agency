import Link from 'next/link';
import { Model } from '@/types';

interface ModelCardProps {
  model: Model;
}

export default function ModelCard({ model }: ModelCardProps) {
  const { metadata } = model;
  const profileImage = metadata.headshot?.imgix_url;

  return (
    <Link href={`/models/${model.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
        {/* Profile Image */}
        <div className="relative h-80 overflow-hidden">
          {profileImage ? (
            <img
              src={`${profileImage}?w=600&h=640&fit=crop&auto=format,compress`}
              alt={metadata.full_name || model.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-gray-500 text-6xl">👤</div>
            </div>
          )}
          
          {/* Availability Badge */}
          {metadata.available_for_bookings && (
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
            {metadata.full_name || model.title}
          </h3>
          
          {/* Experience Level */}
          {metadata.experience_level && (
            <div className="mb-3">
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {metadata.experience_level.value}
              </span>
            </div>
          )}

          {/* Measurements */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
            {metadata.height && (
              <div>
                <span className="font-medium">Height:</span> {metadata.height}
              </div>
            )}
            {metadata.hair_color && (
              <div>
                <span className="font-medium">Hair:</span> {metadata.hair_color}
              </div>
            )}
            {metadata.eye_color && (
              <div>
                <span className="font-medium">Eyes:</span> {metadata.eye_color}
              </div>
            )}
            {metadata.dress_size && (
              <div>
                <span className="font-medium">Size:</span> {metadata.dress_size}
              </div>
            )}
          </div>

          {/* Specialties */}
          {metadata.specialties && metadata.specialties.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {metadata.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {specialty}
                  </span>
                ))}
                {metadata.specialties.length > 3 && (
                  <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    +{metadata.specialties.length - 3} more
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
        </div>
      </div>
    </Link>
  );
}