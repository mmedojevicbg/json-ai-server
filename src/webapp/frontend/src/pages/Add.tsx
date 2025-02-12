import React, { useState, ChangeEvent, FormEvent } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import rehypePrism from "rehype-prism-plus";

interface FormData {
  title: string;
  description: string;
  jsonSample: string;
}

const Add: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    jsonSample: "",
  });
  const [status, setStatus] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch("http://localhost:40000/api/dataset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Submission successful!");
        setFormData({ title: "", description: "", jsonSample: "" });
      } else {
        setStatus("Submission failed. Please try again.");
      }
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "An error occurred while submitting data"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">
          Submit Dataset
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label
              htmlFor="jsonSample"
              className="block text-sm font-medium text-gray-700"
            >
              JSON Sample
            </label>
            <CodeEditor
              id="jsonSample"
              name="jsonSample"
              minHeight={150}
              value={formData.jsonSample}
              language="json"
              placeholder="Please enter JSON sample."
              onChange={handleChange}
              rehypePlugins={[
                [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
              ]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              style={{
                backgroundColor: "#ffffff",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>

          {status && (
            <div
              className={`mt-4 text-center ${
                status.includes("successful")
                  ? "text-green-600"
                  : status.includes("Submitting")
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Add;
