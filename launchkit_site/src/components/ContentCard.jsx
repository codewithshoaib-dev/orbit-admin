import React from "react";
import { Link } from "react-router-dom";


function ContentCard({ content }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{content.title}</h2>
      <p className="text-gray-500 text-xs mb-1 uppercase tracking-wide">
        {content.content_type}
      </p>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {content.content}
      </p>
      <Link
        to={`/content/${content.slug}`}
        className="text-blue-600 hover:underline text-sm font-medium"
      >
        Read More →
      </Link>
    </div>
  );
}

export default ContentCard