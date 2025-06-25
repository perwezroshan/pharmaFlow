import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import config from '../../config/env';

const LogoutConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shopName, loading } = useSelector((state) => state.auth);

  const handleConfirmLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleCancel();
      } else if (event.key === 'Enter') {
        handleConfirmLogout();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Confirm Logout
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Are you sure you want to logout from {config.APP_NAME}?
          </p>
          {shopName && (
            <p className="mt-1 text-center text-sm text-gray-500">
              You are currently logged in as <strong>{shopName}</strong>
            </p>
          )}
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-yellow-400 text-lg">💡</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Before you logout
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Make sure you've saved any unsaved work</li>
                      <li>Your session will be terminated</li>
                      <li>You'll need to login again to access your account</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <span className="flex items-center justify-center">
                  Cancel
                  <span className="ml-2 text-xs text-gray-500">(Esc)</span>
                </span>
              </button>
              <button
                onClick={handleConfirmLogout}
                disabled={loading}
                className="flex-1 bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Logging out...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    Yes, Logout
                    <span className="ml-2 text-xs text-red-200">(Enter)</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            You can always login again with your credentials
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
