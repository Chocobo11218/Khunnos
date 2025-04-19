"use client";

import { auth } from '../lib/firebase';

function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img
        src={
          photoURL ||
          'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'
        }
        alt="User avatar"
        className="avatar"
      />
      <p>{text}</p>
    </div>
  );
}

export default ChatMessage;