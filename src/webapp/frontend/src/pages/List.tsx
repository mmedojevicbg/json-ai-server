import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Eye, FileJson, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog";

interface Dataset {
  id: string;
  title: string;
  description: string;
  jsonSample: string;
  submissionDate: string;
}

const List = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Dataset[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedDatasetId, setSelectedDatasetId] = useState<number>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const deleteDataset = async (id: number) => {
    setLoading(true);
    const response = await fetch(
      (import.meta.env.VITE_API_BASE_URL ?? window.location.origin) +
        `/api/dataset/${id}`,
      { method: "DELETE" }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await response.text();
    setLoading(false);
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        (import.meta.env.VITE_API_BASE_URL ?? window.location.origin) +
          "/api/dataset"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "An error occurred while fetching data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    <>
      <div className="bg-white p-6 rounded-lg shadow">
        {loading && <Loader2 />}
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
                        onClick={() => {
                          navigate("/details", {
                            state: item,
                          });
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </a>

                      <a
                        href={
                          (import.meta.env.VITE_API_BASE_URL ?? "") +
                          `/api/dataset/json/${item.id}`
                        }
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-700"
                      >
                        <FileJson className="w-4 h-4" />
                        <span>JSON Preview</span>
                      </a>

                      <a
                        href={"#"}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteDialogOpen(true);
                          setSelectedDatasetId(Number(item.id));
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          if (selectedDatasetId) {
            deleteDataset(selectedDatasetId);
          }
        }}
        variant={"danger"}
      />
    </>
  );
};

export default List;
