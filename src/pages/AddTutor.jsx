import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';

const languages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic',
  'Japanese', 'Hindi', 'Bengali', 'Korean', 'Italian', 'Russian'
];

const AddTutor = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    tutorName: '',
    tutorEmail: '',
    image: '',
    language: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTutor = {
      name: user?.displayName,
      userEmail: user?.email,
      tutorName: formData.tutorName,
      tutorEmail: formData.tutorEmail,
      image: formData.image,
      language: formData.language,
      price: parseFloat(formData.price),
      description: formData.description,
      review: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('https://online-tutor-server-opal.vercel.app/tutors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTutor),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('✅ Success!', 'Tutor added successfully!', 'success');
        setFormData({
          tutorName: '',
          tutorEmail: '',
          image: '',
          language: '',
          price: '',
          description: '',
        });
      } else {
        Swal.fire('❌ Error', data?.message || 'Failed to add tutor', 'error');
      }
    } catch (error) {
      Swal.fire('❌ Error', 'Something went wrong.', 'error');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br
        from-indigo-50 via-indigo-100 to-indigo-200 dark:from-indigo-900 dark:via-indigo-800 dark:to-indigo-900"
    >
      <Helmet>
        <title>Add Tutor</title>
      </Helmet>

      <div className="w-full max-w-4xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md
        border border-indigo-400 dark:border-indigo-600 rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-indigo-700 dark:text-indigo-300">
          Add a New Tutor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input label="Your Name" value={user?.displayName || ''} disabled />
            <Input label="Your Email" value={user?.email || ''} disabled />
          </div>

          {/* Tutor Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Tutor Name"
              name="tutorName"
              placeholder="Full Name"
              value={formData.tutorName}
              onChange={handleChange}
              required
            />
            <Input
              label="Tutor Email"
              name="tutorEmail"
              type="email"
              placeholder="example@tutor.com"
              value={formData.tutorEmail}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image and Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Tutor Image URL"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              required
            />
            <div>
              <Label text="Language" />
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-indigo-400 dark:border-indigo-600 rounded-2xl
                  bg-white/75 dark:bg-gray-800/75 backdrop-blur-md
                  focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-600
                  text-gray-900 dark:text-gray-100 transition"
              >
                <option value="">Select Language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <Input
            label="Price ($)"
            name="price"
            type="number"
            placeholder="e.g. 30"
            value={formData.price}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <div>
            <Label text="Description" />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Write a short description about the tutor..."
              className="w-full px-4 py-3 border-2 border-indigo-400 dark:border-indigo-600 rounded-2xl
                bg-white/75 dark:bg-gray-800/75 backdrop-blur-md
                focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-600
                text-gray-900 dark:text-gray-100 transition resize-none"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-10 py-3 rounded-full
                shadow-lg hover:shadow-xl transition"
            >
              Submit Tutor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input component
const Input = ({ label, name, value, onChange, placeholder, type = 'text', disabled, required }) => (
  <div>
    <Label text={label} />
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={`w-full px-4 py-3 border-2 rounded-2xl
        border-indigo-400 dark:border-indigo-600
        bg-white/75 dark:bg-gray-800/75 backdrop-blur-md
        focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-600
        text-gray-900 dark:text-gray-100 transition
        ${disabled ? 'cursor-not-allowed opacity-70' : ''}
      `}
    />
  </div>
);

const Label = ({ text }) => (
  <label className="block mb-2 font-semibold text-indigo-700 dark:text-indigo-300">
    {text}
  </label>
);

export default AddTutor;
