import './index.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import LoginPage from './components/LoginPage';
import TodoApp from './components/TodoApp';

function App() {
  const [user, setUser] = useLocalStorage('todo-auth', null);

  const handleLogin = (userData) => {
    setUser({ ...userData, loggedIn: true });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user || !user.loggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <TodoApp user={user} onLogout={handleLogout} />;
}

export default App;
