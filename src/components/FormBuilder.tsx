import React from "react";
import type { FieldType, FormSchema } from "../types";

interface IFormBuilder {
  formSchema: FormSchema[];
  setFormSchema: React.Dispatch<React.SetStateAction<FormSchema[]>>;
  onSave: VoidFunction;
}

const generateId = () => crypto.randomUUID();

const FormBuilder: React.FC<IFormBuilder> = ({
  formSchema,
  setFormSchema,
  onSave,
}) => {
  // form schema should be use in the form renderer too so we need to move it to parent component.

  const FIELD_TYPES = ["Text", "Number", "Dropdown", "Checkbox"];

  const handleAddField = () => {
    setFormSchema([
      ...formSchema,
      { id: generateId(), label: "", type: "text", required: false },
    ]);
  };

  const handleUpdateField = (fId: string, val: Partial<FormSchema>) => {
    const updatedSchema = formSchema?.map((f) => {
      // here if fid not present then it will return that field only
      if (f.id !== fId) return f;
      const newField = { ...f, ...val };
      if (val.type === "dropdown" && !newField.options) newField.options = [""];
      if (val.type && val.type !== "dropdown") delete newField.options;
      return newField;
    });
    setFormSchema(updatedSchema);
  };

  const handleAddOption = (fieldId: string) => {
    const updatedSchema = formSchema?.map((f) =>
      f?.id === fieldId ? { ...f, options: [...(f?.options ?? []), ""] } : f,
    );
    setFormSchema(updatedSchema);
  };

  const handleRemoveOption = (fId: string, optIdx: number) => {
    const updatedSchema = formSchema?.map((f) =>
      f?.id === fId
        ? { ...f, options: f?.options?.filter((_, i) => i !== optIdx) }
        : f,
    );
    setFormSchema(updatedSchema);
  };

  const handleUpdateOption = (
    fId: string,
    optIndex: number,
    optVal: string,
  ) => {
    const updatedSchema = formSchema?.map((f) => {
      if (fId !== f.id || !f.options) return f;
      const options = [...f.options];
      options[optIndex] = optVal;
      return { ...f, options };
    });
    setFormSchema(updatedSchema);
  };

  const handleDeleteField = (fId: string) => {
    setFormSchema(formSchema?.filter((field) => field.id !== fId));
  };

  const moveField = (index: number, direction: -1 | 1) => {
    const newSchema = [...formSchema];
    const swapIndex = index + direction;
    [newSchema[index], newSchema[swapIndex]] = [
      newSchema[swapIndex],
      newSchema[index],
    ];
    setFormSchema(newSchema);
  };

  return (
    <div className="space-y-4">
      {formSchema.length === 0 ? (
        <div className="mt-2 p-5 border border-neutral-300 border-dashed rounded-2xl text-center bg-white">
          Please add field to build the form
        </div>
      ) : (
        formSchema.map((field, index) => (
          <div
            key={field.id}
            className="p-4 rounded-xl border border-neutral-200 bg-white"
          >
            <div className="flex items-start gap-3">
              {/* toggle form fields */}
              <div className="flex flex-col gap-1 pt-1">
                <button
                  type="button"
                  onClick={() => moveField(index, -1)}
                  disabled={index === 0}
                  className="disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveField(index, 1)}
                  disabled={index === formSchema.length - 1}
                  className="disabled:opacity-30"
                >
                  ▼
                </button>
              </div>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col">
                    <label>Field name</label>
                    <input
                      className="border rounded-lg p-2"
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) =>
                        handleUpdateField(field.id, { label: e.target.value })
                      }
                      value={field.label}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Field Type</label>
                    <select
                      className="border rounded-lg p-2"
                      onChange={(e) =>
                        handleUpdateField(field.id, {
                          type: e.target.value as FieldType,
                        })
                      }
                      value={field.type}
                    >
                      {FIELD_TYPES?.map((f) => (
                        <option key={f} value={f?.toLowerCase()}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dropdown options */}

                {field.type === "dropdown" && (
                  <div className="rounded-lg bg-neutral-50 p-3">
                    <div className="mb-1.5 text-xs font-medium text-neutral-500">
                      Options
                    </div>
                    <div className="space-y-2">
                      {(field.options ?? []).map((opt, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) =>
                              handleUpdateOption(
                                field.id,
                                optIndex,
                                e.target.value,
                              )
                            }
                            placeholder={`Option ${optIndex + 1}`}
                            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm outline-none transition-colors duration-150 focus:border-neutral-900 w-full "
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveOption(field.id, optIndex)
                            }
                            disabled={(field.options?.length ?? 0) <= 1}
                            className="shrink-0 rounded-md px-2 py-1 text-xs text-red-500 transition-colors duration-150 hover:bg-red-50 disabled:opacity-30 disabled:pointer-events-none"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddOption(field.id)}
                      className="mt-2 text-xs font-medium text-neutral-700 transition-colors duration-150 hover:text-neutral-900"
                    >
                      + Add option
                    </button>
                  </div>
                )}

                {/* Required toggle */}
                <label>
                  <input
                    type="checkbox"
                    name="required"
                    id="required"
                    onChange={(e) =>
                      handleUpdateField(field.id, {
                        required: e.target.checked,
                      })
                    }
                  />{" "}
                  Required
                </label>
              </div>

              {/* Delete field button */}
              <button
                className="text-red-500 rounded-md px-2 py-1 hover:bg-red-50 "
                type="button"
                onClick={() => handleDeleteField(field.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      <div className="flex justify-between">
        <button
          className="border p-2 rounded-xl"
          type="button"
          onClick={handleAddField}
        >
          + Add field
        </button>
        <button
          className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white disabled:bg-neutral-500"
          type="button"
          onClick={onSave}
          disabled={formSchema.length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
