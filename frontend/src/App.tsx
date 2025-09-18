import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Contacts from "./components/Contacts";

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { isAuthenticated } = authContext;

  return (
    <AuthProvider>
      <div className="container mx-auto p-4">
        {isAuthenticated ? (
          <div>
            <Contacts />
            <button
              onClick={authContext.logout}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">Contact Management App</h1>
            <Register />
            <Login />
          </div>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
