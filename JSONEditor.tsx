import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";

interface JSONEditorProps {
  schema: any;
  setSchema: (schema: any) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, setSchema }) => {
  const [error, setError] = useState("");

  const handleChange = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      setSchema(parsed);
      setError("");
    } catch (err) {
      setError("Invalid JSON");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">JSON Editor</h2>
      <MonacoEditor
        height="500px"
        language="json"
        theme="vs-dark"
        value={JSON.stringify(schema, null, 2)}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default JSONEditor;
