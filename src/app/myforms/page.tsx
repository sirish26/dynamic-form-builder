'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface SavedForm {
  name: string;
  schema: string; // JSON string of the form fields
}

export default function MyFormsPage() {
  const [savedForms, setSavedForms] = useState<SavedForm[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = () => {
    setLoading(true);
    const forms: SavedForm[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          const schema = localStorage.getItem(key);
          if (schema) {
            // Basic validation: ensure it's valid JSON and looks like a form schema
            JSON.parse(schema); // Just to check if it's valid JSON
            forms.push({ name: key, schema: schema });
          }
        } catch (e) {
          console.warn(`Skipping invalid localStorage item: ${key}`, e);
        }
      }
    }
    setSavedForms(forms);
    setLoading(false);
  };

  const handleDeleteForm = (formName: string) => {
    if (confirm(`Are you sure you want to delete form "${formName}"?`)) {
      try {
        localStorage.removeItem(formName);
        toast.success(`Form "${formName}" deleted successfully!`);
        loadForms(); // Reload the list of forms
      } catch (e) {
        console.error('Failed to delete form from localStorage', e);
        toast.error('Failed to delete form.');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading forms...</div>;
  }

  return (
    <section className="md:max-h-screen space-y-8 p-5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Saved Forms</h1>
        <Button onClick={() => {
          sessionStorage.removeItem('currentForm');
          router.push('/create');
        }}>Create New Form</Button>
      </div>
      {savedForms.length === 0 ? (
        <div className="text-center text-gray-500">No forms saved yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedForms.map((form) => (
            <div key={form.name} className="border rounded-lg p-4 flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-2">{form.name}</h2>
              <div className="flex space-x-2 mt-4">
                <Link href={`/preview?formName=${encodeURIComponent(form.name)}`} passHref>
                  <Button variant="outline">View Preview</Button>
                </Link>
                <Button variant="destructive" onClick={() => handleDeleteForm(form.name)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
           </div>
      )}
    </section>
  );
}
