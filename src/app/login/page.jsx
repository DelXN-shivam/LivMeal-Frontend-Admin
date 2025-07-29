'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { username, password } = formData;
      if (!username || !password) {
        return;
      }
      
      console.log('Logged in:', formData);
      router.push('/admin');
    } finally {
      setIsLoading(false);
    }
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
              {/* <h1 className='text-5xl'>
                <span className='text-[#0077b6]'>Liv</span>
                <span className='text-[#ffb703]'>Meal</span>
              </h1> */}
            </div>
          </div>
        </div>
      </div>

      {/* Right side with login form - updated to contain only the form in a colored box */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md py-20 px-12 bg-[#edf6f9] rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-black mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                  value={formData.username}
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
                    className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10 text-black"
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
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}