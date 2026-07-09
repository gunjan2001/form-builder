export type Tab = "builder" | "renderer";

export type FieldType = "text" | "number" | "dropdown" | "checkbox";

export type FormSchema = {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

export type FormValues = Record<string, string | boolean>

export const STORAGE_KEY = 'dynamic-form-schema'