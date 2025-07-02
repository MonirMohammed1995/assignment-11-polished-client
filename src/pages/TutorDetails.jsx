import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import Loader from '../components/Loader';

const TutorDetails = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await fetch(`https://online-tutor-server-opal.vercel.app/tutors/${id}`);
        if (!res.ok) throw new Error(`Tutor not found (status: ${res.status})`);
        const data = await res.json();
        if (data?._id) setTutor(data);
      } catch (err) {
        Swal.fire('❌ Tutor not found', 'Try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      Swal.fire('⚠️ Please login first!', '', 'warning');
      return;
    }

    const bookingInfo = {
      tutorId: tutor._id,
      image: tutor.image,
      language: tutor.language,
      price: tutor.price,
      tutorEmail: tutor.tutorEmail,
      email: user.email,
      bookedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('https://online-tutor-server-opal.vercel.app/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingInfo),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('✅ Booked Successfully!', '', 'success');
      } else {
        Swal.fire('❌ Booking Failed', data?.message || '', 'error');
      }
    } catch (error) {
      Swal.fire('❌ Error', 'Something went wrong', 'error');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <Loader />
        <p className="text-indigo-600 text-lg mt-4">Loading tutor details...</p>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="text-center mt-10 text-red-500 font-medium">
        ❌ Tutor not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Helmet>
        <title>{tutor.tutorName || 'Tutor'} - Details</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Image */}
        <div className="w-full">
          <img
            src={tutor.image}
            alt={tutor.tutorName}
            className="w-full h-96 md:h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-extrabold mb-4 text-indigo-700 dark:text-indigo-300">
              {tutor.tutorName}
            </h2>

            <div className="space-y-4">
              <DetailItem label="Language" value={tutor.language} />
              <DetailItem label="Price" value={`$${tutor.price}`} />
              <DetailItem label="Reviews" value={tutor.review || 0} />

              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  About Tutor:
                </h4>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {tutor.description || 'No detailed description available.'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="mt-6 w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition"
          >
            Book This Tutor
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Extracted reusable component for scalability
const DetailItem = ({ label, value }) => (
  <div className="flex items-center gap-3">
    <span className="w-28 text-gray-700 dark:text-gray-300 font-medium">{label}:</span>
    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
      {value}
    </span>
  </div>
);

export default TutorDetails;
