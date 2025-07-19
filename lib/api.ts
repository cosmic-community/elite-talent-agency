import { cosmic, hasStatus } from './cosmic'
import type { Model, Photographer, Designer, CosmicResponse, TalentFilters } from '@/types'

// Fetch all models
export async function getModels(): Promise<Model[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'models' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Model[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch models')
  }
}

// Fetch single model by slug
export async function getModel(slug: string): Promise<Model | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'models', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Model
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch model')
  }
}

// Fetch all photographers
export async function getPhotographers(): Promise<Photographer[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'photographers' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Photographer[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch photographers')
  }
}

// Fetch single photographer by slug
export async function getPhotographer(slug: string): Promise<Photographer | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'photographers', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Photographer
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch photographer')
  }
}

// Fetch all designers
export async function getDesigners(): Promise<Designer[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'designers' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Designer[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch designers')
  }
}

// Fetch single designer by slug
export async function getDesigner(slug: string): Promise<Designer | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'designers', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Designer
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch designer')
  }
}

// Fetch all talent (models, photographers, designers)
export async function getAllTalent() {
  const [models, photographers, designers] = await Promise.all([
    getModels(),
    getPhotographers(),
    getDesigners()
  ])

  return {
    models,
    photographers,
    designers,
    total: models.length + photographers.length + designers.length
  }
}

// Filter talent by criteria
export async function filterTalent(filters: TalentFilters) {
  const allTalent = await getAllTalent()
  
  let filteredModels = allTalent.models
  let filteredPhotographers = allTalent.photographers
  let filteredDesigners = allTalent.designers

  // Filter by type
  if (filters.type === 'models') {
    filteredPhotographers = []
    filteredDesigners = []
  } else if (filters.type === 'photographers') {
    filteredModels = []
    filteredDesigners = []
  } else if (filters.type === 'designers') {
    filteredModels = []
    filteredPhotographers = []
  }

  // Filter by availability
  if (filters.available !== undefined) {
    filteredModels = filteredModels.filter(model => model.metadata?.available_for_bookings === filters.available)
    filteredDesigners = filteredDesigners.filter(designer => designer.metadata?.available_for_projects === filters.available)
  }

  // Filter by specialty
  if (filters.specialty) {
    filteredModels = filteredModels.filter(model => 
      model.metadata?.specialties?.includes(filters.specialty!)
    )
    filteredPhotographers = filteredPhotographers.filter(photographer =>
      photographer.metadata?.photography_styles?.includes(filters.specialty!)
    )
    filteredDesigners = filteredDesigners.filter(designer =>
      designer.metadata?.style_categories?.includes(filters.specialty!)
    )
  }

  // Filter by experience level (models only)
  if (filters.experience) {
    filteredModels = filteredModels.filter(model =>
      model.metadata?.experience_level?.key === filters.experience
    )
  }

  return {
    models: filteredModels,
    photographers: filteredPhotographers,
    designers: filteredDesigners,
    total: filteredModels.length + filteredPhotographers.length + filteredDesigners.length
  }
}