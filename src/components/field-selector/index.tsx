import React from 'react'

import { fieldTypes } from '@/components/index'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type FieldSelectorProps = {
  addFormField: (variant: string, index?: number) => void
}

export const FieldSelector: React.FC<FieldSelectorProps> = ({
  addFormField,
}) => {
  const router = useRouter();
  return (
    <div className="flex md:flex-col items-start flex-wrap md:flex-nowrap gap-3 h-[70vh] overflow-y-auto">
      {fieldTypes.map((variant) => (
        <div className="flex items-center gap-1" key={variant.name}>
          <Button
            key={variant.name}
            variant="outline"
            onClick={() => addFormField(variant.name, variant.index)}
            className="rounded-full"
            size="sm"
          >
            {variant.name}
          </Button>
        </div>
      ))}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          onClick={() => router.push('/myforms')}
          className="rounded-full"
          size="sm"
        >
          My Forms
        </Button>
      </div>
    </div>
  )
}
