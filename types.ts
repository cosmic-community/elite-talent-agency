// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// File type for images
export interface CosmicFile {
  url: string;
  imgix_url: string;
}

// Model interface
export interface Model extends CosmicObject {
  type: 'models';
  metadata: {
    full_name?: string;
    bio?: string;
    headshot?: CosmicFile;
    portfolio_gallery?: CosmicFile[];
    height?: string;
    weight?: string;
    hair_color?: string;
    eye_color?: string;
    dress_size?: string;
    shoe_size?: string;
    experience_level?: {
      key: ExperienceLevel;
      value: string;
    };
    specialties?: string[];
    available_for_bookings?: boolean;
    email?: string;
    phone?: string;
  };
}

// Photographer interface
export interface Photographer extends CosmicObject {
  type: 'photographers';
  metadata: {
    full_name?: string;
    bio?: string;
    profile_photo?: CosmicFile;
    portfolio_gallery?: CosmicFile[];
    years_of_experience?: number;
    photography_styles?: string[];
    equipment?: string;
    studio_available?: boolean;
    day_rate?: string;
    email?: string;
    website?: string;
    instagram?: string;
  };
}

// Designer interface
export interface Designer extends CosmicObject {
  type: 'designers';
  metadata: {
    full_name?: string;
    bio?: string;
    profile_photo?: CosmicFile;
    portfolio_gallery?: CosmicFile[];
    design_specialty?: {
      key: DesignSpecialty;
      value: string;
    };
    style_categories?: string[];
    years_of_experience?: number;
    notable_collaborations?: string;
    available_for_projects?: boolean;
    email?: string;
    website?: string;
    instagram?: string;
  };
}

// Type literals for select-dropdown values
export type ExperienceLevel = 'beginner' | 'intermediate' | 'experienced' | 'professional';
export type DesignSpecialty = 'fashion' | 'costume' | 'styling' | 'creative_director' | 'art_director' | 'makeup' | 'hair';

// Union type for all talent
export type TalentProfile = Model | Photographer | Designer;

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime type checking
export function isModel(obj: CosmicObject): obj is Model {
  return obj.type === 'models';
}

export function isPhotographer(obj: CosmicObject): obj is Photographer {
  return obj.type === 'photographers';
}

export function isDesigner(obj: CosmicObject): obj is Designer {
  return obj.type === 'designers';
}

// Utility types - Fixed the type indexing issue
export type OptionalMetadata<T extends TalentProfile> = Partial<T['metadata']>;
export type CreateTalentData<T extends TalentProfile> = Omit<T, 'id' | 'created_at' | 'modified_at'>;

// Filter types for search functionality
export interface TalentFilters {
  type?: 'models' | 'photographers' | 'designers';
  specialty?: string;
  available?: boolean;
  experience?: ExperienceLevel;
}