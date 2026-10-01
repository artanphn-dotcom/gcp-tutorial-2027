import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Copy,
  Filter,
  Network,
  Search,
  SunMedium,
  Terminal,
  TriangleAlert,
} from 'lucide-react'
import './App.css'
import { architecturePatterns, configurationGuides } from './data/architecture'
import { commandDatabase, type CommandRecord } from './data/commands'
import { learningModules } from './data/learning'
import { troubleshootingScenarios } from './data/troubleshooting'

const services = ['All', ...new Set(commandDatabase.map((command) => command.service))]
const categories = ['All', ...new Set(commandDatabase.map((command) => command.category))]
const difficulties = ['All', ...new Set(commandDatabase.map((command) => command.difficulty))]
const environments = ['All', ...new Set(commandDatabase.map((command) => command.environment))]

type Language = 'en' | 'al'

const uiText = {
  en: {
    themeLight: 'Light',
    themeDark: 'Dark',
    brand: 'Network Engineer Hub',
    brandSubtitle: 'Command center',
    navDashboard: 'Dashboard',
    navCommands: 'Commands',
    navTroubleshooting: 'Troubleshooting',
    navLearning: 'Learning',
    navConfig: 'Configuration',
    navArchitecture: 'Architecture',
    navScenarios: 'Scenarios',
    topicPages: 'Topic pages',
    quickActions: 'Quick actions',
    searchLabel: 'Search commands and troubleshooting',
    searchPlaceholder: 'Search commands, services, load balancers, BGP, VPN...',
    heroEyebrow: 'GCP Networking Reference',
    heroTitle: 'GCP Network Engineer Hub',
    heroText: 'Commands, troubleshooting, architecture and hands-on guides for Google Cloud networking.',
    heroPrimary: 'Troubleshoot VPN',
    heroSecondary: 'Learn VPC',
    overviewTroubleshooting: 'Troubleshooting',
    overviewCommands: 'Commands',
    overviewLearning: 'Learning modules',
    overviewGuides: 'Guides',
    commandDatabase: 'Command database',
    commandSearchable: 'Searchable reference',
    filters: 'Clear filters',
    model: 'Structured data model',
    service: 'Service',
    type: 'Type',
    difficulty: 'Difficulty',
    environment: 'Environment',
    learningCenter: 'Learning center',
    networkingConcepts: 'Networking concepts',
    troubleshootingCenter: 'Troubleshooting center',
    symptomRunbooks: 'Symptom based runbooks',
    configChecklists: 'Configuration checklists',
    operationalBaselines: 'Operational baselines',
    architecturePatterns: 'Architecture patterns',
    referenceDesigns: 'Reference designs',
    noCommands: 'No commands match the current filters.',
    topicDashboard: 'Dashboard',
    topicPagesAside: 'Topic pages',
    topicOverview: 'GCP Topic',
    commandsLabel: 'Commands',
    learningLabel: 'Learning',
    viewAll: 'Browse all',
    relatedLearning: 'Related learning',
    understandDesign: 'Understand the design behind the commands',
    commandDetail: 'Command detail',
    commandLabel: 'Command',
    doesWhat: 'What does it do?',
    whenUse: 'When should I use it?',
    example: 'Example',
    expectedOutput: 'Expected output',
    relatedCommands: 'Related commands',
    relatedTroubleshooting: 'Related troubleshooting',
    docs: 'Google Cloud Documentation',
    copy: 'Copy',
    copied: 'Copied',
    warning: 'WARNING — This command changes infrastructure. Verify the project, region, and resource before running it.',
  },
  al: {
    themeLight: 'Ndriçuar',
    themeDark: 'E errët',
    brand: 'Qendra e Inxhinierit të Rrjetit',
    brandSubtitle: 'Qendra e komandave',
    navDashboard: 'Paneli',
    navCommands: 'Komandat',
    navTroubleshooting: 'Problemat',
    navLearning: 'Mësimi',
    navConfig: 'Konfigurimi',
    navArchitecture: 'Arkitektura',
    navScenarios: 'Skenarët',
    topicPages: 'Faqet e temave',
    quickActions: 'Veprimet e shpejta',
    searchLabel: 'Kërko komanda dhe probleme',
    searchPlaceholder: 'Kërko komanda, shërbime, balancues, BGP, VPN...',
    heroEyebrow: 'Referenca e rrjetit GCP',
    heroTitle: 'Qendra e inxhinierit të rrjetit GCP',
    heroText: 'Komanda, zgjidhje probleme, arkitekturë dhe udhëzime praktike për rrjetet e Google Cloud.',
    heroPrimary: 'Zgjidh problem VPN',
    heroSecondary: 'Mëso VPC',
    overviewTroubleshooting: 'Problemat',
    overviewCommands: 'Komandat',
    overviewLearning: 'Modulet e mësimit',
    overviewGuides: 'Udhëzimet',
    commandDatabase: 'Baza e komandave',
    commandSearchable: 'Referencë e kërkueshme',
    filters: 'Pastro filtrat',
    model: 'Modeli i të dhënave të strukturuara',
    service: 'Shërbimi',
    type: 'Lloji',
    difficulty: 'Vështirësia',
    environment: 'Mjedisi',
    learningCenter: 'Qendra e mësimit',
    networkingConcepts: 'Konceptet e rrjetit',
    troubleshootingCenter: 'Qendra e zgjidhjes së problemeve',
    symptomRunbooks: 'Manuale bazuar në simptoma',
    configChecklists: 'Kontroll listat e konfigurimit',
    operationalBaselines: 'Linja bazë operative',
    architecturePatterns: 'Modelet e arkitekturës',
    referenceDesigns: 'Modelet referuese',
    noCommands: 'Asnjë komandë nuk përputhet me filtrat aktuale.',
    topicDashboard: 'Paneli',
    topicPagesAside: 'Faqet e temave',
    topicOverview: 'Tema GCP',
    commandsLabel: 'Komandat',
    learningLabel: 'Mësimi',
    viewAll: 'Shiko të gjitha',
    relatedLearning: 'Mësimi i lidhur',
    understandDesign: 'Kupto dizajnin pas komandave',
    commandDetail: 'Detajet e komandës',
    commandLabel: 'Komanda',
    doesWhat: 'Çfarë bën?',
    whenUse: 'Kur duhet ta përdor?',
    example: 'Shembull',
    expectedOutput: 'Output i pritur',
    relatedCommands: 'Komandat e lidhura',
    relatedTroubleshooting: 'Zgjidhje probleme të lidhura',
    docs: 'Dokumentacioni i Google Cloud',
    copy: 'Kopjo',
    copied: 'Kopjuar',
    warning: 'KUJDES — Kjo komandë ndryshon infrastruktura. Verifiko projektin, rajonin dhe resurset para se ta ekzekutosh.',
  },
}

