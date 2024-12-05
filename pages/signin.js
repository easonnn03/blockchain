import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';
import styles from '../styles/SignIn.module.css';
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (showResetForm) {
      await handlePasswordReset();
      return;
    }

    const { data, error } = await supabase
      .from('user_info')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      setErrorMessage('Invalid username or password');
      return;
    }

    const isMatch = await bcrypt.compare(password, data.password);

    if (isMatch) {
      router.push('/home');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  const handlePasswordReset = async () => {
    const { data, error } = await supabase
      .from('user_info')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      setErrorMessage('User not found');
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { updateError } = await supabase
      .from('user_info')
      .update({ password: hashedPassword })
      .eq('email', email);

    if (updateError) {
      setErrorMessage('Error resetting password');
    } else {
      alert(
        'Your password has been reset. You can now sign in with your new password.'
      );
      setShowResetForm(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-container']}>
        <h2 className={styles.title}>
          {showResetForm ? 'Reset your password' : 'Sign in to your account'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.input}
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={showResetForm}
          />
          {showResetForm ? (
            <>
              <input
                type="password"
                className={styles.input}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="submit" className={styles.button}>
                Reset Password
              </button>
            </>
          ) : (
            <>
              <input
                type="password"
                className={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                href="#"
                className={styles['forgot-password']}
                onClick={() => setShowResetForm(true)}
              >
                Forgot password? (Please insert your Email before reset!)
              </a>
              <button type="submit" className={styles.button}>
                Sign in
              </button>
            </>
          )}
        </form>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}{' '}
        {/* Display error message */}
        <div className={styles['signup-link']}>
          Don&apos;t have an account yet? <Link href="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
