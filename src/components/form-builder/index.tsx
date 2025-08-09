'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// import { Link } from 'next-view-transitions'

import { toast } from 'sonner'

import { FormFieldType } from '@/lib/types'
import { defaultFieldConfig } from '../index'
import If from '@/components/ui/if'
import { FieldSelector } from '../field-selector'
import { FormFieldList } from '../form-field-list'
import { FormPreview } from '../form-preview'
import { EditFieldDialog } from '@/components/edit-field-dialog'
import { SaveFormDialog } from '@/components/save-form-dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
export type FormFieldOrGroup = FormFieldType | FormFieldType[]

export default function FormBuilder() {

  const [formFields, setFormFields] = useState<FormFieldOrGroup[]>([])
  const [selectedField, setSelectedField] = useState<FormFieldType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaveFormDialogOpen, setIsSaveFormDialogOpen] = useState(false)

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedForm = sessionStorage.getItem('currentForm');
      console.log('FormBuilder: Attempting to load from sessionStorage', savedForm);
      if (savedForm) {
        try {
          setFormFields(JSON.parse(savedForm));
          console.log('FormBuilder: Loaded form from sessionStorage', JSON.parse(savedForm));
        } catch (e) {
          console.error('FormBuilder: Failed to parse saved form from sessionStorage', e);
          sessionStorage.removeItem('_currentBuildingForm');
        }
      }
    }
  }, []);

  const addFormField = (variant: string, index: number) => {
    const newFieldName = `name_${Math.random().toString().slice(-10)}`

    const { label, description } = defaultFieldConfig[variant] || {
      label: '',
      description: '',
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
      options: ['Radio Group', 'Select'].includes(variant) ? [] : undefined,
    }
    setFormFields([...formFields, newField])
  }

  const findFieldPath = (
    fields: FormFieldOrGroup[],
    name: string,
  ): number[] | null => {
    const search = (
      currentFields: FormFieldOrGroup[],
      currentPath: number[],
    ): number[] | null => {
      for (let i = 0; i < currentFields.length; i++) {
        const field = currentFields[i]
        if (Array.isArray(field)) {
          const result = search(field, [...currentPath, i])
          if (result) return result
        } else if (field.name === name) {
          return [...currentPath, i]
        }
      }
      return null
    }
    return search(fields, [])
  }

  const updateFormField = (path: number[], updates: Partial<FormFieldType>) => {
    const updatedFields = JSON.parse(JSON.stringify(formFields)) // Deep clone
    let current: any = updatedFields
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]]
    }
    current[path[path.length - 1]] = {
      ...current[path[path.length - 1]],
      ...updates,
    }
    setFormFields(updatedFields)
  }

  const openEditDialog = (field: FormFieldType) => {
    setSelectedField(field)
    setIsDialogOpen(true)
  }

  const handleSaveField = (updatedField: FormFieldType) => {
    if (selectedField) {
      const path = findFieldPath(formFields, selectedField.name)
      if (path) {
        updateFormField(path, updatedField)
      }
    }
    setIsDialogOpen(false)
  }

  const handleSaveForm = (formName: string) => {
    try {
      localStorage.setItem(formName, JSON.stringify(formFields));
      toast.success(`Form "${formName}" saved successfully!`);
      setFormFields([]);
      sessionStorage.removeItem('currentForm'); 
    } catch (error) {
      console.error('Failed to save form to localStorage', error);
      toast.error('Failed to save form. Please try again.');
    }
  };

  const handlePreviewCurrentForm = () => {
    try {
      console.log('FormBuilder: Saving current form to sessionStorage', formFields);
      sessionStorage.setItem('currentForm', JSON.stringify(formFields));
      router.push('/preview?formName=currentForm');
    } catch (error) {
      console.error('Failed to save current form for preview', error);
      toast.error('Failed to preview form. Please try again.');
    }
  };

  const FieldSelectorWithSeparator = ({
    addFormField,
  }: {
    addFormField: (variant: string, index?: number) => void
  }) => (
    <div className="flex flex-col md:flex-row gap-3">
      <FieldSelector addFormField={addFormField} />
      {/* <Separator orientation={isDesktop ? 'vertical' : 'horizontal'} /> */}
    </div>
  )

  return (
    <section className="md:max-h-screen space-y-8">
      <div className="w-auto mx-auto space-y-4">
        {/* <Editor /> */}
      </div>
      <If
        condition={formFields.length > 0}
        render={() => (
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 md:px-5 h-full">
            <div className="w-full h-full col-span-1 md:space-x-3 md:max-h flex flex-col md:flex-row ">
              <FieldSelectorWithSeparator
                addFormField={(variant: string, index: number = 0) =>
                  addFormField(variant, index)
                }
              />
              <div className="overflow-y-auto flex-1 ">
                <FormFieldList
                  formFields={formFields}
                  setFormFields={setFormFields}
                  updateFormField={updateFormField}
                  openEditDialog={openEditDialog}
                />
              </div>
            </div>
            <div className="col-span-1 w-full h-full space-y-3">
              {/* <SpecialComponentsNotice formFields={formFields} /> */}
              <FormPreview
                key={JSON.stringify(formFields)}
                formFields={formFields}
              />
              <div className="flex space-x-2">
                <Button onClick={() => setIsSaveFormDialogOpen(true)}>Save Form</Button>
                <Button onClick={handlePreviewCurrentForm}>Preview Current</Button>
                <Button onClick={() => router.push('/myforms')}>My Forms</Button>
              </div>
            </div>
          </div>
        )}
        otherwise={() => (
          <div className="flex flex-col md:flex-row items-center gap-3 md:px-5">
            <FieldSelectorWithSeparator
              addFormField={(variant: string, index: number = 0) =>
                addFormField(variant, index)
              }
            />
            <div className="flex-1 flex justify-center items-center h-[50vh] text-center text-gray-500">
              <p className="text-lg">Build a new form by dynamically adding and configuring fields</p>
            </div>
          </div>
        )}
      />
      <EditFieldDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        field={selectedField}
        onSave={handleSaveField}
      />
      <SaveFormDialog
        isOpen={isSaveFormDialogOpen}
        onClose={() => setIsSaveFormDialogOpen(false)}
        onSave={handleSaveForm}
      />
    </section>
  )
}
