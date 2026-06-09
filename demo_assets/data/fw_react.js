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
    ]

  }
};
