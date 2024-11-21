import React from "react";
import { useForm, Controller } from "react-hook-form";

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FormRendererProps {
  schema: { formTitle: string; fields: Field[] };
}

const FormRenderer: React.FC<FormRendererProps> = ({ schema }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    alert("Form Submitted!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{schema.formTitle}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <Controller
              name={field.id}
              control={control}
              rules={{ required: field.required }}
              defaultValue=""
              render={({ field: controllerField }) =>
                field.type === "select" ? (
                  <select {...controllerField} className="border p-2 rounded w-full">
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    {...controllerField}
                    placeholder={field.placeholder}
                    className="border p-2 rounded w-full"
                  />
                )
              }
            />
          </div>
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormRenderer;