const getLocalizedText = <T extends Record<'en' | 'al', string>>(value: T, language: Language) => value[language]
const getLabel = (value: { en: string; al: string }, language: Language) => getLocalizedText(value, language)

const quickActions = [
  { label: { en: 'VM connectivity', al: 'Lidhja e VM-ve' }, query: 'vm connectivity internet' },
  { label: { en: 'VPN', al: 'VPN' }, query: 'vpn tunnel bgp' },
  { label: { en: 'BGP', al: 'BGP' }, query: 'bgp route peer' },
  { label: { en: 'Firewall', al: 'Firewall' }, query: 'firewall allow deny rule' },
  { label: { en: 'DNS', al: 'DNS' }, query: 'dns managed zone resolver' },
  { label: { en: 'NAT', al: 'NAT' }, query: 'cloud nat egress private' },
  { label: { en: 'Load Balancer', al: 'Balancuesi i ngarkesës' }, query: 'load balancer health check backend' },
  { label: { en: 'VPC Flow Logs', al: 'Logjet e VPC' }, query: 'flow logs src_ip dst_ip' },
]

const overviewCards = [
  { label: { en: 'Troubleshooting', al: 'Problemat' }, value: '20+', icon: TriangleAlert },
  { label: { en: 'Commands', al: 'Komandat' }, value: '30+', icon: Terminal },
  { label: { en: 'Learning modules', al: 'Modulet e mësimit' }, value: '12', icon: BookOpen },
  { label: { en: 'Guides', al: 'Udhëzimet' }, value: '15', icon: Network },
]

