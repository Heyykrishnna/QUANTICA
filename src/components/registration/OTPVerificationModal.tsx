import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

interface OTPVerificationModalProps {
  phone: string;
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => Promise<boolean>;
}

const OTPVerificationModal = ({ phone, isOpen, onClose, onVerify }: OTPVerificationModalProps) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await onVerify(otp);
      if (success) {
        setOtp('');
        onClose();
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp('');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-card border-2 border-border clip-corner p-6 w-full max-w-md z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-2 text-foreground">Verify Phone Number</h2>
          <p className="text-sm text-muted-foreground mb-6">
            OTP sent to: <span className="text-primary font-mono">{phone}</span>
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-bold uppercase tracking-wider text-primary mb-2"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="000000"
                className="w-full px-4 py-3 bg-background border-2 border-border focus:border-primary outline-none transition-colors text-foreground text-center text-2xl font-mono tracking-widest"
                maxLength={6}
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Check console for simulated OTP
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500 text-red-500 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-background border-2 border-border hover:border-muted-foreground text-foreground font-bold uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleVerify}
                disabled={isLoading || otp.length !== 6}
                className="flex-1 glitch-btn bg-primary text-primary-foreground py-3 px-4 font-bold uppercase tracking-wider hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-foreground"></div>
                    Verifying...
                  </span>
                ) : (
                  'Verify'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OTPVerificationModal;
