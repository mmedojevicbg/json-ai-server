import React from "react";
import { useLocation } from "react-router-dom";

interface DetailViewItem {
  id: string;
  title: string;
  description: string;
  jsonSample: string;
  submissionDate: string;
}

const DetailView: React.FC = () => {
  const location = useLocation();
  const item: DetailViewItem = location.state;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatJSON = (jsonString: string): string => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return jsonString;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">ID: {item?.id}</p>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                {item?.title}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Submitted</p>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(item?.submissionDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {item?.description}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                JSON Sample
              </h2>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-gray-100 font-mono text-sm">
                  {formatJSON(item?.jsonSample)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
