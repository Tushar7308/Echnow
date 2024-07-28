import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot} from 'firebase/firestore';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebaseConfig';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);
    });

    return () => {
      unsubscribe();
      unsubscribeMessages();
    };
  }, [auth]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        createdAt: new Date(),
        userId: user.uid,
        userName: user.email, // You can use email or any other user detail
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div style={chatStyle}>
      <div style={messagesContainerStyle}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={msg.userId === user?.uid ? userMessageStyle : replyMessageStyle}
          >
            <span>{msg.text}</span>
            <div style={{ fontSize: '0.8em', color: '#666' }}>
              {new Date(msg.createdAt.toDate()).toLocaleTimeString()}
            </div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>
              {msg.userName}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} style={formStyle}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Send</button>
      </form>
    </div>
  );
};

const chatStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#e5e5e5',
};

const messagesContainerStyle = {
  flex: 1,
  overflowY: 'scroll',
  padding: '10px',
};

const userMessageStyle = {
  alignSelf: 'flex-end',
  backgroundColor: '#dcf8c6',
  padding: '10px',
  borderRadius: '10px',
  marginBottom: '10px',
};

const replyMessageStyle = {
  alignSelf: 'flex-start',
  backgroundColor: '#ffffff',
  padding: '10px',
  borderRadius: '10px',
  marginBottom: '10px',
};

const formStyle = {
  display: 'flex',
  padding: '10px',
  backgroundColor: '#ffffff',
};

const inputStyle = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const buttonStyle = {
  padding: '10px 20px',
  marginLeft: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Chat;
