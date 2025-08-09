import { useEffect, useState } from 'react'
import { motion, Reorder } from 'framer-motion'

import { cn } from '@/lib/utils'
import { FormFieldType } from '@/lib/types'
import { defaultFieldConfig, fieldTypes } from '@/components/index'
import { Button } from '@/components/ui/button'
import If from '@/components/ui/if'

import { LuColumns2, LuPencil, LuTrash2 } from 'react-icons/lu'

export type FormFieldOrGroup = FormFieldType | FormFieldType[]

interface Props {
  index: number
  subIndex?: number
  field: FormFieldType
  formFields: FormFieldOrGroup[]
  setFormFields: React.Dispatch<React.SetStateAction<FormFieldOrGroup[]>>
  updateFormField: (path: number[], updates: Partial<FormFieldType>) => void
  openEditDialog: (field: FormFieldType) => void
}

export const FieldItem = ({
  index,
  subIndex,
  field,
  formFields,
  setFormFields,
  updateFormField,
  openEditDialog,
}: Props) => {
  const showColumnButton =
    subIndex === undefined ||
    subIndex === (formFields[index] as FormFieldType[]).length - 1

  const path = subIndex !== undefined ? [index, subIndex] : [index]
  const [columnCount, setColumnCount] = useState(() =>
    Array.isArray(formFields[index]) ? formFields[index].length : 1,
  )

  const addNewColumn = (variant: string, index: number) => {
    const newFieldName = `name_${Math.random().toString().slice(-10)}`

    // Check for duplicates
    const existingFields = Array.isArray(formFields[index])
      ? (formFields[index] as FormFieldType[]).map((field) => field.name)
      : [formFields[index]?.name]

    // Check if the new field name already exists in the existing fields
    if (existingFields.includes(newFieldName)) {
      // If a field with the same name exists, do not add a new field
      return
    }

    const { label, description, placeholder } = defaultFieldConfig[variant] || {
      label: '',
      description: '',
      placeholder: '',
    }

    const newField: FormFieldType = {
      checked: true,
      description: description || '',
      disabled: false,
      label: label || newFieldName,
      name: newFieldName,
      onChange: () => {},
      onSelect: () => {},
      required: true,
      rowIndex: index,
      setValue: () => {},
      type: '',
      value: '',
      variant,
    }

    setFormFields((prevFields) => {
      const newFields = [...prevFields]
      if (Array.isArray(newFields[index])) {
        // If it's already an array, check for duplicates before adding
        const currentFieldNames = (newFields[index] as FormFieldType[]).map(
          (field) => field.name,
        )
        if (!currentFieldNames.includes(newFieldName)) {
          ;(newFields[index] as FormFieldType[]).push(newField)
        }
      } else if (newFields[index]) {
        // If it's a single field, convert it to an array with the existing field and the new one
        newFields[index] = [newFields[index] as FormFieldType, newField]
      } else {
        // If the index doesn't exist, just add the new field
        newFields[index] = newField
      }
      return newFields
    })
  }

  const removeColumn = () => {
    const rowIndex = path[0]
    const subIndex = path.length > 1 ? path[1] : null

    setFormFields((prevFields) => {
      const newFields = [...prevFields]

      if (Array.isArray(newFields[rowIndex])) {
        const row = [...(newFields[rowIndex] as FormFieldType[])]

        if (subIndex !== null && subIndex >= 0 && subIndex < row.length) {
          row.splice(subIndex, 1)

          if (row.length > 0) {
            newFields[rowIndex] = row
            // Update column count immediately after removal
            setColumnCount(row.length)
          } else {
            newFields.splice(rowIndex, 1)
            setColumnCount(1)
          }
        }
      } else {
        newFields.splice(rowIndex, 1)
        setColumnCount(1)
      }

      return newFields
    })
  }

  useEffect(() => {
    const newColumnCount = Array.isArray(formFields[index])
      ? formFields[index].length
      : 1
    setColumnCount(newColumnCount)
  }, [formFields, index])

  return (
    <div
      id={field.name}
      className={cn('w-full', {
        'col-span-12': columnCount === 1,
        'col-span-6': columnCount === 2,
        'col-span-4': columnCount === 3,
      })}
    >
      <motion.div
        layout="position"
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.15 },
        }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
        whileDrag={{ backgroundColor: '#9ca3af', borderRadius: '12px' }}
        className="flex items-center gap-3"
        key={field.name}
      >
        <div className="flex items-center gap-1 border rounded-xl px-3 py-1.5 w-full">
          <If
            condition={Array.isArray(formFields[index])}
            render={() => <LuColumns2 className="cursor-grab w-4 h-4" />}
          />
          <div className="flex items-center w-full">
            <div className="w-full text-sm">{field.variant}</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openEditDialog(field)}
            >
              <LuPencil />
            </Button>
            <Button variant="ghost" size="icon" onClick={removeColumn}>
              <LuTrash2 />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
