// Ecosystem: rywale + pluginy
FW_REACT_DATA.content.rywale  = [
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
    ];
FW_REACT_DATA.content.pluginy = [
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
      };
