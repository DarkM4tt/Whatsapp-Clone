import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, Button, IconButton } from "@mui/material";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import db from "./firebase";
import SendIcon from "@mui/icons-material/SendOutlined";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useStateValue } from "./StateProvider";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", `${roomId}`), (doc) => {
        setRoomName(doc.data().name);
      });

      const roomRef = doc(db, "rooms", roomId);
      const messRef = collection(roomRef, "messages");
      const q = query(messRef, orderBy("timestamp"));
      onSnapshot(q, (querySnapshot) => {
        setMessages(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const roomRef = doc(db, "rooms", roomId);
    const messRef = collection(roomRef, "messages");
    await addDoc(messRef, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log("CREATED!");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://api.multiavatar.com/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages?.map((message) => (
          <p
            key={message.timestamp}
            className={`chat__message ${
              message?.name === user?.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form>
          <input
            placeholder="Type a message ......."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button onClick={sendMessage} type="submit">
            <SendIcon style={{ color: "#25D366" }} />
          </Button>
        </form>
        <IconButton>
          <Mic style={{ color: "darkred", paddingRight: "10px" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
