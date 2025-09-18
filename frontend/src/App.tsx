import { useAuth } from "./context/AuthContext";
import Contacts from "./components/Contacts.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import { useState } from "react";

function App() {
  const { token } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return (
      <div>
        {showRegister ? <Register /> : <Login />}
        <div className="text-center mt-4">
          <button
            className="text-blue-600 underline"
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister
              ? "Already have an account? Login"
              : "New here? Register"}
          </button>
        </div>
      </div>
    );
  }

  return <div>{token ? <Contacts token={token} /> : <Login />}</div>;
}

export default App;
