import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import lottieRegister from '../assets/lotties/register.json';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;

    // Password validation: uppercase, lowercase, min 6 length
    const passwordValid =
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      password.length >= 6;

    if (!passwordValid) {
      toast.error("Password must contain uppercase, lowercase and be 6+ characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo,
      });

      toast.success("Registration successful!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome, ${user.displayName}`);
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google sign-in failed");
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-lime-100 to-lime-300 dark:from-blue-900 dark:to-blue-800 px-4 py-12 gap-10">
      <Helmet>
        <title>Register | EduBridge</title>
      </Helmet>

      {/* Lottie Animation Side */}
      <div className="w-full max-w-lg md:max-w-md">
        <Lottie animationData={lottieRegister} loop={true} className="w-full h-auto" />
      </div>

      {/* Registration Form Side */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-lime-700 dark:text-lime-300">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Your full name"
              className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-lime-500
                ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-lime-500
                ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <label htmlFor="photo" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Photo URL
            </label>
            <input
              id="photo"
              type="url"
              {...register("photo", { required: "Photo URL is required" })}
              placeholder="https://your-photo-url.com"
              className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-lime-500
                ${errors.photo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
            {errors.photo && <p className="mt-1 text-sm text-red-500">{errors.photo.message}</p>}
          </div>

          {/* Password with toggle eye */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="••••••••"
                className={`w-full pr-10 px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-lime-500
                  ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              />
              <span
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute top-3 right-4 cursor-pointer text-gray-500 hover:text-lime-600 dark:hover:text-lime-400"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-full shadow-lg transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 my-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="text-sm">OR</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex justify-center items-center gap-3 py-3 border border-lime-600 text-lime-700 rounded-full font-semibold hover:bg-lime-600 hover:text-white transition shadow-md"
          aria-label="Continue with Google"
        >
          <FaGoogle size={20} />
          Continue with Google
        </button>

        {/* Already have account */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600 dark:text-lime-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
