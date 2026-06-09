// Advanced patterns: routing + state
FW_REACT_DATA.content.routing  = {
      install: 'npm install react-router-dom',
      version: 'React Router v7 (API zgodne z v6)',
      sections: [
        {
          title: 'Konfiguracja podstawowa',
          code: `import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}`
        },
        {
          title: 'Nawigacja — Link i NavLink',
          code: `import { Link, NavLink } from 'react-router-dom';

// Link — podstawowy
<Link to="/about">O nas</Link>

// NavLink — dodaje className "active" gdy URL pasuje
<NavLink
  to="/users"
  className={({ isActive }) => isActive ? 'nav-active' : ''}
>
  Użytkownicy
</NavLink>`
        },
        {
          title: 'Dynamiczne trasy i useParams',
          code: `// Definicja
<Route path="/users/:id" element={<UserProfile />} />

// Komponent
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();

  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);

  return <div>Użytkownik #{id}</div>;
}`
        },
        {
          title: 'Zagnieżdżone trasy i Outlet',
          code: `<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
  <Route path="profile" element={<Profile />} />
</Route>

// Dashboard.jsx — Outlet renderuje aktywną podtrasę
function Dashboard() {
  return (
    <div>
      <Sidebar />
      <main><Outlet /></main>
    </div>
  );
}`
        },
        {
          title: 'Programatyczna nawigacja i useNavigate',
          code: `import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(credentials);
    navigate('/dashboard'); // przekieruj po logowaniu
    // lub navigate(-1) — cofnij
  };
}`
        },
        {
          title: 'Protected Route — ochrona tras',
          code: `function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Użycie
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />`
        }
      ];
FW_REACT_DATA.content.state    = [
      {
        name: 'useState',
        icon: '⚛️',
        color: '#61dafb',
        useCase: 'Lokalny stan komponentu',
        complexity: 'Prosta',
        bundle: '0 KB (wbudowany)',
        when: 'Toggle, liczniki, wartości formularzy w jednym komponencie',
        code: `const [open, setOpen] = useState(false);`
      },
      {
        name: 'Context + useReducer',
        icon: '🔄',
        color: '#a78bfa',
        useCase: 'Stan współdzielony bez bibliotek',
        complexity: 'Średnia',
        bundle: '0 KB (wbudowany)',
        when: 'Motyw, język, auth — gdy prop drilling boli ale nie chcesz biblioteki',
        code: `const StateContext = createContext();
const [state, dispatch] = useReducer(reducer, init);
<StateContext.Provider value={{ state, dispatch }}>
  <App />
</StateContext.Provider>`
      },
      {
        name: 'Zustand',
        icon: '🐻',
        color: '#f59e0b',
        useCase: 'Global state — proste i szybkie',
        complexity: 'Niska',
        bundle: '~1 KB',
        when: 'Średnie aplikacje, gdy Context jest za wolny lub za dużo boilerplate',
        code: `import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set(s => ({ count: s.count + 1 })),
}));

// W komponencie
const { count, increment } = useStore();`
      },
      {
        name: 'Redux Toolkit',
        icon: '🟣',
        color: '#764abc',
        useCase: 'Global state — enterprise',
        complexity: 'Wysoka',
        bundle: '~15 KB',
        when: 'Duże aplikacje, time-travel debugging, wiele osób w teamie',
        code: `const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value++ },
  },
});

const { increment } = counterSlice.actions;
dispatch(increment());`
      };
