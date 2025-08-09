import { FormFieldType } from '@/lib/types'

export const generateCodeSnippet = (field: FormFieldType) => {
  switch (field.variant) {
    case 'Checkbox':
      return `<FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  ${field.disabled ? 'disabled' : ''}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>${field.label}</FormLabel>
                ${
                  field.description &&
                  `<FormDescription>${field.description}</FormDescription>`
                }
                <FormMessage />
              </div>
            </FormItem>
          )}
        />`
    case 'Date Picker':
      return `
      <FormField
      control={form.control}
      name="${field.name}"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>${field.label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
       ${
         field.description &&
         `<FormDescription>${field.description}</FormDescription>`
       }
          <FormMessage />
        </FormItem>
      )}
    />`
    case 'Datetime Picker':
      return `
      <FormField
      control={form.control}
      name="${field.name}"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>${field.label}</FormLabel>
          <DatetimePicker
            {...field}
            format={[
              ["months", "days", "years"],
              ["hours", "minutes", "am/pm"],
            ]}
          />
       ${
         field.description &&
         `<FormDescription>${field.description}</FormDescription>`
       }
          <FormMessage />
        </FormItem>
      )}
    />`
    case 'Input':
      return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Input 
                ${field.disabled ? 'disabled' : ''}
                type="${field.type}"
                {...field} />
              </FormControl>
              ${
                field.description &&
                `<FormDescription>${field.description}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`
    case 'Select':
      return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
                ${
                  field.description &&
                  `<FormDescription>${field.description}</FormDescription>`
                }
              <FormMessage />
            </FormItem>
          )}
        />`
    case 'Textarea':
      return `
        <FormField
          control={form.control}
          name="${field.name}"
          render={({ field }) => (
            <FormItem>
              <FormLabel>${field.label}</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              ${
                field.description &&
                `<FormDescription>${field.description}</FormDescription>`
              }
              <FormMessage />
            </FormItem>
          )}
        />`

    case 'Phone':
      return `
          <FormField
            control={form.control}
            name="${field.name}"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
              <FormLabel>${field.label}</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    {...field}
                    defaultCountry="TR"
                  />
                </FormControl>
              ${
                field.description &&
                `<FormDescription>${field.description}</FormDescription>`
              }
                <FormMessage />
              </FormItem>
            )}
          />
            `
    case 'RadioGroup':
      return `
          <FormField
            control={form.control}
            name="${field.name}"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>${field.label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    {[
                      ["Male", "male"],
                      ["Female", "female"],
                      ["Other", "other"]
                    ].map((option, index) => (
                      <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                        <FormControl>
                          <RadioGroupItem value={option[1]} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option[0]}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                ${
                  field.description &&
                  `<FormDescription>${field.description}</FormDescription>`
                }
                <FormMessage />
              </FormItem>
            )}
          />
        `
    default:
      return null
  }
}

export default function GenerateCodeFields() {
  return <div>index</div>
}
