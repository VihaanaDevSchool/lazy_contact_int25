import { useAuth } from "./context/AuthContext";
import Contacts from "./components/Contacts";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";

function App() {
  const { token } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return (
      <div>
        {showRegister ? (
          <>
            <Register />
            <p>
              Already have an account?{" "}
              <button onClick={() => setShowRegister(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login />
            <p>
              Don’t have an account?{" "}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </p>
          </>
        )}
      </div>
    );
  }

  return <Contacts token={token} />;
}

export default App;
