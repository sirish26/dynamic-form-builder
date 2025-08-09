import { FieldType } from "../lib/types";


export const fieldTypes: FieldType[] = [
  { name: 'Input' },
  { name: 'Checkbox' },
  { name: 'Date Picker' },
  { name: 'Datetime Picker'},
  { name: 'Phone' },
  { name: 'Select' },
  { name: 'Textarea' },
  { name: 'RadioGroup'},
]

export const defaultFieldConfig: Record<
  string,
  { label: string; description: string; placeholder?: any }
> = {
  Checkbox: {
    label: 'Tearms and Conditions',
    description:
      'I agree to the terms and conditions of this service.',
  },
  'Date Picker': {
    label: 'Date of birth',
    description: 'Your date of birth is used to calculate your age.',
  },
  'Datetime Picker': {
    label: 'Submission Date',
    description: 'Add the date of submission with detailly.',
  },
  Input: {
    label: 'Username',
    description: 'This is your public display name.',
    placeholder: 'shadcn',
  },
  Select: {
    label: 'Email',
    description: 'You can manage email addresses in your email settings.',
    placeholder: 'Select a verified email to display',
  },
  Textarea: {
    label: 'Bio',
    description: 'You can @mention other users and organizations.',
  },
  Phone: {
    label: 'Phone number',
    description: 'Enter your phone number.',
  },
  RadioGroup: {
    label: 'Gender',
    description: 'Select your gender',
  },
}
