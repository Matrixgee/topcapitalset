import { useState } from 'react';

export default function LoginSignup() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const colors = {
    primaryBlue: '#304F9C',
    lightBlue: '#E6EFFF',
    coral: '#FF7F6B',
    teal: '#20B2AA',
    gold: '#FFD700',
    darkText: '#212529',
    grayText: '#6C757D'
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (isLoginView) {
      console.log('Login submitted:', { email, password });
      // Handle login logic here
    } else {
      console.log('Signup submitted:', { name, email, password });
      // Handle signup logic here
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    // Reset form fields when switching views
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  return (
    <div className="flex h-screen w-full bg-blue-50" style={{ backgroundColor: colors.lightBlue }}>
      {/* Left Panel - Brand/Marketing */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 text-white" 
           style={{ backgroundColor: colors.primaryBlue }}>
        <div>
          <h1 className="text-3xl font-bold mb-2">InvestWise</h1>
          <p className="text-blue-200">Smart investments for your future</p>
        </div>
        
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-full" style={{ backgroundColor: colors.coral }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Portfolio Management</h3>
              <p className="text-blue-200 text-sm">Track and optimize your investments in real-time</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-full" style={{ backgroundColor: colors.teal }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Financial Reports</h3>
              <p className="text-blue-200 text-sm">Comprehensive analytics and insights</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-full" style={{ backgroundColor: colors.gold }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Secure Platform</h3>
              <p className="text-blue-200 text-sm">Bank-level encryption and protection</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-blue-200">© 2025 InvestWise. All rights reserved.</p>
      </div>
      
      {/* Right Panel - Authentication Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold" style={{ color: colors.primaryBlue }}>
              {isLoginView ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="mt-2" style={{ color: colors.grayText }}>
              {isLoginView 
                ? 'Sign in to access your investment dashboard' 
                : 'Start managing your investments in minutes'}
            </p>
          </div>
          
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              {!isLoginView && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium" style={{ color: colors.darkText }}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 p-3 w-full border rounded-lg"
                    style={{ borderColor: colors.grayText }}
                    placeholder="John Doe"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium" style={{ color: colors.darkText }}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-3 w-full border rounded-lg"
                  style={{ borderColor: colors.grayText }}
                  placeholder="name@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium" style={{ color: colors.darkText }}>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLoginView ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-3 w-full border rounded-lg"
                  style={{ borderColor: colors.grayText }}
                  placeholder={isLoginView ? "Your password" : "Create a strong password"}
                />
              </div>
              
              {!isLoginView && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium" style={{ color: colors.darkText }}>
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 p-3 w-full border rounded-lg"
                    style={{ borderColor: colors.grayText }}
                    placeholder="Confirm your password"
                  />
                </div>
              )}
            </div>
            
            {isLoginView && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4"
                    style={{ accentColor: colors.primaryBlue }}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm" style={{ color: colors.grayText }}>
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <button 
                    type="button"
                    className="font-medium hover:underline"
                    style={{ color: colors.primaryBlue }}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium"
                style={{ backgroundColor: colors.primaryBlue }}
              >
                {isLoginView ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p style={{ color: colors.grayText }}>
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={toggleView}
                className="font-medium hover:underline"
                style={{ color: colors.primaryBlue }}
              >
                {isLoginView ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
          
          {isLoginView && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: '#E5E7EB' }}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-blue-50" style={{ backgroundColor: colors.lightBlue, color: colors.grayText }}>
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium"
                  style={{ borderColor: colors.grayText, color: colors.darkText }}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium"
                  style={{ borderColor: colors.grayText, color: colors.darkText }}
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}