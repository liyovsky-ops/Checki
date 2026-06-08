const FW_REACT_DATA = {
  meta: {
    id: 'react', name: 'React', icon: '⚛️', color: '#61dafb', color2: '#7c5af7',
    tagline: 'Biblioteka UI do budowania interfejsów użytkownika',
    year: 2013, author: 'Meta (Facebook)', lang: 'JavaScript / TypeScript',
    github: 'facebook/react', stars: '220k+', codeLang: 'JSX'
  },

  tabs: [
    { id: 'podstawy',   label: 'Podstawy' },
    { id: 'komponenty', label: 'Komponenty' },
    { id: 'hooki',      label: 'Hooki' },
    { id: 'routing',    label: 'Routing' },
    { id: 'state',      label: 'State' },
    { id: 'rywale',     label: 'Rywale' },
    { id: 'pluginy',    label: 'Ekosystem' },
    { id: 'komendy',    label: 'Komendy' },
  ],

  content: {
    podstawy: {
      labels: {
        concepts: 'Kluczowe koncepcje',
        whenToUse: 'Kiedy używać React?',
        firstComponent: 'Twój pierwszy komponent',
        firstComponentLang: 'JSX'
      },
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
          desc: 'JSX to rozszerzenie składni JavaScript które wygląda jak HTML. Piszesz tagi (div, h1, MyComponent) bezpośrednio w JS — Babel kompiluje to do React.createElement() wywołań.',
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
        desc: 'Synchronizuje komponent z zewnętrznym systemem — fetch, subskrypcje, DOM. ⚠️ W React 18 Strict Mode efekt odpala się DWA RAZY w dev (mount → unmount → mount) — cleanup musi działać poprawnie.',
        when: 'Fetch API, timery, event listenery, synchronizacja z zewnętrznymi systemami',
        code: `// Przy każdym renderze
useEffect(() => { ... });

// Tylko przy montowaniu (⚠️ 2x w Strict Mode dev)
useEffect(() => { ... }, []);

// Gdy zmieni się userId
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);

// Z cleanup — WYMAGANY dla subskrypcji/timerów
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
        desc: 'Memoizuje wynik drogiego obliczenia. Przelicza tylko gdy zmienią się zależności. ⚠️ React nie gwarantuje zachowania cache — to hint dla wydajności, nie kontrakt. Nie używaj przedwcześnie.',
        when: 'Ciężkie obliczenia (filtrowanie dużych list, transformacje danych) wywoływane często',
        code: `const filteredUsers = useMemo(() => {
  return users.filter(u =>
    u.name.toLowerCase().includes(query)
  );
}, [users, query]); // przelicz tylko gdy zmieni się users lub query`
      },
      {
        name: 'useCallback',
        desc: 'Memoizuje funkcję. Zwraca tę samą referencję funkcji między renderami. ⚠️ Działa tylko gdy dziecko jest opakowane w React.memo() — bez tego i tak się re-renderuje.',
        when: 'Callbacki przekazywane do React.memo() komponentów lub jako zależności useEffect',
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
        pros: ['Kompiluje do vanilla JS — mały bundle', 'Brak Virtual DOM — bezpośrednie aktualizacje', 'Prosta, zwięzła składnia', 'Svelte 5 (2024): nowy model reaktywności przez runes ($state, $derived, $effect)'],
        cons: ['Mniejszy ekosystem', 'Mniej bibliotek UI', 'Mniejsza społeczność', 'SvelteKit jest młodszy niż Next.js'],
        vsReact: 'Svelte kompiluje się do czystego JS — zero runtime overhead. Svelte 5 wprowadził runes jako nowy model reaktywności. Kod jest krótszy, ale React ma nieporównywalnie większy ekosystem.',
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
        pros: ['SSR, SSG, ISR out of the box', 'App Router + React Server Components (RSC)', 'Server Actions — mutacje bez API endpoints', 'Świetna optymalizacja (Image, Font)', 'Vercel deployment'],
        cons: ['Vendor lock-in (Vercel)', 'App Router i RSC mają stromą krzywą uczenia', 'Pages Router vs App Router — dwie różne architektury'],
        vsReact: 'Next.js jest zbudowany na React — to nie rywal tylko rozszerzenie. App Router (Next.js 13+) wprowadził React Server Components: komponenty które renderują się na serwerze, zero JS na klienta. Większość nowych projektów React używa Next.js.',
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

    pluginy: [
      {
        name: 'Next.js',
        icon: '▲',
        color: '#e2e8f0',
        tagline: 'Full-stack React framework — SSR, SSG, API routes',
        install: 'npx create-next-app@latest my-app --typescript',
        use: 'React na serwerze — SEO, szybkie first load, API routes w tym samym projekcie, file-based routing, Image optimization. Standard dla produkcyjnych aplikacji React.',
        example: `// app/page.tsx — Server Component (domyślnie)
export default async function Home() {
  const data = await fetch('https://api.example.com/posts')
  const posts = await data.json()
  return <PostList posts={posts} />
}

// app/api/hello/route.ts — API endpoint
export async function GET() {
  return Response.json({ message: 'Hello from API' })
}`
      },
      {
        name: 'React Router',
        icon: '🛣️',
        color: '#CA4245',
        tagline: 'Routing po stronie klienta (SPA)',
        install: 'npm install react-router-dom',
        use: 'Nawigacja między widokami bez przeładowania strony. Zagnieżdżone trasy, parametry URL, lazy loading komponentów. Standard dla aplikacji SPA bez Next.js.',
        example: `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

<BrowserRouter>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/users">Users</Link>
  </nav>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:id" element={<UserPage />} />
  </Routes>
</BrowserRouter>`
      },
      {
        name: 'TanStack Query',
        icon: '🔄',
        color: '#FF4154',
        tagline: 'Server state — fetching, caching, synchronizacja',
        install: 'npm install @tanstack/react-query',
        use: 'Zarządzanie danymi z serwera — automatyczne cachowanie, background refetch, loading/error states, pagination. Zastępuje useState+useEffect do fetchowania. Must-have w każdym projekcie.',
        example: `const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
  staleTime: 5 * 60 * 1000,  // 5 min cache
})

const mutation = useMutation({
  mutationFn: (data) => fetch('/api/users', { method: 'POST', body: JSON.stringify(data) }),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
})`
      },
      {
        name: 'Zustand',
        icon: '🐻',
        color: '#FF6B35',
        tagline: 'Lekki globalny state management',
        install: 'npm install zustand',
        use: 'Globalny stan bez Redux boilerplate. Prosty API — jeden plik, jeden hook. TypeScript-friendly. Dla małych i średnich projektów. Devtools support.',
        example: `import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  user: null,
  increment: () => set((state) => ({ count: state.count + 1 })),
  setUser: (user) => set({ user }),
}))

function Counter() {
  const { count, increment } = useStore()
  return <button onClick={increment}>{count}</button>
}`
      },
      {
        name: 'Redux Toolkit',
        icon: '🔵',
        color: '#764ABC',
        tagline: 'Zaawansowany state management (duże projekty)',
        install: 'npm install @reduxjs/toolkit react-redux',
        use: 'Redux bez boilerplate. RTK Query do fetchu danych (jak TanStack Query), slices zamiast reducers+actions osobno. Dla dużych zespołów i złożonego stanu globalnego.',
        example: `const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, status: 'idle' },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
  },
})

export const { increment, decrement } = counterSlice.actions`
      },
      {
        name: 'React Hook Form',
        icon: '📝',
        color: '#EC5990',
        tagline: 'Wydajne formularze — minimum re-renderów',
        install: 'npm install react-hook-form',
        use: 'Zarządzanie formularzami z walidacją. Uncontrolled inputs = zero re-renderów przy każdym keystroke. Integracja z Zod, Yup, Joi. Najszybszy formularz w React.',
        example: `const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(LoginSchema)
})

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email')} />
  {errors.email && <span>{errors.email.message}</span>}
  <input type="password" {...register('password')} />
  <button type="submit">Zaloguj</button>
</form>`
      },
      {
        name: 'Zod',
        icon: '🛡️',
        color: '#3068B7',
        tagline: 'Walidacja schematu TypeScript-first',
        install: 'npm install zod',
        use: 'Definiujesz schemat → Zod inferuje typy TypeScript + waliduje runtime. Używany z RHF (formularze), API response validation, tRPC. Jeden schemat = typ + walidacja.',
        example: `import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(2, 'Za krótkie'),
  email: z.string().email('Zły email'),
  age: z.number().int().min(18, 'Wymagane 18+'),
})

type User = z.infer<typeof UserSchema>  // automatyczny typ TS

const result = UserSchema.safeParse(rawData)
if (!result.success) console.log(result.error.flatten())`
      },
      {
        name: 'shadcn/ui',
        icon: '🎨',
        color: '#a78bfa',
        tagline: 'Komponenty UI — kopiujesz kod, nie instalujesz package',
        install: 'npx shadcn@latest init',
        use: 'Radix UI + Tailwind CSS. Komponenty lądują w twoim projekcie — pełna kontrola nad kodem. Accessibility wbudowana. Nie biblioteka — kolekcja komponentów do modyfikacji.',
        example: `# Dodaj konkretny komponent:
npx shadcn@latest add button dialog table

# Użycie:
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

<Dialog>
  <DialogContent>
    <DialogHeader>Tytuł</DialogHeader>
    <Button variant="outline">Anuluj</Button>
  </DialogContent>
</Dialog>`
      },
      {
        name: 'Framer Motion',
        icon: '✨',
        color: '#FF0055',
        tagline: 'Animacje i przejścia — deklaratywnie',
        install: 'npm install framer-motion',
        use: 'Animacje CSS bez pisania CSS. Definiujesz stan docelowy, Framer oblicza jak tam dotrzeć. Gesture support (drag, hover, tap). Layout animations — React animuje zmiany layoutu.',
        example: `import { motion, AnimatePresence } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
  whileHover={{ scale: 1.02 }}
>
  <p>Animowana zawartość</p>
</motion.div>`
      }
    ],

    komendy: [
      {
        category: 'Tworzenie projektu',
        icon: '🚀',
        items: [
          { cmd: 'npm create vite@latest moja-apka -- --template react', desc: 'Nowy projekt React z Vite (zalecane)',
            detail: { what: 'Tworzy nowy projekt React z bundlerem Vite. Vite jest ~10x szybszy od CRA bo używa natywnych ES modules w dev — nie bundle\'uje całości, ładuje tylko to co przeglądarka prosi.', how: '`npm create` = `npm init`. Pobiera pakiet create-vite i odpala wizard. `@latest` = zawsze najnowsza wersja. `--` oddziela argumenty npm od argumentów create-vite.', flags: [{flag: '--template react', desc: 'JavaScript'}, {flag: '--template react-ts', desc: 'TypeScript'}, {flag: '--template react-swc', desc: 'JS z kompilatorem SWC (jeszcze szybszy HMR)'}], tips: ['Po stworzeniu: cd moja-apka → npm install → npm run dev', 'Struktura: src/main.jsx (entry), src/App.jsx (root)', 'Port domyślny: 5173'] }
          },
          { cmd: 'npm create vite@latest moja-apka -- --template react-ts', desc: 'React + TypeScript z Vite',
            detail: { what: 'To samo co wyżej ale z TypeScriptem. Dostajesz tsconfig.json i pliki .tsx zamiast .jsx. TypeScript wykrywa błędy przed uruchomieniem.', how: 'Vite generuje projekt z @vitejs/plugin-react, TypeScript i @types/react już w package.json. Kompilacja TS jest obsługiwana przez Vite, nie przez tsc.', tips: ['.tsx = TypeScript + JSX', 'Props typujesz: interface Props { name: string }', 'npx tsc --noEmit żeby sprawdzić typy bez budowania', 'Vite nie blokuje na błędach TS — sprawdź je osobno!'] }
          },
          { cmd: 'yarn create vite moja-apka --template react', desc: 'Vite + Yarn',
            detail: { what: 'To samo co npm create vite ale z Yarn jako package manager. Yarn jest szybszy od npm przy pierwszej instalacji dzięki równoległemu pobieraniu.', how: '`yarn create` = globalny install create-vite + wywołanie. Używa yarn.lock zamiast package-lock.json.', tips: ['Instalacja Yarn: npm install -g yarn', 'Komendy Yarn: yarn dev, yarn build, yarn add pakiet', 'yarn.lock musi być w git — gwarantuje te same wersje dla wszystkich'] }
          },
          { cmd: 'pnpm create vite moja-apka --template react', desc: 'Vite + pnpm (najszybszy)',
            detail: { what: 'Vite z pnpm — najszybszy package manager. Używa hard linków zamiast kopiowania. Jeśli masz 10 projektów z react, pnpm przechowuje go raz na dysku.', how: 'pnpm tworzy centralny store w ~/.pnpm-store. Każdy projekt linkuje się do store zamiast kopiować. node_modules jest wirtualny.', tips: ['Instalacja: npm install -g pnpm', 'Komendy: pnpm dev, pnpm build, pnpm add pakiet', 'Oszczędza gigabajty na dysku przy wielu projektach'] }
          },
          { cmd: 'npx create-react-app moja-apka', desc: 'Klasyczny CRA (legacy, wolniejszy)',
            detail: { what: 'Oficjalny starter Reacta od Meta. Działa od razu, zero konfiguracji. W 2024 uważany za legacy — Vite jest szybszy i ma lepsze DX.', how: 'CRA używa webpack pod spodem. Webpack bundle\'uje cały kod przed startem — stąd wolne cold start. Konfiguracja jest ukryta.', flags: [{flag: '--template typescript', desc: 'Z TypeScript'}, {flag: '--template cra-template-redux', desc: 'Z Redux'}], tips: ['Preferuj Vite zamiast CRA', 'Folder: build/ (nie dist/ jak w Vite)', 'Port domyślny: 3000 (nie 5173)'], note: '⚠️ CRA nie jest aktywnie rozwijany — Meta przestała go utrzymywać w 2023.' }
          },
          { cmd: 'npx create-react-app moja-apka --template typescript', desc: 'CRA + TypeScript',
            detail: { what: 'CRA z TypeScript. Dostajesz tsconfig.json, pliki .tsx i @types/react w package.json.', how: 'CRA konfiguruje babel z preset-typescript. W odróżnieniu od Vite, CRA sprawdza typy podczas kompilacji.', tips: ['Stary ale działa', 'Jeśli coś nie gra — npm install -D typescript@latest', 'Rozważ migrację do Vite + TS zamiast'] }
          },
          { cmd: 'npx create-next-app@latest moja-apka', desc: 'Next.js — full-stack React',
            detail: { what: 'Tworzy projekt Next.js — React z SSR, file-system routingiem, API routes i React Server Components. To nie alternatywa dla React, to React + supermoc.', how: 'Next.js renderuje komponenty na serwerze (RSC) lub kliencie. App Router (folder app/) = nowy standard. Pages Router (folder pages/) = legacy.', flags: [{flag: '--typescript', desc: 'TypeScript'}, {flag: '--tailwind', desc: 'Tailwind CSS'}, {flag: '--app', desc: 'App Router (domyślnie)'}, {flag: '--src-dir', desc: 'Folder src/ zamiast root'}], tips: ['App Router = Server Components domyślnie', '"use client" na górze pliku = komponent działa w przeglądarce', 'Port domyślny: 3000'] }
          },
          { cmd: 'npx create-remix@latest', desc: 'Remix — alternatywny meta-framework React',
            detail: { what: 'Tworzy projekt Remix — meta-framework skupiony na web standardach, formularzach i loaderach. Inny model myślenia niż Next.js.', how: 'Loader = fetch danych przed renderem. Action = mutacja (POST/PUT/DELETE). Formularz bez useState — web standardy.', tips: ['Mniej popularny niż Next.js ale bardzo solidny', 'Świetny dla form-heavy aplikacji', 'Kompiluje się na Node, Deno, Cloudflare Workers'] }
          },
        ]
      },
      {
        category: 'Development',
        icon: '⚙️',
        items: [
          { cmd: 'npm run dev', desc: 'Serwer deweloperski Vite — port 5173',
            detail: { what: 'Uruchamia serwer deweloperski Vite z HMR (Hot Module Replacement). Zmiana kodu = natychmiastowa aktualizacja w przeglądarce BEZ przeładowania — stan aplikacji zostaje zachowany.', how: 'Vite serwuje pliki jako ES modules. Przeglądarka importuje dokładnie to co potrzebuje. Nie bundle\'uje całości jak webpack — stąd błyskawiczny start (< 1s).', tips: ['Ctrl+C żeby zatrzymać', 'http://localhost:5173 domyślnie', 'HMR zachowuje stan — edytuj styl i widzisz zmianę bez resetu'], note: 'Jeśli port 5173 zajęty, Vite automatycznie wybierze następny wolny.' }
          },
          { cmd: 'npm run dev -- --port 3000', desc: 'Vite na konkretnym porcie',
            detail: { what: 'Uruchamia Vite dev server na porcie 3000 zamiast domyślnego 5173. Przydatne gdy inna aplikacja zajmuje 5173.', how: '`--` oddziela argumenty npm od argumentów Vite CLI. Wszystko po `--` trafia bezpośrednio do vite.', flags: [{flag: '--port NUMER', desc: 'Ustaw port'}, {flag: '--host', desc: 'Dostępny w LAN'}, {flag: '--open', desc: 'Otwórz przeglądarkę automatycznie'}, {flag: '--https', desc: 'HTTPS lokalnie'}], tips: ['Możesz to ustawić na stałe w vite.config.ts: server: { port: 3000 }'] }
          },
          { cmd: 'npm run dev -- --host', desc: 'Vite dostępny w sieci LAN (telefon, tablet)',
            detail: { what: 'Serwer deweloperski dostępny z innych urządzeń w tej samej sieci WiFi. Testuj aplikację na telefonie bez deployu.', how: 'Domyślnie Vite nasłuchuje tylko na localhost (127.0.0.1). --host zmienia to na 0.0.0.0 — wszystkie interfejsy sieciowe.', tips: ['Vite wyświetli dwa adresy: localhost i IP LAN (np. http://192.168.1.100:5173)', 'Telefon musi być w tej samej sieci WiFi', 'Sprawdź firewall jeśli nie działa z innych urządzeń'] }
          },
          { cmd: 'npm start', desc: 'Serwer deweloperski CRA — port 3000',
            detail: { what: 'Uruchamia serwer deweloperski Create React App na porcie 3000. Automatycznie otwiera przeglądarkę.', how: 'CRA używa webpack-dev-server pod spodem. Wolniejszy od Vite — bundle\'uje cały kod przy starcie (może trwać kilka sekund).', tips: ['Tylko dla CRA — w projektach Vite używaj npm run dev', 'Zapyta o zmianę portu jeśli 3000 zajęty', 'Przeglądarka otwiera się automatycznie'] }
          },
          { cmd: 'npm run build', desc: 'Buduj produkcyjną wersję',
            detail: { what: 'Buduje zoptymalizowaną wersję aplikacji: minifikuje kod, usuwa martwy kod (tree shaking), dzieli na chunki, hashuje nazwy plików.', how: 'Vite używa Rollup do bundlowania produkcji. Wynik ląduje w dist/. Pliki mają hashe w nazwach (app-D3Kv2.js) — przeglądarka wie kiedy pobrać nową wersję.', tips: ['Nigdy nie commituj folderu dist/ — dodaj do .gitignore', 'Po build sprawdź: npm run preview', 'Rozmiar bundla widoczny w terminalu po build', 'CRA generuje do build/ zamiast dist/'] }
          },
          { cmd: 'npm run preview', desc: 'Podejrzyj build lokalnie (Vite)',
            detail: { what: 'Uruchamia lokalny serwer HTTP serwujący zbudowaną wersję z dist/. Symuluje produkcję bez deployu.', how: 'To statyczny serwer — brak HMR, brak kompilacji. Używaj do weryfikacji czy build działa poprawnie przed deployem.', tips: ['Zawsze uruchom npm run build przed preview', 'Jeśli działa w dev ale nie w preview — problem z import paths lub env vars', 'Port domyślny: 4173'], note: 'preview ≠ deploy — to tylko lokalny podgląd.' }
          },
          { cmd: 'npx serve -s dist', desc: 'Serwuj dist statycznie (Vite)',
            detail: { what: 'Serwuje statyczne pliki z folderu dist/ przez HTTP. Alternatywa dla npm run preview, działa bez Vite w projekcie.', how: 'serve to minimalistyczny HTTP server. `-s` = SPA mode — wszystkie ścieżki /users/1 etc. kieruje do index.html zamiast szukać pliku.', tips: ['`-s` jest KLUCZOWY dla React Router — bez tego /users/1 zwraca 404 przy odświeżeniu', 'Zmień port: npx serve -s dist -p 8080', 'Instaluj globalnie jeśli używasz często: npm install -g serve'] }
          },
          { cmd: 'npx serve -s build', desc: 'Serwuj build statycznie (CRA)',
            detail: { what: 'To samo co serve -s dist ale dla projektów CRA, które budują do folderu build/ zamiast dist/.', how: 'Identyczne działanie — różni się tylko nazwa folderu.', tips: ['CRA → build/, Vite → dist/', 'Sprawdź w package.json skrypt build żeby wiedzieć gdzie ląduje output'] }
          },
          { cmd: 'npm run eject', desc: 'CRA: wysunij ukrytą konfigurację (NIEODWRACALNE)',
            detail: { what: 'Wysuwa ukrytą konfigurację webpack/babel/jest z CRA do twojego projektu. Zyskujesz pełną kontrolę ale też pełną odpowiedzialność.', how: 'CRA ukrywa ~1000 linii konfiguracji. Po eject dostajesz folder config/ z webpack.config.js i scripts/ z pełną logiką.', tips: ['Zrób commit PRZED ejectem — nieodwracalne!', 'W 99% przypadków nie potrzebujesz ejecta — użyj CRACO lub przejdź na Vite', 'Po eject aktualizacje konfiguracji są twoje — nie ma auto-update'], note: '⚠️ NIEODWRACALNE. Po eject nie możesz wrócić do ukrytej konfiguracji CRA.' }
          },
        ]
      },
      {
        category: 'TypeScript',
        icon: '🔷',
        items: [
          { cmd: 'npx tsc --noEmit', desc: 'Sprawdź typy — bez generowania plików JS',
            detail: { what: 'Sprawdza błędy TypeScript BEZ generowania plików .js. Czysty type check — tylko raport błędów.', how: 'Normalnie tsc kompiluje .ts → .js. --noEmit mówi "sprawdź tylko, nic nie generuj". Vite sam kompiluje TS w dev — tsc używasz tylko do weryfikacji typów.', tips: ['Uruchom przed committem żeby sprawdzić czy typy są OK', 'Błędy TS nie blokują Vite dev (tylko ostrzeżenia) — stąd potrzeba osobnego check', 'Dodaj do CI: npx tsc --noEmit || exit 1'] }
          },
          { cmd: 'npx tsc --watch', desc: 'Type check w trybie ciągłym',
            detail: { what: 'Sprawdza typy TypeScript w tle i raportuje błędy przy każdej zmianie pliku.', how: 'tsc obserwuje system plików. Tylko zmienione pliki są rekompilowane (incremental check).', tips: ['Uruchom w osobnym terminalu obok npm run dev', 'Szybsze niż pełne --noEmit po każdej zmianie'] }
          },
          { cmd: 'npx tsc --init', desc: 'Utwórz tsconfig.json',
            detail: { what: 'Generuje plik tsconfig.json z komentarzami do wszystkich dostępnych opcji. Punkt startowy konfiguracji TypeScript.', how: 'Tworzy tsconfig.json z domyślnymi ustawieniami i ~100 zakomentowanymi opcjami jako dokumentacja.', tips: ['Dla React + Vite potrzebujesz: "jsx": "react-jsx", "strict": true', 'Projekty Vite mają już tsconfig.json — nie nadpisuj przez tsc --init', 'strict: true = włącza wszystkie rygorystyczne checks (zalecane)'] }
          },
          { cmd: 'npm install -D typescript @types/react @types/react-dom', desc: 'Dodaj TypeScript do projektu JS',
            detail: { what: 'Dodaje TypeScript i typy React do istniejącego projektu JavaScript.', how: '@types/react = deklaracje typów dla całej biblioteki React. @types/react-dom = typy dla ReactDOM (createRoot itp.). Razem umożliwiają type checking kodu React.', tips: ['Wersja @types/react powinna być zgodna z wersją react w package.json', 'Po instalacji zmień pliki .jsx → .tsx', 'Dodaj tsconfig.json ręcznie lub npx tsc --init'] }
          },
          { cmd: 'npm install -D @types/node', desc: 'Typy dla Node.js w projekcie React',
            detail: { what: 'Dodaje typy TypeScript dla Node.js API: process.env, Buffer, __dirname, path itp. Potrzebne gdy w projekcie React używasz zmiennych środowiskowych lub narzędzi Node.', how: '@types/node = deklaracje dla wszystkich wbudowanych modułów Node.js. Bez tego TypeScript nie rozpoznaje process.env.VITE_API_URL.', tips: ['W Vite używaj import.meta.env zamiast process.env', 'Potrzebne głównie w plikach konfiguracyjnych (vite.config.ts, jest.config.ts)'] }
          },
        ]
      },
      {
        category: 'Testy',
        icon: '🧪',
        items: [
          { cmd: 'npm test', desc: 'Uruchom testy w trybie watch (CRA/Jest)',
            detail: { what: 'Uruchamia testy i obserwuje zmiany. Przy każdej modyfikacji pliku odpowiednie testy odpalam automatycznie.', how: 'CRA używa Jest. Testy to pliki *.test.js, *.spec.js lub w folderze __tests__/. Watch mode = nie musisz ręcznie odpalać po każdej zmianie.', tips: ['"a" — uruchom wszystkie testy', '"p" — filtruj po nazwie pliku', '"t" — filtruj po nazwie testu', '"q" — wyjdź z watch mode'] }
          },
          { cmd: 'npm test -- --coverage', desc: 'Testy + raport pokrycia kodu',
            detail: { what: 'Uruchamia testy i generuje raport coverage — pokazuje które linie/funkcje/gałęzie kodu są (nie)testowane.', how: 'Istanbul (Jest coverage) instrumentuje kod i śledzi co zostało wykonane. Wynik w folderze coverage/. Otwórz coverage/lcov-report/index.html w przeglądarce.', tips: ['80%+ coverage to dobry cel dla większości projektów', 'Coverage ≠ dobre testy — można mieć 100% złych asercji', 'Czerwone linie w raporcie = nieobjęte testami'] }
          },
          { cmd: 'npm test -- --watchAll=false', desc: 'Testy jednorazowo bez watch (CI)',
            detail: { what: 'Uruchamia wszystkie testy raz i kończy. Do użycia w pipeline CI/CD gdzie nie chcesz watch mode.', how: 'Domyślnie CRA uruchamia testy w watch mode jeśli jesteś w interaktywnym terminalu. --watchAll=false wymusza tryb jednorazowy.', tips: ['Dodaj do package.json: "test:ci": "react-scripts test --watchAll=false"', 'Zwraca exit code 1 gdy testy padną — CI wychwytuje błąd', 'Dla Vitest użyj zamiast: npx vitest run'] }
          },
          { cmd: 'npx vitest', desc: 'Vitest — szybki test runner dla Vite',
            detail: { what: 'Nowoczesny test runner zaprojektowany dla Vite. Dużo szybszy od Jest, natywnie rozumie ES modules i TypeScript bez konfiguracji.', how: 'Vitest używa tej samej konfiguracji Vite co dev. Testy w *.test.ts, *.spec.ts. Domyślnie watch mode.', tips: ['describe(), it(), expect() — identyczne API jak Jest', 'Skonfiguruj w vite.config.ts: test: { environment: "jsdom" }', 'Dużo szybszy od Jest dla projektów TypeScript'] }
          },
          { cmd: 'npx vitest run', desc: 'Vitest jednorazowo (CI)',
            detail: { what: 'Vitest w trybie CI — uruchamia testy raz i wychodzi z kodem 0 (sukces) lub 1 (błąd).', how: 'Bez watch mode. Idealny do GitHub Actions, GitLab CI i innych pipeline\'ów.', tips: ['W package.json: "test:ci": "vitest run"', 'Dodaj --reporter=verbose dla szczegółowych wyników w CI'] }
          },
          { cmd: 'npx vitest --ui', desc: 'Vitest — graficzny UI w przeglądarce',
            detail: { what: 'Otwiera graficzny interfejs Vitest w przeglądarce. Widzisz listę testów, ich status, kod, coverage.', how: 'Vitest UI to web app działająca lokalnie. Możesz klikać testy, filtrować, widzieć szczegóły błędów.', tips: ['Wymaga: npm install -D @vitest/ui', 'Świetne do debugowania konkretnych testów', 'Działa razem z watch mode'] }
          },
          { cmd: 'npx vitest --coverage', desc: 'Vitest + raport pokrycia kodu',
            detail: { what: 'Vitest z raportem coverage — pokazuje które linie kodu są objęte testami.', how: 'Vitest używa @vitest/coverage-v8 lub @vitest/coverage-istanbul. Generuje raport w coverage/.', tips: ['Wymaga: npm install -D @vitest/coverage-v8', 'Skonfiguruj progi: coverage: { thresholds: { lines: 80 } }'] }
          },
          { cmd: 'npx playwright install', desc: 'Playwright — pobierz przeglądarki do testów e2e',
            detail: { what: 'Pobiera przeglądarki (Chromium, Firefox, WebKit) potrzebne do testów e2e Playwright. Pierwszy krok przed pisaniem testów.', how: 'Playwright steruje prawdziwymi przeglądarkami przez DevTools Protocol. Testy symulują realne kliknięcia, wpisywanie, nawigację.', flags: [{flag: 'chromium', desc: 'Tylko Chromium'}, {flag: 'firefox', desc: 'Tylko Firefox'}, {flag: '--with-deps', desc: 'Zainstaluj systemowe zależności'}], tips: ['Przeglądarki lądują w ~/.cache/ms-playwright', 'Pierwszy install: może trwać kilka minut (pobiera ~300MB)', 'Bez tego kroku: npx playwright test zwróci błąd'] }
          },
          { cmd: 'npx playwright test', desc: 'Uruchom testy e2e Playwright',
            detail: { what: 'Uruchamia testy end-to-end Playwright. Otwiera prawdziwe przeglądarki, klika po aplikacji, sprawdza wyniki.', how: 'Szuka plików *.spec.ts w folderze tests/ lub e2e/. Domyślnie headless (bez okna przeglądarki).', flags: [{flag: '--headed', desc: 'Pokaż okno przeglądarki'}, {flag: '--ui', desc: 'Graficzny interfejs do debugowania'}, {flag: '--debug', desc: 'Debugger krok po kroku'}, {flag: '--project=chromium', desc: 'Tylko konkretna przeglądarka'}], tips: ['npx playwright show-report — raport HTML po testach', 'Playwright vs Cypress: Playwright jest szybszy i obsługuje wiele zakładek'] }
          },
          { cmd: 'npx cypress open', desc: 'Cypress — graficzny interfejs testów e2e',
            detail: { what: 'Otwiera graficzny interfejs Cypress. Widzisz aplikację i testy na żywo — możesz klikać po aplikacji i debugować testy interaktywnie.', how: 'Cypress uruchamia własną przeglądarkę. Time-travel debugging — możesz cofać się do każdego kroku testu i widzieć stan aplikacji.', tips: ['Cypress vs Playwright: Cypress łatwiejszy na start, Playwright szybszy i bardziej zaawansowany', 'Testy lądują w cypress/e2e/', 'Świetne do nauki testowania bo widzisz co się dzieje'] }
          },
          { cmd: 'npx cypress run', desc: 'Cypress headless — dla CI/CD',
            detail: { what: 'Uruchamia testy Cypress bez GUI. Zapisuje video i screenshoty. Dla pipeline\'ów CI/CD.', how: 'Domyślnie używa Electron. Można wybrać Chrome lub Firefox.', flags: [{flag: '--browser chrome', desc: 'Chrome zamiast Electron'}, {flag: '--spec "cypress/e2e/login.cy.js"', desc: 'Tylko jeden plik testów'}, {flag: '--headless', desc: 'Bez okna (domyślnie w cypress run)'}], tips: ['Video i screenshoty w cypress/videos/ i cypress/screenshots/', 'Dodaj do CI: npx cypress run --record żeby nagrywać w Cypress Cloud'] }
          },
          { cmd: 'npm install -D vitest @vitest/ui jsdom', desc: 'Zainstaluj Vitest + jsdom (środowisko DOM)',
            detail: { what: 'Instaluje Vitest, jego graficzny UI i jsdom — symulację przeglądarki dla testów jednostkowych komponentów React.', how: 'jsdom implementuje DOM API w Node.js — dzięki temu testy React mogą renderować komponenty bez prawdziwej przeglądarki.', tips: ['Po instalacji dodaj do vite.config.ts: test: { environment: "jsdom" }', 'jsdom ≠ prawdziwa przeglądarka — dla pełnych e2e użyj Playwright/Cypress'] }
          },
          { cmd: 'npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event', desc: 'Testing Library — testuj komponenty jak użytkownik',
            detail: { what: 'Testing Library to zestaw narzędzi do testowania komponentów React z perspektywy użytkownika — nie implementacji. Klikasz, wpisujesz, sprawdzasz co widać na ekranie.', how: '@testing-library/react = renderowanie komponentów w testach. @testing-library/jest-dom = dodatkowe matchery (toBeInTheDocument, toHaveValue). @testing-library/user-event = symulacja akcji użytkownika.', tips: ['Filozofia: testuj co widzi użytkownik, nie szczegóły implementacji', 'getByRole, getByText zamiast getById — bardziej odporne na refaktor', 'userEvent.click() > fireEvent.click() — bardziej realistyczna symulacja'] }
          },
        ]
      },
      {
        category: 'Zarządzanie paczkami',
        icon: '📦',
        items: [
          { cmd: 'npm install', desc: 'Zainstaluj wszystkie zależności z package.json',
            detail: { what: 'Instaluje wszystkie paczki zdefiniowane w package.json. Pierwsze co robisz po sklonowaniu cudzego repo.', how: 'npm czyta package.json, pobiera paczki z npmjs.com, instaluje dokładne wersje z package-lock.json (jeśli istnieje). Tworzy folder node_modules.', tips: ['npm install = npm i (skrót)', 'Po git clone zawsze: npm install', 'node_modules NIGDY nie commituj — jest w .gitignore', 'Usuń node_modules i npm install od nowa jeśli coś dziwnego'] }
          },
          { cmd: 'npm install react-router-dom', desc: 'Dodaj paczkę jako zależność produkcyjną',
            detail: { what: 'Dodaje paczkę do dependencies w package.json. Dependencies = paczki potrzebne w produkcji (kod który trafia do użytkownika).', how: 'npm pobiera paczkę i jej zależności, aktualizuje package.json (dodaje wpis) i package-lock.json (blokuje wersję).', flags: [{flag: '-D lub --save-dev', desc: 'Dodaj jako devDependency (tylko dla developmentu)'}, {flag: '@wersja', desc: 'react@18.2.0 — konkretna wersja'}, {flag: '@latest', desc: 'Zawsze najnowsza wersja'}, {flag: '--legacy-peer-deps', desc: 'Ignoruj konflikty peer deps'}], tips: ['dependencies = produkcja (np. react, axios)', 'devDependencies = tylko dev (np. vitest, eslint)', 'npm i pakiet@latest — gwarantuje najnowszą'] }
          },
          { cmd: 'npm install -D vitest', desc: 'Dodaj paczkę jako devDependency',
            detail: { what: 'Dodaje paczkę do devDependencies — paczek używanych tylko podczas developmentu. Nie trafiają do produkcyjnego bundla.', how: '-D = --save-dev. Paczka ląduje w sekcji devDependencies w package.json zamiast dependencies.', tips: ['DevDeps: vitest, eslint, prettier, @types/*, storybook', 'Deps: react, axios, zustand, react-router-dom', 'npm install --production = zainstaluje tylko dependencies (pomija devDeps)'] }
          },
          { cmd: 'npm uninstall nazwa-paczki', desc: 'Usuń paczkę z projektu',
            detail: { what: 'Usuwa paczkę z node_modules I z package.json jednocześnie. Jedyny prawidłowy sposób usuwania paczek.', how: 'npm usuwa folder paczki, aktualizuje package.json i package-lock.json. Opcjonalne zależności paczki zostają jeśli ktoś inny ich używa.', tips: ['npm uninstall = npm un lub npm rm (skróty)', 'NIE usuwaj ręcznie z node_modules — użyj npm uninstall', 'Dodaj -D żeby usunąć z devDependencies: npm uninstall -D eslint'] }
          },
          { cmd: 'npm update', desc: 'Zaktualizuj paczki (w ramach semver)',
            detail: { what: 'Aktualizuje zainstalowane paczki do najnowszych wersji ZGODNYCH z ograniczeniami w package.json.', how: 'Semver: ^18.0.0 = akceptuje 18.x.x ale nie 19.0.0. ~18.0.0 = tylko 18.0.x. npm update = max co semver pozwala.', tips: ['Bezpieczne — nie łamie API (tylko patch i minor updates)', 'Dla major update: npm install pakiet@latest', 'npm outdated pokazuje co można zaktualizować przed update'] }
          },
          { cmd: 'npm outdated', desc: 'Sprawdź które paczki mają nowsze wersje',
            detail: { what: 'Wyświetla tabelę paczek z dostępnymi nowszymi wersjami: Current (zainstalowana), Wanted (max semver), Latest (absolutnie najnowsza).', how: 'npm odpytuje rejestr npmjs.com i porównuje z zainstalowanymi wersjami.', tips: ['Czerwone = chcesz update (w zakresie semver)', 'Żółte = dostępny update major', 'Sprawdzaj regularnie dla security patches', 'npm install pakiet@latest żeby przejść na najnowszą major'] }
          },
          { cmd: 'npm audit', desc: 'Skanuj paczki pod kątem luk bezpieczeństwa',
            detail: { what: 'Skanuje zainstalowane paczki pod kątem znanych luk bezpieczeństwa (CVE). Raportuje severity: critical / high / moderate / low.', how: 'npm sprawdza package-lock.json względem bazy bezpieczeństwa npm (advisory database). Lista CVE aktualizowana na bieżąco.', tips: ['Uruchamiaj przed deployem produkcyjnym', 'npm audit --json dla machine-readable output', 'Nie panikuj przy low/moderate — oceń czy twoja aplikacja jest podatna'] }
          },
          { cmd: 'npm audit fix', desc: 'Automatycznie napraw luki bezpieczeństwa',
            detail: { what: 'Automatycznie aktualizuje zależności z lukami do bezpiecznych wersji.', how: 'npm stara się znaleźć i zainstalować wersje bez CVE. Może nie naprawić wszystkiego — niektóre wymagają major update.', flags: [{flag: '--force', desc: 'Wymuś aktualizacje major (może złamać API!)'}], tips: ['Sprawdź zmiany po audit fix: npm test', '--force to ostateczność — może zepsuć aplikację', 'Przejrzyj co zostało zmienione w package-lock.json'], note: '⚠️ --force może zmienić major wersje i złamać Twój kod. Testuj po użyciu.' }
          },
          { cmd: 'npm install --legacy-peer-deps', desc: 'Instaluj mimo konfliktów peer dependencies',
            detail: { what: 'Instaluje paczki ignorując konflikty peer dependencies. Używaj gdy npm blokuje instalację z błędem o peer dep conflict.', how: 'npm 7+ jest rygorystyczny ws. peer deps. --legacy-peer-deps wraca do zachowania npm 6 gdzie konflikty były ignorowane (nie blokowane).', tips: ['To obejście, nie naprawa — sprawdź czy paczki są naprawdę kompatybilne', 'Częsty problem: stare paczki z React 17 w projekcie React 18', 'Alternatywa: --force (bardziej agresywne)'], note: '⚠️ Użyj gdy wiesz co robisz — ignorowanie peer deps może powodować runtime błędy.' }
          },
          { cmd: 'npm list --depth=0', desc: 'Lista zainstalowanych paczek (bez zagnieżdżeń)',
            detail: { what: 'Wyświetla zainstalowane paczki pierwszego poziomu — tylko twoje bezpośrednie zależności, bez ich zależności.', how: 'Bez --depth=0 widać całe drzewo — setki lub tysiące linii. depth=0 = tylko co masz w package.json.', tips: ['npm list = npm ls (skrót)', 'npm list react — sprawdź wersję konkretnej paczki', 'npm list --global — globalnie zainstalowane paczki'] }
          },
          { cmd: 'npm cache clean --force', desc: 'Wyczyść cache npm',
            detail: { what: 'Czyści lokalny cache npm (~/.npm). Rozwiązuje problemy z uszkodzonymi lub niekompletnymi paczkami.', how: 'npm cachuje pobrane paczki żeby nie pobierać ponownie przy kolejnym install. Czasem cache się psuje i powoduje dziwne błędy.', tips: ['Używaj gdy: npm install się wiesza, błędy ENOENT, dziwne zachowanie po aktualizacji npm', 'Po clean następny npm install pobierze wszystko od nowa (wolniejszy)', 'Bezpieczne — cache można zawsze odbudować'] }
          },
        ]
      },
      {
        category: 'Popularne paczki UI',
        icon: '🎨',
        items: [
          { cmd: 'npm install react-router-dom', desc: 'Routing — nawigacja między stronami',
            detail: { what: 'Routing dla React — zarządzanie ścieżkami URL. /home → <Home />, /users/1 → <UserProfile />. Bez tego aplikacja to jedna strona bez nawigacji.', how: 'Używa HTML5 History API. BrowserRouter otacza aplikację, Routes/Route definiują mapę URL→komponent. Link zamiast <a> — nie przeładowuje strony.', tips: ['v7 jest aktualny (API zgodne z v6)', 'useNavigate() do programatycznej nawigacji', 'useParams() do czytania parametrów z URL (/users/:id)'] }
          },
          { cmd: 'npm install zustand', desc: 'State management — prosty, ~1KB',
            detail: { what: 'Minimalistyczny globalny state management. Zastępuje Context + useReducer bez boilerplate. ~1KB gzip.', how: 'create() definiuje store ze stanem i akcjami. useStore() hook daje dostęp. Automatyczne re-rendery tylko gdy używany fragment stanu się zmienia.', tips: ['Brak Provider! Store jest globalny przez import', 'Devtools: middleware devtools do Redux DevTools', 'Immer middleware dla mutacji: set(state => { state.count++ })'] }
          },
          { cmd: 'npm install @reduxjs/toolkit react-redux', desc: 'Redux Toolkit — enterprise state management',
            detail: { what: 'Redux Toolkit to oficjalny, nowoczesny sposób pisania Reduxa. Eliminuje ~70% boilerplate starego Reduxa. Dla dużych aplikacji z wieloma developerami.', how: 'createSlice() generuje reducer + action creators. configureStore() łączy wszystko. Immer wbudowany — możesz "mutować" state bezpośrednio.', tips: ['Zustand dla małych-średnich projektów, RTK dla dużych teamów', 'Redux DevTools Extension — time-travel debugging', 'RTK Query wbudowany — odpowiednik TanStack Query'] }
          },
          { cmd: 'npm install @tanstack/react-query', desc: 'Server state — dane z API z cache',
            detail: { what: 'Zarządza danymi z API: cache, automatyczny refetch, loading/error state, retry, optimistic updates. Zastępuje useEffect + useState do fetchowania.', how: 'useQuery() pobiera i cachuje dane. useMutation() do POST/PUT/DELETE. QueryClient zarządza globalnym cache. staleTime kontroluje jak długo dane są "świeże".', tips: ['Wrap aplikacji w <QueryClientProvider client={queryClient}>', 'queryKey to unikalna tablica — klucz cache', 'Devtools: npm install -D @tanstack/react-query-devtools', 'staleTime: 5 * 60 * 1000 = dane świeże przez 5 minut'] }
          },
          { cmd: 'npm install jotai', desc: 'Atomowy state management',
            detail: { what: 'State management oparty na atomach — małych kawałkach stanu. Każdy komponent subskrybuje tylko atomy których używa.', how: 'atom() definiuje kawałek stanu. useAtom() = jak useState ale globalny. Atomy można łączyć i derywować z innych atomów.', tips: ['Prostszy model niż Redux, podobny do Recoil', 'atom(get => get(aAtom) + get(bAtom)) = derived atom', 'Brak boilerplate — atom + useAtom i gotowe'] }
          },
          { cmd: 'npm install axios', desc: 'HTTP client — alternatywa dla fetch',
            detail: { what: 'Biblioteka do zapytań HTTP. Automatycznie parsuje JSON, obsługuje błędy, interceptory, timeout, cancel token.', how: 'Wrappuje fetch/XMLHttpRequest. Zwraca Promise z { data, status, headers }. Błędy HTTP (404, 500) automatycznie rzucają wyjątek (fetch tego nie robi!).', tips: ['axios.get/post/put/delete — metody HTTP', 'Interceptory: axios.interceptors.request.use() — dodaj token auth do każdego requesta', 'Twórz instancje: axios.create({ baseURL: "/api" })'] }
          },
          { cmd: 'npm install react-hook-form', desc: 'Wydajne formularze z minimalną liczbą re-renderów',
            detail: { what: 'Biblioteka do formularzy w React. Używa uncontrolled inputs (ref zamiast state) — zero re-renderów przy wpisywaniu. Integruje się z Zod do walidacji.', how: 'useForm() zwraca register (łączy input z formularzem), handleSubmit, formState. Walidacja przy submit lub onChange.', tips: ['react-hook-form + zod = potężna kombinacja do typowanej walidacji', 'register("email") zamiast useState + onChange', 'formState.errors.email?.message — błędy walidacji'] }
          },
          { cmd: 'npm install zod', desc: 'Walidacja danych + automatyczne typy TypeScript',
            detail: { what: 'Biblioteka do walidacji i parsowania danych z TypeScript-first podejściem. Definiujesz schemat → automatycznie infurujesz typ TypeScript.', how: 'z.object() tworzy schemat. .parse() rzuca błąd jeśli dane nie pasują. .safeParse() zwraca {success, data/error}. z.infer<typeof schema> = typ TS.', tips: ['Idealna para: react-hook-form + zodResolver(schema)', 'Używaj do walidacji odpowiedzi API — upewnij się że backend zwraca to co myślisz', 'z.string().email().min(5) — chain walidatorów'] }
          },
          { cmd: 'npm install framer-motion', desc: 'Animacje i przejścia komponentów',
            detail: { what: 'Biblioteka animacji dla React. Deklaratywne animacje, physics-based spring animations, layout animations, gesture handling.', how: '<motion.div animate={{ opacity: 1 }}> zamiast CSS transitions. AnimatePresence do animowania unmount komponentów.', tips: ['<motion.div whileHover={{ scale: 1.1 }}> — hover animacja', 'AnimatePresence = animuj wyjście komponentów', 'Warianty: definiuj stany animacji i przełączaj je'] }
          },
          { cmd: 'npm install tailwindcss @tailwindcss/vite', desc: 'Tailwind CSS — utility-first styling',
            detail: { what: 'CSS framework oparty na klasach narzędziowych. Budujesz UI bezpośrednio w JSX przez klasy: className="flex items-center gap-4 bg-blue-500 text-white p-4 rounded-lg".', how: 'Tailwind generuje tylko CSS klas których używasz (tree shaking). Wynik: minimalne pliki CSS w produkcji.', tips: ['Zainstaluj rozszerzenie Tailwind CSS IntelliSense w VS Code', 'cn() z clsx lub tailwind-merge do warunkowych klas', 'tailwind.config.ts do rozszerzania motywu (kolory, fonty)'] }
          },
          { cmd: 'npm install @mui/material @emotion/react @emotion/styled', desc: 'Material UI — gotowe komponenty Google Material Design',
            detail: { what: 'Kompletna biblioteka komponentów UI w stylu Google Material Design. Button, TextField, Dialog, Table, DatePicker i 50+ innych — wszystko gotowe.', how: '@emotion = CSS-in-JS engine pod spodem MUI. @mui/material = komponenty. Duży bundle ale bogaty ekosystem.', tips: ['Opatrz całą aplikację w <ThemeProvider theme={theme}>', 'Customizacja: sx prop lub createTheme()', 'MUI v5+ używa emotion — nie mylić z starym JSS'] }
          },
          { cmd: 'npm install @radix-ui/react-dialog', desc: 'Radix UI — dostępne prymitywy komponentów',
            detail: { what: 'Nieostylowane, ale w pełni dostępne (a11y) prymitywy UI. Dialog, Dropdown, Tooltip, Select — logika bez narzuconego wyglądu. Styluj sam.', how: 'Każdy prymityw to osobna paczka. Obsługuje keyboard navigation, screen readers, focus management automatycznie.', tips: ['Idealne razem z Tailwind — logika z Radix, style z Tailwind', 'shadcn/ui = gotowe komponenty oparte na Radix + Tailwind', 'Dostępność (ARIA) obsługiwana automatycznie'] }
          },
          { cmd: 'npm install lucide-react', desc: 'Ikony SVG dla React',
            detail: { what: '1000+ ikon SVG jako komponenty React. Lekkie, tree-shakeable, łatwe w customizacji.', how: 'Każda ikona to osobny komponent SVG. Importujesz tylko te których używasz — reszta nie trafia do bundla.', tips: ['import { Home, Settings, User } from "lucide-react"', '<Home size={24} color="#fff" strokeWidth={1.5} />', 'Alternatywy: react-icons (5000+ ikon, ale większe), heroicons'] }
          },
          { cmd: 'npm install date-fns', desc: 'Manipulacja datami — lekka alternatywa dla moment.js',
            detail: { what: 'Biblioteka do pracy z datami: formatowanie, parsowanie, obliczenia (addDays, differenceInDays, isAfter). Tree-shakeable — płacisz tylko za to czego używasz.', how: 'Czyste funkcje (nie mutują). Każda funkcja to osobny import.', tips: ['format(new Date(), "dd.MM.yyyy") = "05.06.2026"', 'Alternatywy: dayjs (mniejsza), Temporal API (nadchodzi w JS)', 'Unikaj moment.js — 67KB gzip, deprecated'] }
          },
          { cmd: 'npm install react-hot-toast', desc: 'Powiadomienia toast — lekkie i piękne',
            detail: { what: 'Minimalistyczna biblioteka do powiadomień (toastów). Mały bundle, obsługuje promise, emoji, custom style.', how: 'Dodaj <Toaster /> do root. Wywołaj toast("Sukces!") z dowolnego miejsca.', tips: ['toast.success("Zapisano!"), toast.error("Błąd!")', 'toast.promise(fetchData(), { loading: "...", success: "OK", error: "Błąd" })', 'Alternatywy: sonner, react-toastify'] }
          },
        ]
      },
      {
        category: 'Analiza bundla',
        icon: '📊',
        items: [
          { cmd: 'npm install -D source-map-explorer', desc: 'Analizuj rozmiar bundla CRA',
            detail: { what: 'Narzędzie do analizy rozmiaru bundla — pokazuje treemap ile miejsca zajmuje każda paczka i plik. Pomaga znaleźć "pożeracze" rozmiaru.', how: 'Odczytuje source mapy generowane przez build. Wynik to interaktywna mapa treemap w przeglądarce.', tips: ['Po instalacji: npx source-map-explorer build/static/js/*.js', 'Typowe odkrycia: lodash zamiast lodash-es, moment.js (użyj date-fns), duplikaty paczek', 'Duży kwadrat = kandydat do lazy loading lub zastąpienia'] }
          },
          { cmd: 'npx source-map-explorer build/static/js/*.js', desc: 'Uruchom analizę bundla (CRA)',
            detail: { what: 'Otwiera interaktywną wizualizację zawartości bundla CRA. Widzisz co zajmuje ile bajtów.', how: 'Parsuje source mapy z folderu build/static/js/. Każdy plik i paczka ma swój prostokąt proporcjonalny do rozmiaru.', tips: ['Uruchom npm run build przed tym poleceniem', 'Szukaj nieoczekiwanych dużych paczek', 'Vite odpowiednik: rollup-plugin-visualizer'] }
          },
          { cmd: 'npm install -D rollup-plugin-visualizer', desc: 'Wizualizacja bundla Vite',
            detail: { what: 'Plugin Vite/Rollup generujący interaktywną mapę rozmiaru bundla. Odpowiednik source-map-explorer dla projektów Vite.', how: 'Dodaj do vite.config.ts: import { visualizer } from "rollup-plugin-visualizer"; plugins: [visualizer({ open: true })]. Po build automatycznie otwiera stats.html.', tips: ['open: true = automatycznie otwórz po build', 'gzipSize: true = pokaż rozmiar po kompresji (bardziej realistyczny)', 'Szukaj dużych kwadratów — dynamiczny import() dzieli je na osobne chunki'] }
          },
          { cmd: 'npm run build -- --mode analyze', desc: 'Build z raportem bundle size',
            detail: { what: 'Uruchamia build z trybem "analyze" — jeśli skonfigurowany, generuje raport rozmiaru bundla.', how: 'Wymaga konfiguracji w vite.config.ts: jeśli mode === "analyze", dodaj plugin visualizer.', tips: ['Musi być skonfigurowany ręcznie w vite.config.ts', 'Alternatywa: zawsze miej visualizer w pluginach z opcją open: process.env.ANALYZE'] }
          },
          { cmd: 'npx bundlephobia nazwa-paczki', desc: 'Sprawdź rozmiar paczki PRZED instalacją',
            detail: { what: 'Sprawdza rozmiar paczki npm zanim ją zainstalujesz — minified + gzip size, czas ładowania na różnych połączeniach.', how: 'Pobiera paczkę, buduje ją i mierzy rozmiar. Używa API bundlephobia.com.', tips: ['Alternatywa: bundlephobia.com w przeglądarce', 'Zawsze sprawdź przed instalacją — moment.js to 67KB gzip!', 'Szukaj "tree-shakeable" w opisie — płacisz tylko za to czego używasz'] }
          },
        ]
      },
      {
        category: 'Deploy',
        icon: '🚢',
        items: [
          { cmd: 'npx vercel', desc: 'Deploy na Vercel (preview)',
            detail: { what: 'Deployuje aplikację na Vercel — platformę hostingową od twórców Next.js. Automatycznie wykrywa framework (Vite, Next, CRA) i konfiguruje build.', how: 'Vercel buduje aplikację na swoich serwerach, deployuje na globalny CDN. Każdy deploy dostaje unikalny URL.', tips: ['Pierwsze użycie: vercel login', 'Bez --prod = deploy preview (do testowania)', 'Połącz repo GitHub: każdy push na main = auto deploy', 'Darmowy tier: 100GB bandwidth/miesiąc'] }
          },
          { cmd: 'npx vercel --prod', desc: 'Deploy produkcyjny na Vercel',
            detail: { what: 'Deploy na produkcyjny URL (twoja-apka.vercel.app). Bez --prod Vercel tworzy preview URL (twoja-apka-abc123.vercel.app).', how: 'Promuje build do produkcji. Vercel zachowuje poprzednie deploye — możesz rollback jednym kliknięciem w dashboardzie.', tips: ['Upewnij się że build przechodzi lokalnie przed --prod', 'Sprawdź environment variables w Vercel Dashboard', 'Instant rollback: vercel rollback w przypadku problemów'] }
          },
          { cmd: 'npx netlify deploy', desc: 'Deploy na Netlify (draft)',
            detail: { what: 'Deploy na Netlify — alternatywna platforma hostingowa. Tworzy draft deploy z unikalnym URL do podglądu.', how: 'Netlify serwuje statyczne pliki z CDN. Plik netlify.toml do konfiguracji build command i publish directory.', flags: [{flag: '--prod', desc: 'Deploy produkcyjny'}, {flag: '--dir dist', desc: 'Wskaż folder (domyślnie pyta)'}], tips: ['netlify login — pierwsze użycie', 'netlify.toml: [build] command = "npm run build" publish = "dist"', 'Netlify Functions = serverless functions bez dodatkowej konfiguracji'] }
          },
          { cmd: 'npx netlify deploy --prod', desc: 'Deploy produkcyjny na Netlify',
            detail: { what: 'Publikuje na produkcyjnym URL Netlify. Bez --prod to tylko draft.', how: 'Netlify wysyła pliki z folderu dist/ lub build/ na CDN i aktualizuje produkcyjny URL.', tips: ['Darmowy tier: 100GB/miesiąc', 'Formularz bez backendu: Netlify Forms (dodaj netlify do <form>)', 'Zmienne środowiskowe: Site Settings → Environment Variables'] }
          },
          { cmd: 'npm install -D gh-pages', desc: 'GitHub Pages — zainstaluj narzędzie deploy',
            detail: { what: 'Instaluje gh-pages — narzędzie do publikowania na GitHub Pages. Darmowy hosting statycznych stron bezpośrednio z repozytorium GitHub.', how: 'gh-pages tworzy lub aktualizuje branch gh-pages w repozytorium, pushuje tam zawartość dist/. GitHub automatycznie serwuje ten branch.', tips: ['Po instalacji dodaj do package.json scripts: "deploy": "npm run build && gh-pages -d dist"', 'W vite.config.ts ustaw: base: "/nazwa-repo/" (ważne!)', 'URL: https://username.github.io/nazwa-repo/'], note: '⚠️ Ustaw base w vite.config.ts! Bez tego assety nie załadują się na GitHub Pages.' }
          },
          { cmd: 'npx gh-pages -d dist', desc: 'GitHub Pages — opublikuj dist/ (Vite)',
            detail: { what: 'Publikuje folder dist/ na branch gh-pages → automatycznie dostępne na GitHub Pages. Dla projektów Vite.', how: 'gh-pages commituje zawartość dist/ na branch gh-pages. GitHub serwuje ten branch przez CDN.', tips: ['Zawsze uruchom npm run build przed gh-pages', 'Może minąć 1-2 minuty zanim zmiany będą widoczne', 'Sprawdź repo Settings → Pages → Source = gh-pages branch'] }
          },
          { cmd: 'npx gh-pages -d build', desc: 'GitHub Pages — opublikuj build/ (CRA)',
            detail: { what: 'To samo co gh-pages -d dist ale dla projektów CRA które budują do folderu build/ zamiast dist/.', how: 'Identyczne działanie — różni się tylko nazwa folderu wyjściowego.', tips: ['CRA → build/, Vite → dist/', 'W CRA ustaw "homepage" w package.json: "https://username.github.io/repo"'] }
          },
        ]
      },
      {
        category: 'Jakość kodu',
        icon: '🔧',
        items: [
          { cmd: 'npm run lint', desc: 'Uruchom ESLint — znajdź problemy w kodzie',
            detail: { what: 'Uruchamia ESLint — statyczny analizator kodu. Wykrywa błędy, problematyczne wzorce (unused vars, missing deps w useEffect), wymusza styl.', how: 'ESLint czyta konfigurację (eslint.config.js). Analizuje pliki bez uruchamiania kodu.', tips: ['Dodaj do scripts: "lint": "eslint src --ext .js,.jsx,.ts,.tsx"', 'Vite generuje podstawową konfigurację ESLint', 'Disable dla linii: // eslint-disable-next-line'] }
          },
          { cmd: 'npx eslint . --fix', desc: 'ESLint z auto-naprawą problemów',
            detail: { what: 'ESLint automatycznie poprawia co da się naprawić: formatowanie, cudzysłowy, średniki, import ordering. Problemy logiczne musisz naprawić ręcznie.', how: 'Nie wszystko da się auto-naprawić. Fixable = problemy ze stylem. Unfixable = logiczne błędy (react-hooks/exhaustive-deps, unused vars).', tips: ['Sprawdź co zmieniło: git diff po --fix', '--fix-dry-run = pokaż co by naprawił bez zmian', 'Uruchom przed committem żeby wyczyścić styl'] }
          },
          { cmd: 'npx prettier --write .', desc: 'Prettier — sformatuj cały projekt',
            detail: { what: 'Prettier formatuje cały kod w projekcie: wcięcia, długość linii, cudzysłowy, przecinki. Jedno źródło prawdy dla stylu — koniec z dyskusjami o formatowaniu.', how: 'Prettier parsuje kod i regeneruje go od zera według swoich reguł. Deterministyczny — zawsze ten sam wynik niezależnie od autora.', tips: ['Konfiguracja: .prettierrc: {"semi": false, "singleQuote": true, "tabWidth": 2}', '.prettierignore: pomiń node_modules, dist, .env', 'VS Code: Format on Save z Prettier extension'] }
          },
          { cmd: 'npx prettier --check .', desc: 'Prettier — sprawdź formatowanie (CI)',
            detail: { what: 'Sprawdza czy kod jest sformatowany przez Prettier BEZ zmian. Dla pipeline\'ów CI/CD — blokuje nieoformatowany kod.', how: 'Zwraca exit code 1 jeśli cokolwiek wymaga formatowania. CI widzi błąd i blokuje merge.', tips: ['Dodaj do CI: npx prettier --check . || exit 1', 'Lokalnie: uruchom --write, commit formatuje CI --check', 'Dobre jako pre-commit hook z husky'] }
          },
          { cmd: 'npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks', desc: 'Zainstaluj ESLint z pluginami React',
            detail: { what: 'Instaluje ESLint i pluginy specyficzne dla React: eslint-plugin-react (reguły komponentów) i eslint-plugin-react-hooks (reguły hooków — brakujące zależności useEffect).', how: 'eslint-plugin-react-hooks/exhaustive-deps to jeden z najważniejszych pluginów — wykrywa brakujące zależności w tablicy deps useEffect.', tips: ['eslint-plugin-react-hooks jest KLUCZOWY — ratuje przed subtelnym bugami', 'Vite dodaje ESLint domyślnie w projektach TS', 'Sprawdź eslint.config.js po instalacji'] }
          },
          { cmd: 'npm install -D prettier eslint-config-prettier', desc: 'Prettier + integracja z ESLint',
            detail: { what: 'Prettier do formatowania + eslint-config-prettier wyłącza reguły ESLint które kolidują z Prettier. Obie działają razem bez konfliktu.', how: 'eslint-config-prettier wyłącza wszystkie reguły ESLint dotyczące formatowania. Prettier przejmuje formatowanie, ESLint zajmuje się logiką.', tips: ['Dodaj do eslint.config.js: extends: ["prettier"]', 'Jeśli ESLint i Prettier się kłócą — eslint-config-prettier to fix', 'eslint-plugin-prettier — opcjonalnie: Prettier jako reguła ESLint'] }
          },
          { cmd: 'npx storybook@latest init', desc: 'Storybook — inicjalizuj środowisko komponentów',
            detail: { what: 'Instaluje i konfiguruje Storybook — izolowane środowisko do developmentu i dokumentacji komponentów. Budujesz komponenty bez uruchamiania całej apki.', how: 'Storybook automatycznie wykrywa framework (React, Vite/webpack) i konfiguruje się. Tworzy folder .storybook/ z konfiguracją.', tips: ['Story = jeden stan komponentu: <Button variant="primary" disabled />  ', 'Świetne do design systems i bibliotek komponentów', 'Obsługuje: React, Vue, Angular, Svelte, Web Components'] }
          },
          { cmd: 'npm run storybook', desc: 'Storybook — uruchom dev server',
            detail: { what: 'Uruchamia Storybook dev server na porcie 6006. Widzisz wszystkie story (stany komponentów) w przeglądarce.', how: 'Storybook kompiluje story i serwuje własne środowisko. Zmiany w komponentach odświeżają się przez HMR.', tips: ['http://localhost:6006 domyślnie', 'Dodawaj story w plikach *.stories.tsx obok komponentów', 'Controls panel = zmieniaj propsy komponentu na żywo'] }
          },
          { cmd: 'npm run build-storybook', desc: 'Storybook — zbuduj statyczną dokumentację',
            detail: { what: 'Buduje Storybook jako statyczną stronę HTML w folderze storybook-static/. Możesz ją hostować jako dokumentację komponentów dla całego teamu.', how: 'Wynik to statyczny HTML/JS/CSS — możesz deployować na Vercel, Netlify, GitHub Pages.', tips: ['Deploy na Chromatic (platforma dla Storybook): npx chromatic', 'Dobra dokumentacja dla teamów designerów i developerów', 'Snapshot testing przez Chromatic — wykrywa wizualne regresje'] }
          },
          { cmd: 'React DevTools (Chrome/Firefox extension)', desc: 'Inspektor komponentów, state, props i profiler',
            detail: { what: 'Rozszerzenie przeglądarki do debugowania aplikacji React. Widzisz drzewo komponentów, state każdego komponentu, props, context i możesz profilować wydajność.', how: 'DevTools dodają dwie zakładki w Chrome DevTools: ⚛️ Components (drzewo, state, props) i ⚛️ Profiler (gdzie traci czas rendering).', tips: ['Zainstaluj: "React Developer Tools" w Chrome Web Store', 'Components: kliknij komponent → edytuj state i props na żywo', 'Profiler: nagraj sesję → znajdź wolno renderujące komponenty', 'Highlight Updates: włącz żeby widzieć które komponenty się re-renderują'] }
          },
        ]
      }
    ]
  }
};
