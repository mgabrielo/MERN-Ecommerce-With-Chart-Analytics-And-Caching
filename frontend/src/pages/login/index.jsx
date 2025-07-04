import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../../store/useUserStore";

const LogInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, loading } = useUserStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      className={`flex flex-col justify-center py-12 sm:px-6 lg:px-8 max-w-sm sm:max-w-md mt-10 md:max-w-3xl mx-auto`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
          Sign Into Your Account
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter Your Email"
                  className={`block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-700
                                rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-emerald-500
                                focus:border-emerald-500`}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="text"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="*********"
                  className={`block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-700
                                rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-emerald-500
                                focus:border-emerald-500`}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
                            text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none
                            focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 ease-in-out`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader
                    className="animate-spin size-5 mr-2"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className="size-5 mr-2" aria-hidden="true" />
                  Log In
                </>
              )}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't Have An Account..?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-emerald-400 hover:text-emerald-500"
            >
              Sign Up Here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LogInPage;
