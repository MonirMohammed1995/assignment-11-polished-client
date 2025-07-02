import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    tutorName: '',
    tutorEmail: '',
    image: '',
    language: '',
    price: '',
    description: '',
  });

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Chinese',
    'Arabic', 'Japanese', 'Hindi', 'Bengali', 'Korean',
    'Italian', 'Russian'
  ];

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await fetch(`https://online-tutor-server-opal.vercel.app/tutors/${id}`);
        const data = await res.json();
        setFormData({
          tutorName: data.tutorName || '',
          tutorEmail: data.tutorEmail || '',
          image: data.image || '',
          language: data.language || '',
          price: data.price || '',
          description: data.description || '',
        });
      } catch (error) {
        Swal.fire('❌ Error', 'Failed to fetch tutor data', 'error');
      }
    };
    fetchTutor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://online-tutor-server-opal.vercel.app/tutors/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire('✅ Updated!', 'Tutor info updated successfully!', 'success');
        navigate('/my-tutors');
      } else {
        Swal.fire('❌ Error', data?.message || 'Update failed', 'error');
      }
    } catch (err) {
      Swal.fire('❌ Error', 'Something went wrong.', 'error');
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm placeholder-gray-400 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500";

  return (
    <main className="max-w-4xl mx-auto mt-12 mb-16 px-6 py-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl">
      <Helmet>
        <title>Update Tutor - EduBridge</title>
      </Helmet>

      <h1 className="mb-10 text-center text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-wide">
        Update Tutor Information
      </h1>

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* User Info - read-only */}
        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Your Name</label>
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              className={`${inputClass} cursor-not-allowed bg-gray-100 dark:bg-gray-700`}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Your Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className={`${inputClass} cursor-not-allowed bg-gray-100 dark:bg-gray-700`}
            />
          </div>
        </section>

        {/* Editable Tutor Info */}
        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="tutorName" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tutor Name
            </label>
            <input
              id="tutorName"
              name="tutorName"
              value={formData.tutorName}
              onChange={handleChange}
              placeholder="Enter tutor's full name"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="tutorEmail" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tutor Email
            </label>
            <input
              id="tutorEmail"
              type="email"
              name="tutorEmail"
              value={formData.tutorEmail}
              onChange={handleChange}
              placeholder="Enter tutor email"
              required
              className={inputClass}
            />
          </div>
        </section>

        <div>
          <label htmlFor="image" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Profile Image URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://image-url.com"
            required
            className={inputClass}
          />
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="language" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className={inputClass + " cursor-pointer"}
            >
              <option value="" disabled>
                Select a language
              </option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 20"
              required
              className={inputClass}
            />
          </div>
        </section>

        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your teaching style..."
            required
            className={inputClass + " resize-none"}
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-block rounded-lg bg-indigo-600 px-12 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
};

export default Update;