const navSections = [
  { label: { en: 'Dashboard', al: 'Paneli' }, target: 'top' },
  { label: { en: 'Commands', al: 'Komandat' }, target: 'command-panel' },
  { label: { en: 'Troubleshooting', al: 'Problemat' }, target: 'troubleshooting-panel' },
  { label: { en: 'Learning', al: 'Mësimi' }, target: 'learning-panel' },
  { label: { en: 'Configuration', al: 'Konfigurimi' }, target: 'configuration-panel' },
  { label: { en: 'Architecture', al: 'Arkitektura' }, target: 'architecture-panel' },
  { label: { en: 'Scenarios', al: 'Skenarët' }, target: 'scenario-panel' },
]

const topicCatalog = [
  { slug: 'vpc', title: { en: 'VPC & Subnets', al: 'VPC & Nënrrjetet' }, service: 'VPC', summary: { en: 'Private networking, routes, subnets, and VPC design fundamentals.', al: 'Rrjeta private, rute, nënrrjetet dhe bazat e dizajnit të VPC.' }, keywords: ['vpc', 'subnet', 'route', 'network', 'cidr'] },
  { slug: 'vpn', title: { en: 'VPN', al: 'VPN' }, service: 'VPN', summary: { en: 'Hybrid cloud connectivity, tunnel health, and BGP negotiation checks.', al: 'Lidhje hibride me re, shëndeti i tunelit dhe kontrolli i negociimit BGP.' }, keywords: ['vpn', 'tunnel', 'peer', 'bgp', 'router'] },
  { slug: 'firewall', title: { en: 'Firewall', al: 'Firewall' }, service: 'Firewall', summary: { en: 'Ingress, egress, policy validation, and unexpected blocking analysis.', al: 'Leje hyrëse, dalëse, validim i politikave dhe analiza e bllokimeve të paprituna.' }, keywords: ['firewall', 'ingress', 'egress', 'allow', 'deny'] },
  { slug: 'bgp', title: { en: 'BGP & Cloud Router', al: 'BGP & Cloud Router' }, service: 'Cloud Router', summary: { en: 'Route advertisement, ASN validation, and session health for dynamic routing.', al: 'Reklamimi i ruteve, validimi i ASN-së dhe shëndeti i sesionit për rrugëzimin dinamik.' }, keywords: ['bgp', 'router', 'peer', 'route'] },
  { slug: 'nat', title: { en: 'Cloud NAT', al: 'Cloud NAT' }, service: 'Cloud NAT', summary: { en: 'Private egress, NAT gateway checks, and outbound connectivity validation.', al: 'Dalje private, kontrolli i gateway NAT dhe validimi i lidhjes së jashtme.' }, keywords: ['nat', 'egress', 'private', 'internet', 'gateway'] },
  { slug: 'dns', title: { en: 'DNS & Resolution', al: 'DNS & Zgjidhja' }, service: 'DNS', summary: { en: 'Managed zones, private DNS, resolution debugging, and traffic flow analysis.', al: 'Zona të menaxhuara, DNS private, zgjidhja e problemeve dhe analiza e trafikut.' }, keywords: ['dns', 'resolver', 'zone', 'lookup', 'domain'] },
  { slug: 'load-balancer', title: { en: 'Load Balancer', al: 'Balancuesi i ngarkesës' }, service: 'Load Balancer', summary: { en: 'Forwarding rules, health checks, URL maps, and backend routing checks.', al: 'Rregulla të përcjelljes, kontrolli i shëndetit, URL maps dhe kontrolli i rrugëzimit të backend.' }, keywords: ['load balancer', 'backend', 'url map', 'health check', 'ssl'] },
  { slug: 'gke', title: { en: 'GKE Networking', al: 'Rrjeti GKE' }, service: 'GKE', summary: { en: 'Cluster networking, ingress, and service connectivity for Kubernetes workloads.', al: 'Rrjeti i klasterit, ingress dhe lidhshmëria e shërbimeve për workload-et Kubernetes.' }, keywords: ['gke', 'cluster', 'ingress', 'service', 'network policy'] },
  { slug: 'al', title: { en: 'AL Language', al: 'Gjuha shqipe' }, service: 'AL', summary: { en: 'Business Central AL patterns for records, filters, pages, and reusable application logic.', al: 'Modele dhe shembuj për ndërfaqe, filtrime, faqe dhe logjikë të ripërdorshme në shqip.' }, keywords: ['al', 'business central', 'record', 'page', 'procedure', 'codeunit'] },
]

