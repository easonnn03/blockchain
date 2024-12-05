import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';
import styles from '../styles/SignIn.module.css';
import Link from 'next/link';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      alert('Please fill in all fields');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from('user_info') // Make sure the table name is correct
      .insert([
        {
          email,
          password: hashedPassword,
          name,
        },
      ]);

    if (error) {
      console.error('Error during registration:', error.message);
      alert('Error during registration');
    } else {
      router.push('/signin');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['form-container']}>
        <h2 className={styles.title}>Register your account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.input}
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className={styles.input}
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            Sign up
          </button>
        </form>
        <div className={styles['signup-link']}>
          Already have an account? <Link href="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
