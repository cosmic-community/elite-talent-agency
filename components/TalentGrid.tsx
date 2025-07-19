import ModelCard from './ModelCard'
import PhotographerCard from './PhotographerCard'
import DesignerCard from './DesignerCard'
import type { Model, Photographer, Designer } from '@/types'

interface TalentGridProps {
  models: Model[]
  photographers: Photographer[]
  designers: Designer[]
}

export default function TalentGrid({ models, photographers, designers }: TalentGridProps) {
  return (
    <div className="space-y-12">
      {models.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Featured Models</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      )}

      {photographers.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Featured Photographers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographers.map((photographer) => (
              <PhotographerCard key={photographer.id} photographer={photographer} />
            ))}
          </div>
        </div>
      )}

      {designers.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Featured Designers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designers.map((designer) => (
              <DesignerCard key={designer.id} designer={designer} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}