import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
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

  return (
    <div className="app">
      {!user1 ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />

            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>

              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
