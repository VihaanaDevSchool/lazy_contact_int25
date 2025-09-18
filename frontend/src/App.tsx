import { useContext } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Contacts from "./components/Contacts";

function AppContent() {
  const { token } = useContext(AuthContext)!;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {token ? (
        <Contacts />
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <Login />
          <Register />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
