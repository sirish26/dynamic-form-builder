'use client'

import { ChangeEvent, useRef, useState } from 'react'

import { FormFieldType } from '@/lib/types'
import { cn } from '@/lib/utils'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { CalendarIcon, Check, ChevronsUpDown, Paperclip } from 'lucide-react'

import { DatetimePicker } from '@/components/ui/datetime-picker'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const renderFormField = (field: FormFieldType, formField: any) => {
  const [checked, setChecked] = useState<boolean>(field.checked)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [datetime, setDatetime] = useState<Date | undefined>(new Date())
  const [smartDatetime, setSmartDatetime] = useState<Date | null>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  }

  switch (field.variant) {
    case 'Checkbox':
      return (
        <FormItem className="flex flex-col">
          <div
            className={cn(
              'flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4',
              field.className,
            )}
          >
            <FormControl>
              <Checkbox
                checked={formField.value as boolean}
                onCheckedChange={formField.onChange}
                disabled={field.disabled}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{field.label}</FormLabel> {field.required && '*'}
              <FormDescription>{field.description}</FormDescription>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )
    case 'Date Picker':
      return (
        <FormItem className="flex flex-col">
          <div>
            <FormLabel>{field.label}</FormLabel> {field.required && '*'}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formField.value ? format(formField.value, 'PPP') : <span>Pick a date</span>}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formField.value as Date}
                onSelect={formField.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case 'Datetime Picker':
      return (
        <FormItem className="flex flex-col">
          <div>
            <FormLabel>{field.label}</FormLabel> {field.required && '*'}
          </div>
          <DatetimePicker
            {...field}
            value={formField.value as Date}
            onChange={formField.onChange}
            format={[
              ['months', 'days', 'years'],
              ['hours', 'minutes', 'am/pm'],
            ]}
          />
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case 'Input':
      return (
        <FormItem>
          <FormLabel>{field.label}</FormLabel> {field.required && '*'}
          <FormControl>
            <Input
              disabled={field.disabled}
              type={field?.type}
              value={formField.value}
              onChange={formField.onChange}
            />
          </FormControl>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case 'Phone':
      return (
        <FormItem>
          <FormLabel>{field.label}</FormLabel> {field.required && '*'}
          <FormControl>
            <Input
              disabled={field.disabled}
              type="tel"
              value={formField.value}
              onChange={formField.onChange}
            />
          </FormControl>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case 'Select':
      return (
        <FormItem>
          <FormLabel>{field.label}</FormLabel> {field.required && '*'}
          <Select
            onValueChange={formField.onChange}
            value={formField.value as string}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    case 'Textarea':
      return (
        <FormItem>
          <FormLabel>{field.label}</FormLabel> {field.required && '*'}
          <FormControl>
            <Textarea
              className="resize-none"
              value={formField.value}
              onChange={formField.onChange}
            />
          </FormControl>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
        case 'RadioGroup':
      return (
        <FormItem className="space-y-3">
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={formField.onChange}
              value={formField.value as string}
              className="flex flex-col space-y-1"
            >
              {field.options?.map((option, index) => {
                return (
                  <FormItem
                    key={index}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={option} />
                    </FormControl>
                    <FormLabel className="font-normal">{option}</FormLabel>
                  </FormItem>
                )
              })}
            </RadioGroup>
          </FormControl>
          <FormDescription>{field.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )
    default:
      return null
  }
}
