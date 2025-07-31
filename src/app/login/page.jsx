'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { email, password } = formData;

      // Validation check
      if (!email || !password) {
        toast.error('Please fill in all fields', {
          duration: 3000,
          style: {
            background: '#EF4444',
            color: '#fff',
          },
        });
        setIsLoading(false);
        return;
      }

      if (email.length < 3) {
        toast.error('email must be at least 3 characters long', {
          duration: 3000,
          style: {
            background: '#EF4444',
            color: '#fff',
          },
        });
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        toast.error('Password must be at least 6 characters long', {
          duration: 3000,
          style: {
            background: '#EF4444',
            color: '#fff',
          },
        });
        setIsLoading(false);
        return;
      }


      // Simulate API call
      const res = await axios.post(`${BASE_URL}/admin/login` , formData);

      if (res.status == 200) {
        // Success toast
        toast.success('Welcome back! Login successful 🎉', {
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10B981',
          },
        });

        console.log('Logged in:', formData);

        // Small delay to show success message before navigation
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        // Invalid credentials toast
        toast.error('Invalid email or password. Please try again.', {
          duration: 4000,
          style: {
            background: '#EF4444',
            color: '#fff',
          },
        });
      }

    } catch (error) {
      console.error('Login error:', error);

      // Error toast for unexpected errors
      toast.error('Something went wrong. Please try again later.', {
        duration: 4000,
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast('Password reset feature coming soon! 🔒', {
      duration: 3000,
      icon: '💡',
      style: {
        background: '#3B82F6',
        color: '#fff',
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left side with image */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md ml-24 flex flex-col items-center">
          <Image
            src="/images/login.png"
            alt="Login Illustration"
            width={300}
            height={300}
            className="w-full h-auto object-contain"
          />
          <div className="mt-8 text-center p-4 rounded-lg">
            <div className="flex justify-center mb-2">
              <Image
                src="/images/livmeal.png"
                alt="LivMedI Logo"
                width={200}
                height={100}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md py-20 px-12 bg-[#edf6f9] rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                  email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10 text-black bg-white"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#f6d068] hover:text-[#fab509] font-medium"
              >
                Forget Password ?
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0077b6] hover:bg-[#0079ba] text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
