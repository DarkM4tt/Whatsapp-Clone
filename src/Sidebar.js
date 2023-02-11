import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Input } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { DonutLarge, MoreVert, SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import db, { auth } from "./firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useStateValue } from "./StateProvider";

import "./Sidebar.css";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  const [user1, setUser1] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser1(authUser);
      } else {
        setUser1(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, "rooms"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setRooms(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(user?.photoURL);
  console.log(typeof user?.photoURL);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {user1?.photoURL === undefined ? (
          <Avatar
            onClick={() => signOut(auth)}
            style={{ cursor: "pointer" }}
            src={`https://api.multiavatar.com/100.svg`}
          />
        ) : (
          <Avatar
            onClick={() => signOut(auth)}
            style={{ cursor: "pointer" }}
            src={user?.photoURL}
          />
        )}
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <Input
            disableUnderline={true}
            placeholder="Search or start a new chat"
            type="text"
          />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
