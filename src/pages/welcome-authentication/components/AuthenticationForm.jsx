import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import authService from '../../../utils/authService';

const AuthenticationForm = () => {
  const navigate = useNavigate();
  const { signIn, signUp, authError, clearError } = useAuth();
  const [authMode, setAuthMode] = useState('welcome'); // welcome, signin, signup, otp
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    clearError();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    const result = await signIn(formData.email, formData.password);
    
    if (result?.success) {
      navigate('/dashboard-match-discovery');
    }
    
    setLoading(false);
  };

  const handleSignUp = async () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    const result = await signUp(formData.email, formData.password, {
      full_name: formData.fullName
    });
    
    if (result?.success) {
      // Check if user needs email confirmation
      if (result.data?.user && !result.data?.user?.email_confirmed_at) {
        setAuthMode('confirmation');
      } else {
        navigate('/multi-step-registration');
      }
    }
    
    setLoading(false);
  };

  const handleOTPRequest = async () => {
    if (!formData.email) {
      setErrors({ email: 'Email is required for OTP' });
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email' });
      return;
    }

    setLoading(true);
    
    try {
      const result = await authService.signInWithOTP(formData.email);
      
      if (result?.success) {
        setOtpSent(true);
        setOtpTimer(60);
        
        // Start countdown
        const countdown = setInterval(() => {
          setOtpTimer(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setErrors({ general: result?.error || 'Failed to send OTP' });
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong sending OTP' });
    }
    
    setLoading(false);
  };

  const handleOTPVerify = async () => {
    if (!formData.otp) {
      setErrors({ otp: 'Please enter the OTP' });
      return;
    }

    setLoading(true);
    
    try {
      const result = await authService.verifyOTP(formData.email, formData.otp);
      
      if (result?.success) {
        navigate('/dashboard-match-discovery');
      } else {
        setErrors({ otp: result?.error || 'Invalid OTP' });
      }
    } catch (error) {
      setErrors({ otp: 'Invalid OTP. Please try again.' });
    }
    
    setLoading(false);
  };

  const renderWelcomeButtons = () => (
    <div className="space-y-4">
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={() => setAuthMode('signin')}
        iconName="LogIn"
        iconPosition="left"
        className="h-12"
      >
        Sign In
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        fullWidth
        onClick={() => setAuthMode('signup')}
        iconName="UserPlus"
        iconPosition="left"
        className="h-12"
      >
        Create Account
      </Button>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-caption">
            Or continue with
          </span>
        </div>
      </div>
      
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        onClick={() => setAuthMode('otp')}
        iconName="Smartphone"
        iconPosition="left"
        className="h-12"
      >
        Email + OTP
      </Button>
    </div>
  );

  const renderSignInForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-heading font-semibold mb-2">Welcome Back</h3>
        <p className="text-muted-foreground font-body">Sign in to your account</p>
      </div>

      {(authError || errors.general) && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error font-body">{authError || errors.general}</p>
        </div>
      )}

      <div className="space-y-4">
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />
        
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          required
        />
      </div>

      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          onClick={handleSignIn}
          className="h-12"
        >
          Sign In
        </Button>
        
        <Button
          variant="ghost"
          fullWidth
          onClick={() => setAuthMode('welcome')}
        >
          Back to Options
        </Button>
      </div>
    </div>
  );

  const renderSignUpForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-heading font-semibold mb-2">Create Account</h3>
        <p className="text-muted-foreground font-body">Join our matrimonial community</p>
      </div>

      {(authError || errors.general) && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error font-body">{authError || errors.general}</p>
        </div>
      )}

      <div className="space-y-4">
        <Input
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />
        
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />
        
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          required
        />
        
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />
      </div>

      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          onClick={handleSignUp}
          className="h-12"
        >
          Create Account
        </Button>
        
        <Button
          variant="ghost"
          fullWidth
          onClick={() => setAuthMode('welcome')}
        >
          Back to Options
        </Button>
      </div>
    </div>
  );

  const renderOTPForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-heading font-semibold mb-2">Email Verification</h3>
        <p className="text-muted-foreground font-body">
          {!otpSent ? 
            'Enter your email to receive OTP' : 
            `Enter the OTP sent to ${formData.email}`
          }
        </p>
      </div>

      {(authError || errors.general) && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error font-body">{authError || errors.general}</p>
        </div>
      )}

      <div className="space-y-4">
        {!otpSent && (
          <Input
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />
        )}

        {otpSent && (
          <>
            <Input
              type="text"
              label="Enter OTP"
              placeholder="6-digit code"
              value={formData.otp}
              onChange={(e) => handleInputChange('otp', e.target.value)}
              error={errors.otp}
              maxLength={6}
              required
            />
            
            {otpTimer > 0 ? (
              <p className="text-sm text-muted-foreground text-center font-body">
                Resend OTP in {otpTimer}s
              </p>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={handleOTPRequest}
                disabled={loading}
              >
                Resend OTP
              </Button>
            )}
          </>
        )}
      </div>

      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          onClick={otpSent ? handleOTPVerify : handleOTPRequest}
          className="h-12"
        >
          {otpSent ? 'Verify OTP' : 'Send OTP'}
        </Button>
        
        <Button
          variant="ghost"
          fullWidth
          onClick={() => {
            setAuthMode('welcome');
            setFormData(prev => ({ ...prev, otp: '' }));
            setOtpTimer(0);
            setOtpSent(false);
          }}
        >
          Back to Options
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Icon name="Mail" size={48} className="mx-auto text-primary mb-4" />
        <h3 className="text-xl font-heading font-semibold mb-2">Check Your Email</h3>
        <p className="text-muted-foreground font-body">
          We have sent a confirmation email to <strong>{formData.email}</strong>. 
          Please click the link in the email to verify your account.
        </p>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          fullWidth
          onClick={() => setAuthMode('welcome')}
        >
          Back to Welcome
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl shadow-elevation-2 p-6 border border-border">
        {authMode === 'welcome' && renderWelcomeButtons()}
        {authMode === 'signin' && renderSignInForm()}
        {authMode === 'signup' && renderSignUpForm()}
        {authMode === 'otp' && renderOTPForm()}
        {authMode === 'confirmation' && renderConfirmation()}
      </div>
    </div>
  );
};

export default AuthenticationForm;