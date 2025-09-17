import { useAuth } from "../context/AuthContext";
import Contacts from "../components/Contacts";
import Login from "../components/Login";

function App() {
  const { token } = useAuth();

  return <div>{token ? <Contacts token={token} /> : <Login />}</div>;
}

export default App;
