import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="w-full max-w-xl bg-white/80 border border-teal-100 rounded-lg p-4 mb-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-teal-900">
            Dynamic Form Builder
          </h3>
          <ul className="list-disc pl-5 text-sm text-teal-900 space-y-1">
            <li>
              Select form fields from the sidebar (Text, Number, Textarea,
              Select, Radio, Checkbox, Date)
            </li>
            <li>
              Configure each field:
              <ul className="list-disc pl-5 space-y-1">
                <li>Label</li>
                <li>Description/help text</li>
                <li>Required</li>
                <li>Enable/disable</li>
                <li>
                  Zod-style validations:
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Not empty</li>
                    <li>Minimum/Maximum length</li>
                    <li>Email format</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              Mark fields as derived fields with formulas based on other fields
            </li>
            <li>Small live preview on the right side while creating</li>
            <li>Main preview page with full validation and live error messages</li>
            <li>Save the form schema to localStorage with a custom name</li>
            <li>Clear the canvas after saving, with form schema logged to the console</li>
          </ul>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/create"
            className="rounded-full border border-solid border-teal-400 bg-teal-100 text-teal-900 transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 shadow hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Create Form
          </Link>
          <Link
            href="/myforms"
            className="rounded-full border border-solid border-teal-400 bg-teal-100 text-teal-900 transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 shadow hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            My Forms
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center" />
    </div>
  );
}
