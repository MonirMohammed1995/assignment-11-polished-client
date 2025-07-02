import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import lottieLogin from '../assets/lotties/login.json';
import app from '../firebase/firebase.config';
import { Helmet } from 'react-helmet';
import Lottie from 'lottie-react';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success('Google login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-lime-100 to-lime-300 dark:from-gray-800 dark:to-gray-900 px-4 py-12">
      <Helmet>
        <title>Login | EduBridge</title>
      </Helmet>

      {/* Animation Section */}
      <div className="w-full max-w-lg md:max-w-md mb-10 md:mb-0 md:mr-12">
        <Lottie animationData={lottieLogin} loop={true} className="w-full h-auto" />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-lime-700 dark:text-lime-300">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg border transition duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500
                ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters required' },
                })}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border transition duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500
                  ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-4 cursor-pointer text-gray-400 hover:text-lime-600 dark:hover:text-lime-400"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6 gap-2 text-gray-500 dark:text-gray-400">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="text-sm">OR</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex justify-center items-center gap-3 py-3 border border-lime-600 text-lime-700 rounded-full font-semibold hover:bg-lime-600 hover:text-white transition duration-300 shadow-md"
          aria-label="Sign in with Google"
        >
          <FaGoogle size={20} />
          Sign in with Google
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-sm">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-lime-600 dark:text-lime-400 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