const getTopicTitle = (topic: typeof topicCatalog[number], language: Language) => getLocalizedText(topic.title, language)
const getTopicSummary = (topic: typeof topicCatalog[number], language: Language) => getLocalizedText(topic.summary, language)

const alExamples = [
  {
    id: 'al-findset-filter',
    title: 'FindSet with filters',
    service: 'AL',
    difficulty: 'Beginner',
    description: 'Loads a filtered customer set and processes records efficiently in Business Central.',
    command: `procedure LoadCustomers()
var
    Customer: Record Customer;
begin
    if Customer.FindSet() then
        repeat
            Message(Customer.Name);
        until Customer.Next() = 0;
end;`,
  },
  {
    id: 'al-page-field',
    title: 'Page field and trigger',
    service: 'AL',
    difficulty: 'Intermediate',
    description: 'Adds a field to a page and reacts to user actions with a simple trigger.',
    command: `page 50100 CustomerList
{
    PageType = List;
    SourceTable = Customer;

    layout
    {
        area(content)
        {
            field(Name; Rec.Name)
            {
                ApplicationArea = All;
            }
        }
    }
}`,
  },
  {
    id: 'al-codeunit',
    title: 'Reusable codeunit method',
    service: 'AL',
    difficulty: 'Intermediate',
    description: 'Wrap reusable logic in a codeunit so it can be called from multiple pages and reports.',
    command: `codeunit 50100 CustomerHelper
{
    procedure GetCustomerCount(): Integer
    var
        Customer: Record Customer;
    begin
        Customer.SetRange(Blocked, false);
        exit(Customer.Count());
    end;
}`,
  },
]

