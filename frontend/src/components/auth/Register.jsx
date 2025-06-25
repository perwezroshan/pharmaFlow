import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup, verifyOTP, clearError, setSignupStep } from '../../store/slices/authSlice';
import config from '../../config/env';

const Register = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, signupStep, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const { confirmPassword, ...signupData } = formData;
    dispatch(signup(signupData));
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    dispatch(verifyOTP({ email: formData.email, otp }));
  };

  const renderSignupForm = () => (
    <form className="mt-8 space-y-6" onSubmit={handleSignup}>
      <div className="space-y-4">
        <div>
          <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
            Shop Name
          </label>
          <input
            id="shopName"
            name="shopName"
            type="text"
            required
            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your shop name"
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </div>
    </form>
  );

  const renderOTPForm = () => (
    <form className="mt-8 space-y-6" onSubmit={handleVerifyOTP}>
      <div>
        <p className="text-sm text-gray-600 mb-4">
          We've sent a verification code to <strong>{formData.email}</strong>
        </p>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
          Verification Code
        </label>
        <input
          id="otp"
          name="otp"
          type="text"
          required
          className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter verification code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => dispatch(setSignupStep('signup'))}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Back to signup
        </button>
      </div>
    </form>
  );

  const renderComplete = () => (
    <div className="mt-8 text-center">
      <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-4">
        Email verified successfully! You can now sign in.
      </div>
      <Link
        to="/login"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Go to Sign In
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {signupStep === 'signup' && 'Create your account'}
            {signupStep === 'verify-otp' && 'Verify your email'}
            {signupStep === 'complete' && 'Registration complete'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join {config.APP_NAME} to manage your medicine shop
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {signupStep === 'signup' && renderSignupForm()}
        {signupStep === 'verify-otp' && renderOTPForm()}
        {signupStep === 'complete' && renderComplete()}

        {signupStep === 'signup' && (
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
