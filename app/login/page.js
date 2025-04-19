"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import '../../styles/App.css';

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/chat');
    }
  }, [user, loading, router]);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return null; // Redirecting, so render nothing
  }

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
      </header>
      <section>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </section>
    </div>
  );
}