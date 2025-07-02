import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState('');
  const { language } = useParams();

  useEffect(() => {
    fetch('https://online-tutor-server-opal.vercel.app/tutors')
      .then((res) => res.json())
      .then((data) => setTutors(data))
      .catch((err) => console.error('Error fetching tutors:', err));
  }, []);

  const filteredTutors = tutors.filter((tutor) =>
    language
      ? tutor.language.toLowerCase() === language.toLowerCase()
      : tutor.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Helmet>
        <title>Find Tutors</title>
      </Helmet>

      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
        {language ? `Tutors for ${language}` : 'Find Your Language Tutor'}
      </h2>

      {!language && (
        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="🔍 Search by language (e.g. Spanish)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}

      {filteredTutors.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 shadow-xl rounded-xl">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-5 rounded-tl-xl">Tutor</th>
                <th className="p-5">Language</th>
                <th className="p-5">Price</th>
                <th className="p-5">Reviews</th>
                <th className="p-5">Description</th>
                <th className="p-5 rounded-tr-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTutors.map((tutor, idx) => (
                <tr
                  key={tutor._id}
                  className={`border-b ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="flex items-center gap-4 p-5">
                    <img
                      src={tutor.image}
                      alt={tutor.tutorName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {tutor.tutorName}
                      </p>
                      <p className="text-xs text-gray-500">{tutor.tutorEmail}</p>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                      {tutor.language}
                    </span>
                  </td>
                  <td className="p-5 text-gray-700">${tutor.price}</td>
                  <td className="p-5 text-gray-700">{tutor.review || 0}</td>
                  <td className="p-5 text-gray-600">
                    {tutor.description.length > 60
                      ? `${tutor.description.slice(0, 60)}...`
                      : tutor.description}
                  </td>
                  <td className="p-5">
                    <Link
                      to={`/tutor/${tutor._id}`}
                      className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-xs font-medium shadow-md transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No tutors found for{' '}
          <span className="font-semibold text-indigo-700">
            {language || search}
          </span>
        </div>
      )}
    </div>
  );
};

export default FindTutors;
