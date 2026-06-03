const FRAMEWORKS = {
  frontend: [
    { id: 'react',   name: 'React',      icon: '⚛️',  color: '#61dafb', lang: 'JavaScript', desc: 'Biblioteka UI od Meta' },
    { id: 'nextjs',  name: 'Next.js',    icon: '▲',   color: '#ffffff', lang: 'JavaScript', desc: 'Full-stack z React i SSR' },
    { id: 'vue',     name: 'Vue.js',     icon: '💚',  color: '#42b883', lang: 'JavaScript', desc: 'Progresywny framework UI' },
    { id: 'svelte',  name: 'Svelte',     icon: '🔥',  color: '#ff3e00', lang: 'JavaScript', desc: 'Kompilowany, zero runtime' },
    { id: 'angular', name: 'Angular',    icon: '🔺',  color: '#dd0031', lang: 'TypeScript', desc: 'Framework od Google' },
    { id: 'tailwind',name: 'Tailwind',   icon: '🌊',  color: '#38bdf8', lang: 'CSS',        desc: 'Utility-first CSS framework' },
  ],
  backend: [
    { id: 'fastapi', name: 'FastAPI',    icon: '🚀',  color: '#009688', lang: 'Python',     desc: 'Nowoczesne API z type hints' },
    { id: 'django',  name: 'Django',     icon: '🎸',  color: '#44b78b', lang: 'Python',     desc: 'Bateryjny framework webowy' },
    { id: 'flask',   name: 'Flask',      icon: '🌶️', color: '#a0a0a0', lang: 'Python',     desc: 'Mikro-framework webowy' },
    { id: 'express', name: 'Express',    icon: '🟨',  color: '#f7df1e', lang: 'JavaScript', desc: 'Minimalny framework Node.js' },
    { id: 'laravel', name: 'Laravel',    icon: '🔴',  color: '#ff2d20', lang: 'PHP',        desc: 'Elegancki framework webowy' },
    { id: 'spring',  name: 'Spring',     icon: '🌿',  color: '#6db33f', lang: 'Java',       desc: 'Enterprise framework Java' },
  ],
  database: [
    { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', color: '#336791', lang: 'SQL',       desc: 'Zaawansowana baza relacyjna' },
    { id: 'mongodb',    name: 'MongoDB',    icon: '🍃', color: '#47a248', lang: 'NoSQL',     desc: 'Dokumentowa baza danych' },
    { id: 'redis',      name: 'Redis',      icon: '⚡', color: '#dc382d', lang: 'In-Memory', desc: 'Cache i baza key-value' },
    { id: 'sqlalchemy', name: 'SQLAlchemy', icon: '🗄️', color: '#d71f00', lang: 'Python',   desc: 'ORM i SQL toolkit' },
    { id: 'prisma',     name: 'Prisma',     icon: '◈',  color: '#5a67d8', lang: 'TypeScript',desc: 'Type-safe ORM nowej ery' },
    { id: 'firebase',   name: 'Firebase',   icon: '🔥', color: '#ffca28', lang: 'NoSQL',    desc: 'BaaS od Google' },
  ],
  devops: [
    { id: 'docker',   name: 'Docker',      icon: '🐳', color: '#2496ed', lang: 'YAML',      desc: 'Konteneryzacja aplikacji' },
    { id: 'k8s',      name: 'Kubernetes',  icon: '☸️', color: '#326ce5', lang: 'YAML',      desc: 'Orkiestracja kontenerów' },
    { id: 'github',   name: 'GitHub Actions',icon:'⚙️', color: '#2088ff', lang: 'YAML',     desc: 'CI/CD w repozytorium' },
    { id: 'nginx',    name: 'Nginx',        icon: '🟩', color: '#009900', lang: 'Config',   desc: 'Serwer i reverse proxy' },
    { id: 'terraform',name: 'Terraform',    icon: '🏗️', color: '#7b42bc', lang: 'HCL',     desc: 'Infrastruktura jako kod' },
    { id: 'linux',    name: 'Linux',        icon: '🐧', color: '#f7c948', lang: 'Bash',     desc: 'Podstawa każdego serwera' },
  ],
};
