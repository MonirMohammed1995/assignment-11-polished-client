import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `https://online-tutor-server-opal.vercel.app/bookings/${user?.email}`
        );
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  // Handle review
  const handleReview = async (tutorId, bookingId) => {
    try {
      const res1 = await fetch(
        `https://online-tutor-server-opal.vercel.app/tutors/review/${tutorId}`,
        { method: 'PATCH', headers: { 'Content-Type': 'application/json' } }
      );

      const res2 = await fetch(
        `https://online-tutor-server-opal.vercel.app/bookings/reviewed/${bookingId}`,
        { method: 'PATCH', headers: { 'Content-Type': 'application/json' } }
      );

      if (res1.ok && res2.ok) {
        Swal.fire('✅ Review submitted!', '', 'success');
        const updated = bookings.map((b) =>
          b._id === bookingId ? { ...b, reviewed: true } : b
        );
        setBookings(updated);
      } else {
        Swal.fire('❌ Failed to submit review', '', 'error');
      }
    } catch (err) {
      console.error('Review Error:', err);
      Swal.fire('❌ Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center mt-20">
          <h3 className="text-xl font-medium text-gray-600">
            You haven't booked any tutors yet.
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white/70 backdrop-blur-xl border border-indigo-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
            >
              <img
                src={booking.image}
                alt={booking.language}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {booking.language}
                </h3>
                <p className="text-sm text-indigo-600 mb-2 font-medium">
                  Price: ${booking.price}
                </p>
                <p className="text-sm text-gray-600 mb-4 break-words">
                  Tutor Email: {booking.tutorEmail}
                </p>

                <button
                  disabled={booking.reviewed}
                  onClick={() => handleReview(booking.tutorId, booking._id)}
                  className={`w-full px-4 py-2 rounded-xl font-medium transition duration-300
                    ${
                      booking.reviewed
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                    }`}
                >
                  {booking.reviewed ? '✅ Reviewed' : '📝 Leave Review'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;