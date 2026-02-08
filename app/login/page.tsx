'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation for register
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (formData.password.length < 3) {
        setError('Password must be at least 3 characters');
        return;
      }
      
      if (formData.name.length < 2) {
        setError('Username must be at least 2 characters');
        return;
      }
    }
    
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { name: formData.name, password: formData.password }
        : { name: formData.name, password: formData.password };
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');
        document.cookie = `user=${JSON.stringify(data.user)}; path=/`;
        document.cookie = `isLoggedIn=true; path=/`;
        router.push('/dashboard');
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

 return (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#0b0f19] transition-colors duration-500 p-4">
    
    {/* Background Shapes */}
    <div className="absolute inset-0 -z-10">
      {/* Gradient blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-indigo-400 dark:bg-indigo-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-pink-400 dark:bg-purple-700 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-[220px] h-[220px] bg-cyan-300 dark:bg-cyan-600 rounded-full blur-3xl opacity-20"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>

    {/* Glass Card */}
    <div className="w-full max-w-md rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-xl p-8 transition-all">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        {isLogin ? "Welcome back" : "Create account"}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Username */}
        <div className="relative">
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={loading}
            placeholder=" "
            className="peer w-full px-4 pt-5 pb-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <label className="absolute left-4 top-2 text-sm text-gray-600 dark:text-gray-400 
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
            peer-placeholder-shown:text-gray-400 
            peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500 transition-all">
            Username
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            disabled={loading}
            placeholder=" "
            className="peer w-full px-4 pt-5 pb-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <label className="absolute left-4 top-2 text-sm text-gray-600 dark:text-gray-400 
            peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
            peer-placeholder-shown:text-gray-400 
            peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500 transition-all">
            Password
          </label>
        </div>

        {/* Confirm Password */}
        {!isLogin && (
          <div className="relative">
            <input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              disabled={loading}
              placeholder=" "
              className="peer w-full px-4 pt-5 pb-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <label className="absolute left-4 top-2 text-sm text-gray-600 dark:text-gray-400 
              peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
              peer-placeholder-shown:text-gray-400 
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500 transition-all">
              Confirm Password
            </label>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-sm text-red-500 bg-red-100/60 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            isLogin ? "Login" : "Register"
          )}
        </button>
      </form>

      {/* Switch */}
      <button
        onClick={() => {
          setIsLogin(!isLogin);
          setFormData({ name: "", password: "", confirmPassword: "" });
          setError("");
        }}
        disabled={loading}
        className="mt-6 w-full text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition"
      >
        {isLogin
          ? "Need an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  </div>
);


}