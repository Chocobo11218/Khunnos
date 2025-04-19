"use client";

import { auth } from '../lib/firebase';

function SignOut() {
  return (
    auth.currentUser && (
      <button onClick={() => auth.signOut()}>Sign Out</button>
    )
  );
}

export default SignOut;