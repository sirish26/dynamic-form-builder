'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormPreview } from '@/components/form-preview';
import { FormFieldOrGroup } from '@/components/form-builder'; // Re-using the type
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formName = searchParams.get('formName');
  const [formFields, setFormFields] = useState<FormFieldOrGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formName) {
      console.log('PreviewPage: formName', formName);
      try {
        let savedForm = null;
        if (formName === 'currentForm') {
          savedForm = sessionStorage.getItem(formName);
          console.log('PreviewPage: Loaded from sessionStorage', savedForm);
        } else {
          savedForm = localStorage.getItem(formName);
          console.log('PreviewPage: Loaded from localStorage', savedForm);
        }

        if (savedForm) {
          setFormFields(JSON.parse(savedForm));
          console.log('PreviewPage: Parsed formFields', JSON.parse(savedForm));
        } else {
          setError(`Form "${formName}" not found.`);
          toast.error(`Form "${formName}" not found.`);
        }
      } catch (e) {
        console.error('PreviewPage: Failed to load form from storage', e);
        setError('Failed to load form.');
        toast.error('Failed to load form.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('No form name provided.');
      toast.error('No form name provided.');
      setLoading(false);
    }
  }, [formName]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading form...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <section className="md:max-h-screen">
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => router.push('/create')}>Back to Create</Button>
          <h1 className="text-2xl font-bold text-center flex-grow">{formName} Preview</h1>
          <div></div>
        </div>
        <FormPreview formFields={formFields} />
      </div>
    </section>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
