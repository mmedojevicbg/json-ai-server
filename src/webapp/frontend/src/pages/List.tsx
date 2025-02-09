import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Eye, FileJson } from "lucide-react";

interface Dataset {
  id: string;
  title: string;
  description: string;
  jsonSample: string;
  submissionDate: string;
}

const List = () => {
  const [data, setData] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:40000/api/dataset");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "An error occurred while fetching data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dataset List</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left border">ID</th>
              <th className="p-4 text-left border">Title</th>
              <th className="p-4 text-left border">Date</th>
              <th className="p-4 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4 border">{item.id}</td>
                <td className="p-4 border">{item.title}</td>
                <td className="p-4 border">
                  {formatDate(item.submissionDate)}
                </td>
                <td className="p-4 border">
                  <div className="flex items-center gap-3">
                    <a
                      href={""}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </a>

                    <a
                      href={`http://localhost:40000/api/dataset/json/${item.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-700"
                    >
                      <FileJson className="w-4 h-4" />
                      <span>JSON Preview</span>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
