const FW_REACT_DATA = {
  meta: {
    id: 'react', name: 'React', icon: '⚛️', color: '#61dafb',
    tagline: 'Biblioteka UI do budowania interfejsów użytkownika',
    year: 2013, author: 'Meta (Facebook)', lang: 'JavaScript / TypeScript',
    github: 'facebook/react', stars: '220k+'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Komponenty' },
    { id: 'hooki',      label: 'Hooki' },
    { id: 'routing',    label: 'Routing' },
    { id: 'state',      label: 'State' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      intro: {
        title: 'Czym jest React?',
        desc: 'React to deklaratywna biblioteka JavaScript do budowania interfejsów użytkownika. Stworzona przez Meta w 2013 roku, jest dziś najpopularniejszym narzędziem frontendowym na świecie — używana przez Facebook, Instagram, Airbnb, Netflix i tysiące innych produktów.',
      },
      concepts: [
        {
          title: 'Virtual DOM',
          desc: 'React utrzymuje lekką kopię DOM w pamięci. Gdy coś się zmienia, porównuje nowy Virtual DOM ze starym (diffing) i aktualizuje tylko zmienione fragmenty prawdziwego DOM — to sprawia że UI jest szybkie.',
          icon: '🧠'
        },
        {
          title: 'Komponenty',
          desc: 'UI dzielisz na małe, wielokrotnego użytku kawałki zwane komponentami. Każdy komponent to funkcja która przyjmuje dane (props) i zwraca JSX — opis tego co ma się wyświetlić.',
          icon: '🧩'
        },
        {
          title: 'Jednokierunkowy przepływ danych',
          desc: 'Dane w React płyną zawsze z góry do dołu — od komponentu rodzica do dzieci przez props. To ułatwia debugowanie bo zawsze wiesz skąd dane przyszły.',
          icon: '↓'
        },
        {
          title: 'JSX',
          desc: 'JSX to rozszerzenie składni JavaScript które wygląda jak HTML. Piszesz <div> bezpośrednio w JS — Babel kompiluje to do React.createElement() wywołań.',
          icon: '📝'
        }
      ],
      whenToUse: [
        'Aplikacje SPA (Single Page Application)',
        'Dashboardy i panele admina',
        'Sklepy internetowe i marketplace',
        'Duże zespoły — komponentowa architektura skaluje się dobrze',
        'Gdy potrzebujesz bogatego ekosystemu (Next.js, React Native, biblioteki)'
      ],
      firstComponent: `function Powitanie({ imie }) {
  return (
    <div className="powitanie">
      <h1>Cześć, {imie}! 👋</h1>
      <p>To jest twój pierwszy komponent React.</p>
    </div>
  );
}

// Użycie:
<Powitanie imie="Łukasz" />`
    },

    komponenty: [
      {
        title: 'Komponent funkcyjny (standard)',
        desc: 'Nowoczesny sposób pisania komponentów. Zwykła funkcja JavaScript która zwraca JSX. Używaj zawsze — klasy są legacy.',
        code: `function UserCard({ name, email, avatar }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}`
      },
      {
        title: 'Props — przekazywanie danych',
        desc: 'Props to dane przekazywane z rodzica do dziecka. Są readonly — komponent nie może ich modyfikować.',
        code: `// Rodzic
<Button color="blue" size="lg" onClick={handleClick}>
  Kliknij mnie
</Button>

// Komponent Button
function Button({ color, size, onClick, children }) {
  return (
    <button
      className={\`btn btn-\${color} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`
      },
      {
        title: 'Children — kompozycja komponentów',
        desc: 'Specjalny prop children pozwala zagnieżdżać komponenty jak HTML. Klucz do budowania elastycznych, wielokrotnego użytku layoutów.',
        code: `function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Użycie:
<Card title="Profil">
  <Avatar />
  <UserInfo />
</Card>`
      },
      {
        title: 'Renderowanie warunkowe',
        desc: 'React nie ma specjalnej składni dla if/else w JSX — używasz zwykłego JS: operator trójkowy, &&, lub zmienne.',
        code: `function Status({ isLoggedIn, userName }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>Witaj, {userName}!</p>
      ) : (
        <button>Zaloguj się</button>
      )}

      {/* Pokaż tylko gdy true */}
      {isLoggedIn && <LogoutButton />}
    </div>
  );
}`
      },
      {
        title: 'Renderowanie list',
        desc: 'Listy renderujesz przez .map(). Każdy element musi mieć unikalny prop key — React używa go do optymalnego re-renderowania.',
        code: `function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <strong>{user.name}</strong> — {user.email}
        </li>
      ))}
    </ul>
  );
}`
      },
      {
        title: 'Formularze — controlled components',
        desc: 'W React formularz kontrolujesz przez state — każda zmiana inputa aktualizuje state, a state kontroluje wartość inputa. Pełna kontrola nad danymi.',
        code: `function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Hasło"
      />
      <button type="submit">Zaloguj</button>
    </form>
  );
}`
      }
    ],

    hooki: [
      {
        name: 'useState',
        desc: 'Lokalny stan komponentu. Zwraca parę: wartość i funkcję do jej aktualizacji. Re-renderuje komponent gdy stan się zmienia.',
        when: 'Dane które się zmieniają i wpływają na UI (licznik, formularz, toggle)',
        code: `const [count, setCount] = useState(0);
const [user, setUser] = useState(null);
const [items, setItems] = useState([]);

// Aktualizacja
setCount(count + 1);
setCount(prev => prev + 1); // bezpieczniejsze`
      },
      {
        name: 'useEffect',
        desc: 'Efekty uboczne — fetch danych, subskrypcje, DOM manipulation. Odpowiednik lifecycli componentDidMount + componentDidUpdate + componentWillUnmount.',
        when: 'Fetch API, timery, event listenery, synchronizacja z zewnętrznymi systemami',
        code: `// Przy każdym renderze
useEffect(() => { ... });

// Tylko raz (componentDidMount)
useEffect(() => { ... }, []);

// Gdy zmieni się userId
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);

// Z cleanup
useEffect(() => {
  const sub = subscribe(channel);
  return () => sub.unsubscribe(); // cleanup
}, [channel]);`
      },
      {
        name: 'useContext',
        desc: 'Dostęp do kontekstu bez prop drillingu. Pozwala przekazywać dane przez całe drzewo komponentów bez ręcznego przekazywania przez każdy poziom.',
        when: 'Motyw, język, zalogowany użytkownik — dane potrzebne wszędzie',
        code: `const ThemeContext = createContext('light');

// Provider (wyżej w drzewie)
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Konsumpcja (gdziekolwiek w drzewie)
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Klik</button>;
}`
      },
      {
        name: 'useRef',
        desc: 'Referencja która nie powoduje re-renderu. Dwa zastosowania: dostęp do elementu DOM i przechowywanie wartości między renderami.',
        when: 'Focus na input, animacje, integracja z bibliotekami DOM, timery',
        code: `// Dostęp do DOM
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus();

// Wartość bez re-renderu
const countRef = useRef(0);
countRef.current++; // nie re-renderuje`
      },
      {
        name: 'useMemo',
        desc: 'Memoizuje wynik drogiego obliczenia. Przelicza tylko gdy zmienią się zależności. Nie używaj przedwcześnie — React jest szybki.',
        when: 'Ciężkie obliczenia (filtrowanie dużych list, transformacje danych) wywoływane często',
        code: `const filteredUsers = useMemo(() => {
  return users.filter(u =>
    u.name.toLowerCase().includes(query)
  );
}, [users, query]); // przelicz tylko gdy zmieni się users lub query`
      },
      {
        name: 'useCallback',
        desc: 'Memoizuje funkcję. Zwraca tę samą referencję funkcji między renderami. Potrzebne gdy przekazujesz callbacki do zoptymalizowanych dzieci.',
        when: 'Callbacki przekazywane do React.memo komponentów lub jako zależności useEffect',
        code: `const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // pusta lista = ta sama funkcja zawsze

<ExpensiveList onDelete={handleDelete} />`
      },
      {
        name: 'useReducer',
        desc: 'Zaawansowane zarządzanie stanem przez reducer pattern (jak Redux ale lokalnie). Lepsze od useState gdy logika jest złożona lub powiązana.',
        when: 'Formularze z wieloma polami, stan z wieloma akcjami, gdy useState robi się nieczytelny',
        code: `const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'RESET':     return { count: 0 };
    default:          return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'INCREMENT' });`
      },
      {
        name: 'useId',
        desc: 'Generuje stabilne, unikalne ID które jest spójne między server-side i client-side renderowaniem. React 18+.',
        when: 'Łączenie label z inputem, atrybuty aria-* wymagające unikalnego ID',
        code: `function FormField({ label }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}`
      },
      {
        name: 'Custom Hook',
        desc: 'Własny hook to funkcja zaczynająca się od "use" która może używać innych hooków. Pozwala wydzielić i re-używać logikę stanową.',
        when: 'Gdy ta sama logika pojawia się w wielu komponentach',
        code: `// Custom hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Użycie
const { data, loading } = useFetch('/api/users');`
      }
    ],

    routing: {
      install: 'npm install react-router-dom',
      version: 'React Router v6',
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
      ]
    },

    state: [
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
      },
      {
        name: 'TanStack Query',
        icon: '🔴',
        color: '#ef4444',
        useCase: 'Server state — dane z API',
        complexity: 'Średnia',
        bundle: '~13 KB',
        when: 'Gdy masz dane z API — zastępuje useEffect + useState do fetchowania. Cache, refetch, optimistic updates za darmo.',
        code: `const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
  staleTime: 5 * 60 * 1000, // 5 minut
});

// Mutacje
const mutation = useMutation({ mutationFn: createUser });`
      },
      {
        name: 'Jotai',
        icon: '⚛️',
        color: '#22c55e',
        useCase: 'Atomowy stan — elastyczny',
        complexity: 'Niska',
        bundle: '~3 KB',
        when: 'Gdy lubisz model atomowy (jak Recoil ale prostszy). Stan jest podzielony na małe atomy.',
        code: `import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`
      }
    ],

    rywale: [
      {
        name: 'Vue.js',
        icon: '💚',
        color: '#42b883',
        tagline: 'Progresywny framework UI',
        pros: ['Łagodniejsza krzywa uczenia', 'Single File Components (SFC)', 'Wbudowany system reaktywności', 'Świetna dokumentacja'],
        cons: ['Mniejszy ekosystem niż React', 'Mniej ofert pracy', 'Mniej komponentów od firm trzecich'],
        vsReact: 'Vue jest prostszy na start. React ma większy ekosystem i więcej ofert pracy. Vue preferują mniejsze teamy i projekty gdzie developer doświadczenia jest ważny.',
        bestFor: 'Małe-średnie projekty, płynne przejście z jQuery/Vanilla JS'
      },
      {
        name: 'Angular',
        icon: '🔺',
        color: '#dd0031',
        tagline: 'Pełny framework od Google',
        pros: ['Pełna bateria (router, HTTP, forms, DI)', 'TypeScript first', 'Jasna architektura dla dużych teamów', 'Dobre narzędzia CLI'],
        cons: ['Stroma krzywa uczenia', 'Więcej boilerplate', 'Cięższa paczka wyjściowa', 'Szybko ewoluuje — breaking changes'],
        vsReact: 'Angular to framework, React to biblioteka. Angular narzuca strukturę (dobrze dla dużych teamów), React daje wolność (wymaga własnych decyzji).',
        bestFor: 'Enterprise, duże teamy, projekty wymagające rygorystycznej architektury'
      },
      {
        name: 'Svelte',
        icon: '🔥',
        color: '#ff3e00',
        tagline: 'Kompilowany framework — zero runtime',
        pros: ['Kompiluje do vanilla JS — mały bundle', 'Brak Virtual DOM — bezpośrednie aktualizacje', 'Prosta, zwięzła składnia', 'Świetna wydajność'],
        cons: ['Mniejszy ekosystem', 'Mniej bibliotek UI', 'Mniejsza społeczność', 'SvelteKit jest młodszy niż Next.js'],
        vsReact: 'Svelte kompiluje się do czystego JS więc nie ma runtime overhead. Kod jest krótszy. React ma nieporównywalnie większy ekosystem.',
        bestFor: 'Projekty gdzie liczy się rozmiar paczki, interaktywne widgety do osadzania'
      },
      {
        name: 'Solid.js',
        icon: '⚡',
        color: '#2c4f7c',
        tagline: 'Prawdziwa reaktywność bez Virtual DOM',
        pros: ['Najszybszy główny framework UI', 'Fine-grained reactivity', 'API zbliżone do React (znajome hooki)', 'Mały bundle'],
        cons: ['Mała społeczność', 'Mało bibliotek', 'Nie dla wszystkich wzorce reactivity', 'Mniej ofert pracy'],
        vsReact: 'Solid jest szybszy od React bo nie ma Virtual DOM — aktualizuje DOM bezpośrednio przez signals. Składnia podobna do React, ale semantyka inna.',
        bestFor: 'Projekty performance-critical, deweloperzy znający React chcący więcej wydajności'
      },
      {
        name: 'Next.js',
        icon: '▲',
        color: '#ffffff',
        tagline: 'React meta-framework z SSR/SSG',
        pros: ['SSR, SSG, ISR out of the box', 'File-system routing', 'API routes', 'Świetna optymalizacja (Image, Font)', 'Vercel deployment'],
        cons: ['Vendor lock-in (Vercel)', 'App Router ma stromą krzywą uczenia', 'Opinionated — ogranicza elastyczność'],
        vsReact: 'Next.js jest zbudowany na React — to nie rywal tylko rozszerzenie. Dodaje SSR, routing, optymalizacje. Większość nowych projektów React używa Next.js.',
        bestFor: 'Produkcyjne aplikacje, SEO, e-commerce, blogi, portale'
      },
      {
        name: 'Qwik',
        icon: '🦋',
        color: '#18b6f6',
        tagline: 'Resumowalny framework — zero JS na start',
        pros: ['Natychmiastowe ładowanie strony', 'Resumability zamiast hydration', 'Automatyczny code splitting', 'Dobry dla Core Web Vitals'],
        cons: ['Mała społeczność', 'Nowa technologia — ryzyko', 'Inny model myślenia niż React', 'Mało tutoriali'],
        vsReact: 'Qwik rozwiązuje problem hydration który React ma w SSR. Zamiast pobierać i uruchamiać JS na kliencie, wznawia stan serwera. Futurystyczne podejście.',
        bestFor: 'Strony gdzie liczy się Core Web Vitals, content-heavy sites'
      }
    ],

    komendy: [
      {
        category: 'Tworzenie projektu',
        icon: '🚀',
        items: [
          { cmd: 'npm create vite@latest moja-apka -- --template react', desc: 'Nowy projekt React z Vite (zalecane)' },
          { cmd: 'npm create vite@latest moja-apka -- --template react-ts', desc: 'React + TypeScript z Vite' },
          { cmd: 'npx create-react-app moja-apka', desc: 'Klasyczny CRA (wolniejszy, legacy)' },
          { cmd: 'npx create-next-app@latest moja-apka', desc: 'Next.js z React (full-stack)' },
        ]
      },
      {
        category: 'Development',
        icon: '⚙️',
        items: [
          { cmd: 'npm run dev', desc: 'Uruchom serwer deweloperski (Vite)' },
          { cmd: 'npm start', desc: 'Uruchom serwer deweloperski (CRA)' },
          { cmd: 'npm run build', desc: 'Zbuduj produkcyjną wersję' },
          { cmd: 'npm run preview', desc: 'Podejrzyj build produkcyjny lokalnie' },
          { cmd: 'npm test', desc: 'Uruchom testy' },
        ]
      },
      {
        category: 'Instalacja pakietów',
        icon: '📦',
        items: [
          { cmd: 'npm install react-router-dom', desc: 'Routing' },
          { cmd: 'npm install zustand', desc: 'State management (lekki)' },
          { cmd: 'npm install @reduxjs/toolkit react-redux', desc: 'Redux Toolkit' },
          { cmd: 'npm install @tanstack/react-query', desc: 'Server state / data fetching' },
          { cmd: 'npm install axios', desc: 'HTTP client (alternatywa dla fetch)' },
          { cmd: 'npm install react-hook-form', desc: 'Formularze' },
          { cmd: 'npm install framer-motion', desc: 'Animacje' },
          { cmd: 'npm install tailwindcss', desc: 'CSS utility-first' },
        ]
      },
      {
        category: 'Narzędzia deweloperskie',
        icon: '🔧',
        items: [
          { cmd: 'React DevTools', desc: 'Rozszerzenie Chrome/Firefox — podgląd drzewa komponentów i state' },
          { cmd: 'npm install -D eslint eslint-plugin-react', desc: 'Linter dla React' },
          { cmd: 'npm install -D prettier', desc: 'Formatter kodu' },
          { cmd: 'npx storybook@latest init', desc: 'Storybook — dev i dokumentacja komponentów' },
        ]
      }
    ]
  }
};
