import React, { useState } from "react";
import type { FormSchema, FormValues } from "../types";

interface IFormRenderer {
  schema: FormSchema[];
}

function initialValues(schema: FormSchema[]): FormValues {
  const values: FormValues = {};
  schema.forEach((f) => {
    values[f.id] = f.type === "checkbox" ? false : "";
  });
  return values;
}

const FormRenderer: React.FC<IFormRenderer> = ({ schema }) => {
  const [values, setValues] = useState<FormValues>(() => initialValues(schema));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

  const setValue = (id: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    schema.forEach((field) => {
      if (!field.required) return;
      const value = values[field.id];
      const isEmpty =
        field.type === "checkbox"
          ? value !== true
          : !String(value ?? "").trim();
      if (isEmpty)
        nextErrors[field.id] = `${field.label || "This field"} is required`;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setSubmitted(null);
      return;
    }
    // map field ids -> labels for a readable JSON payload
    const payload: FormValues = {};
    schema.forEach((f) => {
      payload[f.label || f.id] = values[f.id];
    });
    setSubmitted(payload);
  };

  if (schema.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-10 text-center text-sm text-neutral-500">
        No form to render yet. Go to "Form Builder" and add some fields first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-5 border rounded-xl border-neutral-300 shadow-lg"
      >
        {schema.map((field) => {
          const error = errors[field.id];
          const baseInput =
            "w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors duration-150 focus:border-neutral-900";
          const borderColor = error ? "border-red-400" : "border-neutral-300";

          return (
            <div key={field.id}>
              <label className="mb-1 block text-sm font-medium text-neutral-800">
                {field.label || "(untitled field)"}
                {field.required && (
                  <span className="ml-0.5 text-red-500">*</span>
                )}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  value={values[field.id] as string}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  className={`${baseInput} ${borderColor}`}
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  value={values[field.id] as string}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  className={`${baseInput} ${borderColor}`}
                />
              )}

              {field.type === "dropdown" && (
                <select
                  value={values[field.id] as string}
                  onChange={(e) => setValue(field.id, e.target.value)}
                  className={`${baseInput} ${borderColor}`}
                >
                  <option value="">Select...</option>
                  {(field.options ?? []).map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "checkbox" && (
                <label className="flex items-center gap-2 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    checked={values[field.id] as boolean}
                    onChange={(e) => setValue(field.id, e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300"
                  />
                  Yes
                </label>
              )}

              {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
          );
        })}

        <button
          type="submit"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-neutral-800 active:scale-[0.97]"
        >
          Submit
        </button>
      </form>

      {submitted && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-900 p-4 shadow-sm">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-400">
            Submitted JSON
          </div>
          <pre className="overflow-x-auto text-xs text-neutral-100">
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default FormRenderer;
