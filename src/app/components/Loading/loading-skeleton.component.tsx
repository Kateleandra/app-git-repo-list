import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="p-4 bg-gray-200 rounded">
      <div className="h-4 bg-gray-300 mb-2 rounded"></div>
      <div className="h-4 bg-gray-300 mb-2 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );
}