function App() {
  const [language, setLanguage] = useState<Language>('en')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage language={language} setLanguage={setLanguage} />} />
        {topicCatalog.map((topic) => (
          <Route key={topic.slug} path={`/${topic.slug}`} element={<TopicPage topic={topic} language={language} />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

function DashboardPage({ language, setLanguage }: { language: Language; setLanguage: React.Dispatch<React.SetStateAction<Language>> }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [search, setSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [difficultyFilter, setDifficultyFilter] = useState('All')
  const [environmentFilter, setEnvironmentFilter] = useState('All')
  const [selectedCommandId, setSelectedCommandId] = useState(commandDatabase[0]?.id ?? '')

  const filteredCommands = useMemo(() => {
    const query = search.toLowerCase().trim()

    return commandDatabase.filter((command) => {
      const matchesQuery =
        query.length === 0 ||
        [
          command.title,
          command.description,
          command.command,
          command.service,
          command.tags.join(' '),
          command.related_troubleshooting.join(' '),
        ].some((value) => value.toLowerCase().includes(query))

      const matchesService = serviceFilter === 'All' || command.service === serviceFilter
      const matchesCategory = categoryFilter === 'All' || command.category === categoryFilter
      const matchesDifficulty = difficultyFilter === 'All' || command.difficulty === difficultyFilter
      const matchesEnvironment = environmentFilter === 'All' || command.environment === environmentFilter

      return matchesQuery && matchesService && matchesCategory && matchesDifficulty && matchesEnvironment
    })
  }, [search, serviceFilter, categoryFilter, difficultyFilter, environmentFilter])

  useEffect(() => {
    if (!filteredCommands.some((command) => command.id === selectedCommandId)) {
      setSelectedCommandId(filteredCommands[0]?.id ?? '')
    }
  }, [filteredCommands, selectedCommandId])

  const selectedCommand = filteredCommands.find((command) => command.id === selectedCommandId) ?? filteredCommands[0] ?? commandDatabase[0]

  const scrollToSection = (target: string) => {
    const section = target === 'top' ? document.body : document.getElementById(target)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const clearFilters = () => {
    setSearch('')
    setServiceFilter('All')
    setCategoryFilter('All')
    setDifficultyFilter('All')
    setEnvironmentFilter('All')
  }

  return (
    <div id="top" className={`app-shell ${theme}`}>
      <aside className="sidebar">
        <div className="brand-wrap">
          <div className="brand-mark">GCP</div>
          <div>
            <div className="brand-title">{uiText[language].brand}</div>
            <div className="brand-subtitle">{uiText[language].brandSubtitle}</div>
          </div>
        </div>

        <nav className="nav-section">
          {navSections.map((item) => (
            <button
              key={item.target}
              type="button"
              className={`nav-item ${item.target === 'command-panel' ? 'active' : ''}`}
              onClick={() => scrollToSection(item.target)}
            >
              <span>{getLabel(item.label, language)}</span>
              <ArrowRight size={15} />
            </button>
          ))}
        </nav>

        <div className="nav-panel">
          <div className="panel-header">{uiText[language].topicPages}</div>
          <div className="quick-actions">
            {topicCatalog.map((topic) => (
              <Link key={topic.slug} to={`/${topic.slug}`} className="quick-action">
                {getTopicTitle(topic, language)}
              </Link>
            ))}
          </div>
        </div>

        <div className="nav-panel">
          <div className="panel-header">{uiText[language].quickActions}</div>
          <div className="quick-actions">
            {quickActions.map((action) => (
              <button
                key={action.query}
                type="button"
                className="quick-action"
                onClick={() => setSearch(action.query)}
              >
                {getLabel(action.label, language)}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="search-wrap">
            <Search size={18} />
            <input
              aria-label={uiText[language].searchLabel}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={uiText[language].searchPlaceholder}
            />
          </div>

          <div className="topbar-actions">
            <div className="language-toggle" aria-label="Language selector">
              <button type="button" className={`language-button ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
              <button type="button" className={`language-button ${language === 'al' ? 'active' : ''}`} onClick={() => setLanguage('al')}>AL</button>
            </div>
            <button type="button" className="theme-toggle" onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}>
              <SunMedium size={17} />
              {theme === 'dark' ? uiText[language].themeLight : uiText[language].themeDark}
            </button>
          </div>
        </header>

        <section id="hero-panel" className="hero-panel">
          <div>
            <div className="eyebrow">{uiText[language].heroEyebrow}</div>
            <h1>{uiText[language].heroTitle}</h1>
            <p className="hero-copy">
              {uiText[language].heroText}
            </p>
          </div>

          <div className="hero-actions">
            <Link to="/vpn" className="primary-action">{uiText[language].heroPrimary}</Link>
            <Link to="/vpc" className="secondary-action">{uiText[language].heroSecondary}</Link>
          </div>
        </section>

        <section className="overview-grid">
          {overviewCards.map(({ label, value, icon: Icon }) => (
            <article key={value + label.en} className="metric-card">
              <div className="metric-icon"><Icon size={18} /></div>
              <div>
                <div className="metric-value">{value}</div>
                <div className="metric-label">{getLabel(label, language)}</div>
              </div>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <div id="command-panel" className="command-panel">
            <div className="section-header-row">
              <div>
                <div className="section-kicker">{uiText[language].commandDatabase}</div>
                <h2>{uiText[language].commandSearchable}</h2>
              </div>
              <div className="filter-actions">
                <div className="filter-pill"><Filter size={14} /> {uiText[language].model}</div>
                <button type="button" className="clear-filters" onClick={clearFilters}>{uiText[language].filters}</button>
              </div>
            </div>

            <div className="filters-panel">
              <div className="filter-group">
                <label>{uiText[language].service}</label>
                <div className="chip-row">
                  {services.map((service) => (
                    <button key={service} type="button" className={`chip ${serviceFilter === service ? 'active' : ''}`} onClick={() => setServiceFilter(service)}>
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <label>{uiText[language].type}</label>
                <div className="chip-row">
                  {categories.map((category) => (
                    <button key={category} type="button" className={`chip ${categoryFilter === category ? 'active' : ''}`} onClick={() => setCategoryFilter(category)}>
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group split-group">
                <div>
                  <label>{uiText[language].difficulty}</label>
                  <div className="chip-row">
                    {difficulties.map((difficulty) => (
                      <button key={difficulty} type="button" className={`chip ${difficultyFilter === difficulty ? 'active' : ''}`} onClick={() => setDifficultyFilter(difficulty)}>
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label>{uiText[language].environment}</label>
                  <div className="chip-row">
                    {environments.map((environment) => (
                      <button key={environment} type="button" className={`chip ${environmentFilter === environment ? 'active' : ''}`} onClick={() => setEnvironmentFilter(environment)}>
                        {environment}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="command-list">
              {filteredCommands.map((command) => (
                <button
                  key={command.id}
                  type="button"
                  className={`command-card ${selectedCommand?.id === command.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCommandId(command.id)}
                >
                  <div className="command-card-header">
                    <span className="service-badge">{command.service}</span>
                    <span className="difficulty-badge">{command.difficulty}</span>
                  </div>
                  <h3>{command.title}</h3>
                  <p>{command.description}</p>
                  <code>{command.command}</code>
                </button>
              ))}
            </div>
          </div>

          <aside className="detail-panel">
            {selectedCommand ? <CommandDetail command={selectedCommand} language={language} /> : <p>{uiText[language].noCommands}</p>}
          </aside>
        </section>

        <section id="scenario-panel" className="lower-grid">
          <div id="learning-panel" className="panel-box">
            <div className="section-kicker">{uiText[language].learningCenter}</div>
            <h2>{uiText[language].networkingConcepts}</h2>
            <div className="stack-list">
              {learningModules.map((module) => (
                <article key={module.id} className="topic-card">
                  <div className="inline-row">
                    <span className="service-badge">{module.service}</span>
                    <span className="difficulty-badge alt">{module.level}</span>
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.summary}</p>
                  <ul>
                    {module.keyPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div id="troubleshooting-panel" className="panel-box">
            <div className="section-kicker">{uiText[language].troubleshootingCenter}</div>
            <h2>{uiText[language].symptomRunbooks}</h2>
            <div className="stack-list compact">
              {troubleshootingScenarios.map((scenario) => (
                <article key={scenario.id} className="scenario-card">
                  <div className="inline-row">
                    <span className="service-badge warning">{scenario.symptom}</span>
                  </div>
                  <h3>{scenario.title}</h3>
                  <p>{scenario.summary}</p>
                  <ul>
                    {scenario.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="reference-grid">
          <div id="configuration-panel" className="panel-box">
            <div className="section-kicker">{uiText[language].configChecklists}</div>
            <h2>{uiText[language].operationalBaselines}</h2>
            <div className="stack-list">
              {configurationGuides.map((guide) => (
                <article key={guide.id} className="reference-card">
                  <div className="reference-meta">
                    <span className="service-badge">{guide.focus}</span>
                    <span className="difficulty-badge alt">{guide.level}</span>
                  </div>
                  <h3>{guide.title}</h3>
                  <p>{guide.summary}</p>
                  <div className="pill-list">
                    {guide.checks.map((check) => (
                      <span key={check} className="mini-pill">{check}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="architecture-panel" className="panel-box">
            <div className="section-kicker">{uiText[language].architecturePatterns}</div>
            <h2>{uiText[language].referenceDesigns}</h2>
            <div className="stack-list">
              {architecturePatterns.map((pattern) => (
                <article key={pattern.id} className="reference-card">
                  <div className="reference-meta">
                    <span className="service-badge">{pattern.category}</span>
                  </div>
                  <h3>{pattern.title}</h3>
                  <p>{pattern.summary}</p>
                  <ul>
                    {pattern.components.map((component) => (
                      <li key={component}>{component}</li>
                    ))}
                  </ul>
                  <div className="pill-list">
                    {pattern.bestPractices.map((bestPractice) => (
                      <span key={bestPractice} className="mini-pill alt">{bestPractice}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function TopicPage({ topic, language }: { topic: { slug: string; title: { en: string; al: string }; service: string; summary: { en: string; al: string }; keywords: string[] }; language: Language }) {
  const isAlTopic = topic.slug === 'al'

  const topicCommands = isAlTopic
    ? alExamples
    : commandDatabase.filter((command) => {
        const commandText = [
          command.service,
          command.title,
          ...command.tags,
          ...command.related_troubleshooting,
        ]
          .join(' ')
          .toLowerCase()

        return (
          command.service.toLowerCase().includes(topic.service.toLowerCase()) ||
          topic.keywords.some((keyword) => commandText.includes(keyword.toLowerCase()))
        )
      })

  const topicLearning = learningModules.filter((module) => {
    const text = [module.title, module.service, module.summary, ...module.keyPoints].join(' ').toLowerCase()
    return topic.keywords.some((keyword) => text.includes(keyword.toLowerCase()))
  })

  return (
    <div className="topic-page-shell">
      <aside className="topic-sidebar">
        <Link to="/" className="topic-back-link">← {uiText[language].topicDashboard}</Link>
        <div className="topic-sidebar-title">{uiText[language].topicPagesAside}</div>
        <nav className="topic-nav">
          {topicCatalog.map((item) => (
            <Link
              key={item.slug}
              to={`/${item.slug}`}
              className={`topic-link ${item.slug === topic.slug ? 'active' : ''}`}
            >
              {getTopicTitle(item, language)}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="topic-main">
        <header className="topic-header">
          <div className="eyebrow">{uiText[language].topicOverview}</div>
          <h1>{getTopicTitle(topic, language)}</h1>
          <p>{getTopicSummary(topic, language)}</p>
        </header>

        <section className="topic-summary-grid">
          <div className="topic-summary-card">
            <div className="section-kicker">{uiText[language].commandsLabel}</div>
            <h2>{topicCommands.length} {isAlTopic ? (language === 'en' ? 'relevant examples' : 'shembuj të rëndësishëm') : (language === 'en' ? 'relevant commands' : 'komanda të rëndësishme')}</h2>
            <p>{isAlTopic ? (language === 'en' ? 'Use these AL snippets as practical patterns for Record access, page design, and reusable app logic.' : 'Përdor këto shembuj AL si modele praktike për qasje në rekord, dizajn të faqeve dhe logjikë të ripërdorshme.') : (language === 'en' ? 'Commands are organized by service and tuned for real troubleshooting and implementation work.' : 'Komandat janë të organizuara sipas shërbimeve dhe të optimizuara për zgjidhje reale të problemeve dhe implementim.')}</p>
          </div>
          <div className="topic-summary-card">
            <div className="section-kicker">{uiText[language].learningLabel}</div>
            <h2>{topicLearning.length} {language === 'en' ? 'concept modules' : 'module konceptesh'}</h2>
            <p>{language === 'en' ? 'Use the related learning content to understand routing, segmentation, policy, and connectivity.' : 'Përdor përmbajtjen e lidhur për të kuptuar rrugëzimin, segmentimin, politikën dhe lidhshmërinë.'}</p>
          </div>
        </section>

        <section className="topic-command-grid">
          {topicCommands.map((command) => (
            <article key={command.id} className="topic-command-card">
              <div className="topic-card-topline">
                <span className="service-badge">{command.service}</span>
                <span className="difficulty-badge">{command.difficulty}</span>
              </div>
              <h3>{command.title}</h3>
              <p>{command.description}</p>
              <pre>{command.command}</pre>
              <div className="topic-button-row">
                <CopyButton text={command.command} language={language} />
                <Link to="/" className="inline-link">{uiText[language].viewAll}</Link>
              </div>
            </article>
          ))}
        </section>

        {topicLearning.length > 0 && (
          <section className="topic-learning-box">
            <div className="section-kicker">{uiText[language].relatedLearning}</div>
            <h2>{uiText[language].understandDesign}</h2>
            <div className="topic-learning-list">
              {topicLearning.map((module) => (
                <article key={module.id} className="topic-learning-card">
                  <span className="service-badge">{module.service}</span>
                  <h3>{module.title}</h3>
                  <p>{module.summary}</p>
                  <ul>
                    {module.keyPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function CommandDetail({ command, language }: { command: CommandRecord; language: Language }) {
  return (
    <>
      <div className="detail-header">
        <div>
          <div className="section-kicker">{uiText[language].commandDetail}</div>
          <h2>{command.title}</h2>
        </div>
        <CopyButton text={command.command} language={language} />
      </div>

      <div className="inline-row detail-badges">
        <span className="service-badge">{command.service}</span>
        <span className="difficulty-badge">{command.difficulty}</span>
        <span className="environment-badge">{command.environment}</span>
      </div>

      {['Create', 'Update', 'Delete'].includes(command.category) && (
        <div className="warning-box">
          <AlertTriangle size={16} />
          {uiText[language].warning}
        </div>
      )}

      <div className="command-block">
        <div className="command-label">{uiText[language].commandLabel}</div>
        <pre>{command.command}</pre>
      </div>

      <div className="info-block">
        <h3>{uiText[language].doesWhat}</h3>
        <p>{command.description}</p>
      </div>

      <div className="info-block">
        <h3>{uiText[language].whenUse}</h3>
        <p>{command.when_to_use}</p>
      </div>

      <div className="info-block">
        <h3>{uiText[language].example}</h3>
        <pre>{command.example}</pre>
      </div>

      <div className="info-block">
        <h3>{uiText[language].expectedOutput}</h3>
        <pre>{command.expected_output}</pre>
      </div>

      <div className="info-block">
        <h3>{uiText[language].relatedCommands}</h3>
        <ul>
          {command.related_commands.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="info-block">
        <h3>{uiText[language].relatedTroubleshooting}</h3>
        <ul>
          {command.related_troubleshooting.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="doc-link-wrap">
        <a href={command.documentation_url} target="_blank" rel="noreferrer">
          {uiText[language].docs}
        </a>
      </div>
    </>
  )
}

function CopyButton({ text, language }: { text: string; language: Language }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button type="button" className="copy-button" onClick={handleCopy}>
      <Copy size={15} />
      {copied ? uiText[language].copied : uiText[language].copy}
    </button>
  )
}

export default App
