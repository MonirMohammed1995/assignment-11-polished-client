import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MyTutorials = () => {
  const { user } = useContext(AuthContext);
  const [tutorials, setTutorials] = useState([]);
  const navigate = useNavigate();

  // Fetch user tutorials
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await fetch(
          `https://online-tutor-server-opal.vercel.app/tutors?email=${user.email}`
        );
        const data = await res.json();
        setTutorials(data);
      } catch (error) {
        Swal.fire('❌ Error', 'Failed to fetch tutorials', 'error');
      }
    };
    if (user?.email) fetchTutorials();
  }, [user]);

  // Delete handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the tutorial.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `https://online-tutor-server-opal.vercel.app/tutors/${id}`,
          { method: 'DELETE' }
        );
        if (res.ok) {
          setTutorials((prev) => prev.filter((t) => t._id !== id));
          Swal.fire('✅ Deleted!', 'Tutorial deleted.', 'success');
        } else {
          Swal.fire('❌ Error', 'Failed to delete tutorial.', 'error');
        }
      } catch {
        Swal.fire('❌ Error', 'Something went wrong.', 'error');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
        My Tutorials
      </h2>

      {tutorials.length > 0 ? (
        <div className="overflow-x-auto bg-white/70 backdrop-blur-xl border border-indigo-100 shadow-xl rounded-3xl">
          <table className="w-full table-auto text-left">
            <thead className="bg-indigo-50">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Language</th>
                <th className="p-4">Price ($)</th>
                <th className="p-4">Description</th>
                <th className="p-4">Review</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((tutorial) => (
                <tr
                  key={tutorial._id}
                  className="border-t border-indigo-100 hover:bg-indigo-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={tutorial.image}
                      alt="Thumbnail"
                      className="h-16 w-24 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td className="p-4 font-semibold text-gray-700">
                    {tutorial.tutorName}
                  </td>
                  <td className="p-4">{tutorial.language}</td>
                  <td className="p-4">${tutorial.price}</td>
                  <td className="p-4">{tutorial.description}</td>
                  <td className="p-4">{tutorial.review || 'N/A'}</td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => navigate(`/update-tutor/${tutorial._id}`)}
                      className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-md hover:scale-105 transition"
                      title="Update"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(tutorial._id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md hover:scale-105 transition"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-20">
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">
            You haven't added any tutorials yet.
          </h3>
          <button
            onClick={() => navigate('/add-tutor')}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-lg transition"
          >
            Add New Tutorial
          </button>
        </div>
      )}
    </div>
  );
};

export default MyTutorials;
