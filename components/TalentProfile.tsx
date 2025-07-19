import { TalentProfile as TalentProfileType, isModel, isPhotographer, isDesigner } from '@/types';

interface TalentProfileProps {
  talent: TalentProfileType;
}

export default function TalentProfile({ talent }: TalentProfileProps) {
  const getProfileImage = () => {
    if (isModel(talent)) {
      return talent.metadata.headshot?.imgix_url;
    }
    return talent.metadata.profile_photo?.imgix_url;
  };

  const getContactInfo = () => {
    const { email } = talent.metadata;
    if (isModel(talent)) {
      return { email, phone: talent.metadata.phone };
    }
    return { email, website: talent.metadata.website, instagram: talent.metadata.instagram };
  };

  const getSpecializations = () => {
    if (isModel(talent)) {
      return talent.metadata.specialties;
    } else if (isPhotographer(talent)) {
      return talent.metadata.photography_styles;
    } else if (isDesigner(talent)) {
      return talent.metadata.style_categories;
    }
    return [];
  };

  const getAvailabilityStatus = () => {
    if (isModel(talent)) {
      return talent.metadata.available_for_bookings;
    } else if (isDesigner(talent)) {
      return talent.metadata.available_for_projects;
    }
    return true; // Photographers don't have availability field
  };

  const profileImage = getProfileImage();
  const contactInfo = getContactInfo();
  const specializations = getSpecializations();
  const isAvailable = getAvailabilityStatus();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-700">
          {profileImage && (
            <img
              src={`${profileImage}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={talent.metadata.full_name || talent.title}
              className="w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">
                {talent.metadata.full_name || talent.title}
              </h1>
              {isAvailable && (
                <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Available
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Bio */}
              {talent.metadata.bio && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <div 
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: talent.metadata.bio }}
                  />
                </div>
              )}

              {/* Portfolio Gallery */}
              {talent.metadata.portfolio_gallery && talent.metadata.portfolio_gallery.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {talent.metadata.portfolio_gallery.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                          alt={`Portfolio image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Model-specific details */}
              {isModel(talent) && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Measurements</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {talent.metadata.height && (
                      <div>
                        <span className="text-gray-600">Height:</span>
                        <p className="font-medium">{talent.metadata.height}</p>
                      </div>
                    )}
                    {talent.metadata.hair_color && (
                      <div>
                        <span className="text-gray-600">Hair:</span>
                        <p className="font-medium">{talent.metadata.hair_color}</p>
                      </div>
                    )}
                    {talent.metadata.eye_color && (
                      <div>
                        <span className="text-gray-600">Eyes:</span>
                        <p className="font-medium">{talent.metadata.eye_color}</p>
                      </div>
                    )}
                    {talent.metadata.dress_size && (
                      <div>
                        <span className="text-gray-600">Dress Size:</span>
                        <p className="font-medium">{talent.metadata.dress_size}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Photographer-specific details */}
              {isPhotographer(talent) && (
                <>
                  {talent.metadata.equipment && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">Equipment</h2>
                      <p className="text-gray-700">{talent.metadata.equipment}</p>
                    </div>
                  )}
                  {talent.metadata.day_rate && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">Day Rate</h2>
                      <p className="text-2xl font-bold text-green-600">{talent.metadata.day_rate}</p>
                    </div>
                  )}
                </>
              )}

              {/* Designer-specific details */}
              {isDesigner(talent) && talent.metadata.notable_collaborations && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Notable Collaborations</h2>
                  <p className="text-gray-700">{talent.metadata.notable_collaborations}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Specializations */}
              {specializations && specializations.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Level */}
              {isModel(talent) && talent.metadata.experience_level && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Experience Level</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {talent.metadata.experience_level.value}
                  </span>
                </div>
              )}

              {/* Years of Experience */}
              {(isPhotographer(talent) || isDesigner(talent)) && talent.metadata.years_of_experience && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Experience</h3>
                  <p className="text-lg font-medium">{talent.metadata.years_of_experience} years</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Contact</h3>
                <div className="space-y-2">
                  {contactInfo.email && (
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="block text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  )}
                  {'phone' in contactInfo && contactInfo.phone && (
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="block text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  )}
                  {'website' in contactInfo && contactInfo.website && (
                    <a
                      href={`https://${contactInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {contactInfo.website}
                    </a>
                  )}
                  {'instagram' in contactInfo && contactInfo.instagram && (
                    <a
                      href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {contactInfo.instagram}
                    </a>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              {isPhotographer(talent) && talent.metadata.studio_available && (
                <div className="mb-6">
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Studio Available
                  </span>
                </div>
              )}

              {isDesigner(talent) && talent.metadata.design_specialty && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Specialty</h3>
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {talent.metadata.design_specialty.value}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}