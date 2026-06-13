import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bike,
  Box,
  Building2,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  Headphones,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  PackageCheck,
  Pill,
  ReceiptText,
  Route,
  Search,
  ShieldCheck,
  ShoppingBasket,
  Smartphone,
  Sparkles,
  Star,
  Store,
  UserRound,
  Utensils,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type Screen = "home" | "order" | "tracking" | "activity" | "account";

const services = [
  { id: "restaurant", label: "Repas", note: "Restaurants", icon: Utensils },
  { id: "groceries", label: "Courses", note: "Supermarches", icon: ShoppingBasket },
  { id: "pharmacy", label: "Pharmacie", note: "Sante", icon: Pill },
  { id: "parcel", label: "Colis", note: "Particuliers", icon: Box },
  { id: "documents", label: "Documents", note: "Express", icon: FileText },
  { id: "other", label: "Autre", note: "Sur mesure", icon: Sparkles },
];

const pastDeliveries = [
  { title: "Pharmacie Centrale", date: "Aujourd'hui, 10:24", price: "260 DA", status: "Livree", icon: Pill },
  { title: "Chez Mehdi", date: "8 juin, 19:42", price: "320 DA", status: "Livree", icon: Utensils },
  { title: "Colis personnel", date: "3 juin, 14:08", price: "200 DA", status: "Annulee", icon: Box },
];

function MapArtwork({ active = false }: { active?: boolean }) {
  return (
    <div className={`map-artwork ${active ? "is-active" : ""}`} aria-label="Carte stylisee d'Alger">
      <span className="map-label label-one">Hydra</span>
      <span className="map-label label-two">El Biar</span>
      <span className="map-label label-three">Sidi M'Hamed</span>
      <div className="road road-a" />
      <div className="road road-b" />
      <div className="road road-c" />
      <div className="road road-d" />
      <div className="route-line" />
      <div className="pickup-dot"><span /></div>
      <div className="dropoff-pin"><MapPin size={18} fill="currentColor" /></div>
      {active && <div className="driver-pin"><Bike size={18} /></div>}
      <button className="locate-button" aria-label="Me localiser"><Navigation size={19} /></button>
    </div>
  );
}

function Header({ onProfile }: { onProfile: () => void }) {
  return (
    <header className="app-header">
      <button className="round-button menu-button" aria-label="Menu"><Menu size={21} /></button>
      <div className="brand">livri<span>.</span></div>
      <button className="avatar" onClick={onProfile}>YA</button>
    </header>
  );
}

function HomeScreen({ onOrder, onTracking, onProfile }: { onOrder: (service?: string) => void; onTracking: () => void; onProfile: () => void }) {
  return (
    <div className="screen home-screen">
      <Header onProfile={onProfile} />
      <main>
        <section className="welcome-block">
          <p className="eyebrow">Bonjour Yacine</p>
          <h1>On livre quoi<br />aujourd'hui&nbsp;?</h1>
          <button className="location-chip"><MapPin size={15} /> Alger Centre <ChevronRight size={15} /></button>
        </section>

        <section className="search-card" onClick={() => onOrder()}>
          <div className="search-icon"><Search size={20} /></div>
          <div><span>Ou souhaitez-vous livrer&nbsp;?</span><small>Indiquez le depart et l'arrivee</small></div>
          <div className="arrow-box"><ArrowRight size={19} /></div>
        </section>

        <section className="section services-section">
          <div className="section-title"><h2>Nos services</h2><button>Voir tout</button></div>
          <div className="services-grid">
            {services.map(({ id, label, note, icon: Icon }) => (
              <button className="service-card" key={id} onClick={() => onOrder(id)}>
                <Icon className="service-symbol" size={25} strokeWidth={2.15} />
                <strong>{label}</strong><small>{note}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-title"><h2>Livraison en cours</h2><button onClick={onTracking}>Suivre</button></div>
          <button className="active-delivery" onClick={onTracking}>
            <div className="active-map"><MapArtwork active /></div>
            <div className="active-content">
              <span className="status-pill"><i /> En route vers vous</span>
              <div className="delivery-row"><div><strong>Mohamed arrive bientot</strong><small>Yamaha NMAX · 08421-116</small></div><b>8 min</b></div>
              <div className="progress-track"><span /></div>
            </div>
          </button>
        </section>
      </main>
    </div>
  );
}

function OrderScreen({ initialService, onBack, onConfirm }: { initialService: string; onBack: () => void; onConfirm: () => void }) {
  const [service, setService] = useState(initialService || "parcel");
  const [pickup, setPickup] = useState("Hydra, Alger");
  const [destination, setDestination] = useState("Alger Centre");
  const [note, setNote] = useState("");
  const price = useMemo(() => pickup && destination ? 260 : 200, [pickup, destination]);

  return (
    <div className="screen order-screen">
      <div className="simple-header">
        <button className="round-button" onClick={onBack}><ArrowLeft size={21} /></button>
        <strong>Nouvelle livraison</strong><button className="round-button"><X size={20} /></button>
      </div>
      <div className="order-map"><MapArtwork /></div>
      <main className="order-sheet">
        <div className="sheet-handle" />
        <div className="order-heading"><div><p className="eyebrow">Etape 1 sur 2</p><h1>Votre trajet</h1></div><span>~ 20 min</span></div>

        <div className="route-inputs">
          <div className="route-visual"><i /><span /><b /></div>
          <label><span>Recuperation</span><input value={pickup} onChange={(e) => setPickup(e.target.value)} /></label>
          <label><span>Destination</span><input value={destination} onChange={(e) => setDestination(e.target.value)} /></label>
        </div>

        <div className="mini-title">Type de livraison</div>
        <div className="service-carousel">
          {services.slice(0, 5).map(({ id, label, icon: Icon }) => (
            <button key={id} className={service === id ? "selected" : ""} onClick={() => setService(id)}>
              <Icon size={21} strokeWidth={2.15} /><span>{label}</span>{service === id && <Check size={13} className="check" />}
            </button>
          ))}
        </div>

        <label className="note-field"><ReceiptText size={19} /><input placeholder="Ajouter une note pour le livreur" value={note} onChange={(e) => setNote(e.target.value)} /></label>

        <div className="price-summary"><div><span>Prix estime</span><strong>{price} DA</strong></div><p>Le prix final est confirme avant l'envoi. Paiement direct au livreur.</p></div>
        <button className="primary-button" onClick={onConfirm}><span>Rechercher un livreur</span><ArrowRight size={20} /></button>
      </main>
    </div>
  );
}

function TrackingScreen({ onBack }: { onBack: () => void }) {
  const [messageOpen, setMessageOpen] = useState(false);
  return (
    <div className="screen tracking-screen">
      <div className="tracking-map"><MapArtwork active /></div>
      <div className="floating-header">
        <button className="round-button" onClick={onBack}><ArrowLeft size={21} /></button>
        <span className="live-chip"><i /> Suivi en direct</span>
        <button className="round-button"><Menu size={20} /></button>
      </div>
      <main className="tracking-sheet">
        <div className="sheet-handle" />
        <div className="eta-block"><div><p>Arrivee estimee</p><h1>8 min</h1><span>Vers 15:42</span></div><div className="bike-badge"><Bike size={31} /></div></div>
        <div className="tracking-progress"><span className="done"><Check size={13} /></span><i /><span className="current"><Bike size={14} /></span><i /><span><MapPin size={14} /></span></div>
        <div className="tracking-labels"><span>Recuperee</span><span>En route</span><span>Livree</span></div>
        <div className="driver-card">
          <div className="driver-photo">MB</div>
          <div className="driver-copy"><strong>Mohamed B.</strong><span><Star size={14} fill="currentColor" /> 4.9 · 312 livraisons</span><small>Yamaha NMAX · Noir</small></div>
          <button onClick={() => setMessageOpen(!messageOpen)}><MessageCircle size={21} /></button>
        </div>
        {messageOpen && <div className="quick-message"><input autoFocus placeholder="Ecrire a Mohamed..." /><button><ArrowRight size={18} /></button></div>}
        <div className="trip-detail"><div className="trip-icon"><PackageCheck size={20} /></div><div><span>Destination</span><strong>Rue Didouche Mourad, Alger Centre</strong></div><ChevronRight size={18} /></div>
        <button className="secondary-button">Voir les details de la livraison</button>
      </main>
    </div>
  );
}

function ActivityScreen() {
  return (
    <div className="screen text-screen">
      <header className="page-header"><div><p className="eyebrow">Vos livraisons</p><h1>Activite</h1></div><button className="round-button"><Search size={20} /></button></header>
      <div className="filter-row"><button className="active">Toutes</button><button>Livrees</button><button>Annulees</button></div>
      <section className="delivery-list">
        {pastDeliveries.map(({ title, date, price, status, icon: Icon }) => (
          <button className="delivery-item" key={title}><span className="list-icon"><Icon size={21} /></span><div><strong>{title}</strong><small>{date}</small></div><span className="item-price">{price}<small className={status === "Annulee" ? "cancelled" : ""}>{status}</small></span></button>
        ))}
      </section>
      <section className="impact-card"><span><Clock3 size={21} /></span><div><strong>2 h 45 gagnees ce mois-ci</strong><p>Passez moins de temps sur la route, on s'occupe du reste.</p></div></section>
    </div>
  );
}

function AccountScreen() {
  return (
    <div className="screen text-screen account-screen">
      <header className="page-header"><div><p className="eyebrow">Votre espace</p><h1>Compte</h1></div><button className="round-button"><Menu size={20} /></button></header>
      <section className="profile-card"><div className="big-avatar">YA</div><div><h2>Yacine Amrane</h2><p>Client depuis mai 2026</p><span><Star size={14} fill="currentColor" /> 4.9</span></div><ChevronRight /></section>
      <div className="account-stats"><div><strong>12</strong><span>Livraisons</span></div><div><strong>4.9</strong><span>Note</span></div><div><strong>3</strong><span>Adresses</span></div></div>
      <section className="account-menu">
        <button><span><MapPin size={20} /></span><div><strong>Adresses enregistrees</strong><small>Maison, travail et autres</small></div><ChevronRight size={18} /></button>
        <button><span><ReceiptText size={20} /></span><div><strong>Tarifs et paiements</strong><small>Paiement direct au livreur</small></div><ChevronRight size={18} /></button>
        <button><span><MessageCircle size={20} /></span><div><strong>Aide et assistance</strong><small>Nous sommes la pour vous</small></div><ChevronRight size={18} /></button>
      </section>
      <button className="driver-cta"><span><Bike size={24} /></span><div><strong>Devenir livreur</strong><small>Gagnez selon vos disponibilites</small></div><ArrowRight size={20} /></button>
    </div>
  );
}

function BottomNav({ screen, onChange }: { screen: Screen; onChange: (screen: Screen) => void }) {
  const items = [
    { id: "home" as Screen, label: "Accueil", icon: Home },
    { id: "activity" as Screen, label: "Activite", icon: ReceiptText },
    { id: "order" as Screen, label: "Livrer", icon: Navigation, main: true },
    { id: "tracking" as Screen, label: "Suivi", icon: MapPin },
    { id: "account" as Screen, label: "Compte", icon: UserRound },
  ];
  return <nav className="bottom-nav">{items.map(({ id, label, icon: Icon, main }) => <button key={id} className={`${screen === id ? "active" : ""} ${main ? "main-nav" : ""}`} onClick={() => onChange(id)}><span><Icon size={main ? 23 : 21} /></span><small>{label}</small></button>)}</nav>;
}

function PhoneDemo() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedService, setSelectedService] = useState("parcel");
  const openOrder = (service = "parcel") => { setSelectedService(service); setScreen("order"); };

  return (
    <div className="phone-frame">
        <div className="dynamic-island" aria-hidden="true"><span className="island-camera" /><span className="island-sensor" /></div>
        {screen === "home" && <HomeScreen onOrder={openOrder} onTracking={() => setScreen("tracking")} onProfile={() => setScreen("account")} />}
        {screen === "order" && <OrderScreen initialService={selectedService} onBack={() => setScreen("home")} onConfirm={() => setScreen("tracking")} />}
        {screen === "tracking" && <TrackingScreen onBack={() => setScreen("home")} />}
        {screen === "activity" && <ActivityScreen />}
        {screen === "account" && <AccountScreen />}
        <BottomNav screen={screen} onChange={(next) => next === "order" ? openOrder() : setScreen(next)} />
    </div>
  );
}

const companyServices = [
  { icon: Utensils, title: "Repas", text: "Vos restaurants favoris, livres chauds et sans attente." },
  { icon: ShoppingBasket, title: "Courses", text: "Les essentiels du quotidien recuperes dans vos magasins." },
  { icon: Pill, title: "Pharmacie", text: "Une livraison attentive pour vos produits de sante." },
  { icon: Box, title: "Colis", text: "Envoyez un colis a un proche partout dans la ville." },
  { icon: FileText, title: "Documents", text: "Vos plis importants remis rapidement et avec soin." },
  { icon: Sparkles, title: "Sur mesure", text: "Un besoin particulier ? Livri trouve la bonne solution." },
];

const steps = [
  { number: "01", icon: MapPin, title: "Indiquez le trajet", text: "Choisissez le point de recuperation et la destination." },
  { number: "02", icon: Bike, title: "Un livreur accepte", text: "Le livreur disponible le plus proche prend votre mission." },
  { number: "03", icon: Route, title: "Suivez en direct", text: "Visualisez chaque etape jusqu'a la remise de votre livraison." },
];

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="site-logo" href="#accueil" aria-label="Livri accueil">livri<span>.</span></a>
      <nav className={open ? "site-nav open" : "site-nav"}>
        <a href="#services" onClick={() => setOpen(false)}>Services</a>
        <a href="#fonctionnement" onClick={() => setOpen(false)}>Comment ca marche</a>
        <a href="#partenaires" onClick={() => setOpen(false)}>Partenaires</a>
        <a href="#entreprise" onClick={() => setOpen(false)}>Entreprise</a>
      </nav>
      <a className="header-cta" href="#telecharger">Telecharger l'app <ArrowRight size={17} /></a>
      <button className="site-menu" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">{open ? <X /> : <Menu />}</button>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="web-hero" id="accueil">
      <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      <div className="hero-copy">
        <h1>Tout Alger.<br /><em>Livre simplement.</em></h1>
        <p>Repas, courses, medicaments, documents ou colis. Livri connecte chaque besoin au bon livreur, avec un prix clair et un suivi en temps reel.</p>
        <div className="hero-actions">
          <a className="button-dark" href="#telecharger"><Download size={19} /> Telecharger l'app</a>
          <a className="button-light" href="#fonctionnement">Decouvrir Livri <ArrowRight size={18} /></a>
        </div>
        <div className="hero-proof">
          <span><Check size={16} /> Prix connu a l'avance</span>
          <span><Check size={16} /> Sans paiement en ligne</span>
          <span><Check size={16} /> Assistance locale</span>
        </div>
      </div>
      <div className="hero-phone-wrap">
        <div className="phone-caption"><Smartphone size={18} /><span><strong>Demo interactive</strong><small>Explorez l'application</small></span></div>
        <PhoneDemo />
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="web-section services-showcase" id="services">
      <div className="section-heading-web">
        <div><p className="web-eyebrow">Un seul reflexe</p><h2>Tout ce qui compte,<br />livre par Livri.</h2></div>
        <p>Une seule application pour simplifier les petites urgences et les grands quotidiens des Algeriens.</p>
      </div>
      <div className="web-services-grid">
        {companyServices.map(({ icon: Icon, title, text }, index) => (
          <article className={index === 0 ? "web-service-card featured" : "web-service-card"} key={title}>
            <div className="web-service-top"><Icon size={30} strokeWidth={1.9} /><span>0{index + 1}</span></div>
            <h3>{title}</h3><p>{text}</p><ArrowRight className="card-arrow" size={20} />
          </article>
        ))}
      </div>
    </section>
  );
}

function StepsSection() {
  return (
    <section className="dark-section" id="fonctionnement">
      <div className="dark-section-inner">
        <div className="section-heading-web dark-heading">
          <div><p className="web-eyebrow">Simple par conception</p><h2>Trois gestes.<br />Et c'est parti.</h2></div>
          <p>Pas de parcours complique. Livri vous accompagne clairement, de la demande jusqu'a la livraison.</p>
        </div>
        <div className="steps-grid">
          {steps.map(({ number, icon: Icon, title, text }) => <article className="step-card" key={number}><span className="step-number">{number}</span><Icon size={34} /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <div className="price-banner"><div><span className="price-label">Tarification transparente</span><strong>A partir de 200 DA</strong></div><p>30 DA / km. Le montant est affiche avant confirmation, puis regle directement au livreur.</p><WalletCards size={34} /></div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="web-section audience-section" id="partenaires">
      <div className="section-heading-web centered"><div><p className="web-eyebrow">Une plateforme. Trois espaces.</p><h2>Chacun avance mieux<br />avec Livri.</h2></div></div>
      <div className="audience-grid">
        <article className="audience-card client-card"><div className="audience-icon"><UserRound /></div><span>Pour les clients</span><h3>Votre ville devient plus proche.</h3><p>Commandez en quelques instants, suivez votre livreur et retrouvez tout votre historique.</p><a href="#telecharger">Utiliser Livri <ArrowRight size={17} /></a></article>
        <article className="audience-card driver-card-web"><div className="audience-icon"><Bike /></div><span>Pour les livreurs</span><h3>Roulez quand vous le decidez.</h3><p>Recevez les missions proches, gerez votre disponibilite et suivez vos revenus theoriques.</p><a href="#contact">Devenir livreur <ArrowRight size={17} /></a></article>
        <article className="audience-card merchant-card"><div className="audience-icon"><Store /></div><span>Pour les commercants</span><h3>Plus de clients, moins de logistique.</h3><p>Confiez-nous le dernier kilometre et gardez un oeil sur chaque commande.</p><a href="#contact">Devenir partenaire <ArrowRight size={17} /></a></article>
      </div>
    </section>
  );
}

function MotorcycleMark({ size = 34 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="11" cy="34" r="7" stroke="currentColor" strokeWidth="2.6"/><circle cx="37" cy="34" r="7" stroke="currentColor" strokeWidth="2.6"/><path d="M11 34h9l5-12h8l4 12M21 34h16M25 22l-5-7h-6M31 18h7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function ScooterMark({ size = 42 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 56 56" fill="none" aria-hidden="true"><circle cx="13" cy="44" r="6" stroke="currentColor" strokeWidth="2.8"/><circle cx="43" cy="44" r="6" stroke="currentColor" strokeWidth="2.8"/><path d="M13 44h20c5 0 8-3 8-8V14M35 14h11M41 20h-7M21 40l-5-18h12" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/><path d="m29 25-6 8h6l-4 7 10-11h-6l4-4h-4Z" fill="currentColor"/></svg>;
}

function VehiclesSection() {
  return (
    <section className="vehicles-section" id="vehicules">
      <div className="vehicles-inner">
        <div className="vehicles-heading"><p className="web-eyebrow">Livrer autrement</p><h2>Chaque trajet merite<br />le bon vehicule.</h2><p>Livri accueille plusieurs mobilites pour adapter chaque mission a la distance, au volume et aux rues de la ville.</p></div>
        <div className="scooter-showcase">
          <span className="new-badge"><Zap size={13} fill="currentColor" /> Nouveau en Algerie</span>
          <div className="scooter-halo halo-a" /><div className="scooter-halo halo-b" />
          <div className="hero-scooter"><ScooterMark size={210} /></div>
          <div className="scooter-copy"><span>Trottinette electrique</span><h3>Silencieuse. Agile.<br />Faite pour la ville.</h3><p>Une nouvelle maniere d'assurer les livraisons courtes, rapidement et avec une empreinte reduite.</p></div>
          <div className="scooter-specs"><div><strong>0</strong><span>Emission directe</span></div><div><strong>100%</strong><span>Electrique</span></div><div><strong>Urbain</strong><span>Trajets courts</span></div></div>
        </div>
        <div className="vehicle-options">
          <article><span className="vehicle-icon"><Bike size={35} strokeWidth={1.8} /></span><div><strong>Velo</strong><small>Leger et responsable</small></div><Check size={18} /></article>
          <article><span className="vehicle-icon"><MotorcycleMark /></span><div><strong>Moto</strong><small>Rapide et polyvalente</small></div><Check size={18} /></article>
          <article><span className="vehicle-icon"><CarFront size={35} strokeWidth={1.8} /></span><div><strong>Voiture</strong><small>Pour les grands colis</small></div><Check size={18} /></article>
          <article className="electric-option"><span className="vehicle-icon"><ScooterMark size={36} /></span><div><strong>Trottinette</strong><small>La mobilite nouvelle</small></div><Zap size={18} fill="currentColor" /></article>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="web-section trust-section" id="entreprise">
      <div className="trust-intro"><p className="web-eyebrow">Pensee pour ici</p><h2>Une technologie mondiale.<br />Une execution locale.</h2><p>Livri est construite autour des usages algeriens: paiement direct, assistance de proximite, tarification lisible et validation rigoureuse des livreurs.</p></div>
      <div className="trust-bento">
        <article className="trust-card trust-main"><ShieldCheck size={38} /><div><span>Securite</span><h3>Des livreurs verifies avant leur premiere course.</h3></div><p>Identite, permis, assurance et vehicule sont controles pour proteger chaque utilisateur.</p></article>
        <article className="trust-card"><Zap size={30} /><strong>30 sec</strong><p>pour proposer une mission aux livreurs disponibles.</p></article>
        <article className="trust-card"><Headphones size={30} /><strong>Support local</strong><p>Une equipe proche pour traiter demandes et litiges.</p></article>
        <article className="trust-card wide"><BadgeCheck size={30} /><div><strong>Suivi transparent</strong><p>Chaque changement de statut est conserve dans l'historique de livraison.</p></div></article>
      </div>
    </section>
  );
}

function AppleStoreMark() {
  return <svg className="official-store-logo apple-store-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.05 12.54c-.02-2.36 1.93-3.51 2.02-3.56-1.1-1.61-2.82-1.83-3.43-1.86-1.44-.15-2.84.86-3.57.86-.74 0-1.86-.84-3.07-.81-1.56.02-3.02.93-3.82 2.34-1.66 2.87-.42 7.09 1.17 9.41.8 1.14 1.72 2.41 2.92 2.36 1.18-.05 1.62-.76 3.04-.76 1.41 0 1.82.76 3.05.73 1.26-.02 2.06-1.14 2.83-2.29.92-1.31 1.29-2.61 1.31-2.68-.03-.01-2.43-.93-2.45-3.74ZM14.7 5.59c.65-.81 1.1-1.91.97-3.02-.94.04-2.12.65-2.8 1.44-.6.69-1.14 1.83-.99 2.9 1.06.08 2.15-.53 2.82-1.32Z" /></svg>;
}

function GooglePlayMark() {
  return <svg className="official-store-logo" viewBox="0 0 28 31" aria-hidden="true"><path fill="#00d7fe" d="M1.3 1.4a2.2 2.2 0 0 0-.6 1.55v25.1c0 .6.22 1.12.58 1.52L15.35 15.5 1.3 1.4Z"/><path fill="#ffce00" d="m20.04 10.82-4.69 4.68L1.3 1.4c.28-.27.66-.43 1.1-.43.31 0 .62.09.9.25l16.74 9.6Z"/><path fill="#f63448" d="m20.05 20.17-16.8 9.62c-.67.38-1.43.28-1.96-.22l14.06-14.06 4.7 4.66Z"/><path fill="#00f076" d="m26.05 14.26-6.01-3.44-4.69 4.69 4.7 4.66 6-3.44c1.04-.6 1.04-1.87 0-2.47Z"/></svg>;
}

function DownloadSection() {
  return (
    <section className="download-section" id="telecharger">
      <div className="download-copy"><p className="web-eyebrow">Bientot sur vos stores</p><h2>Votre prochaine livraison commence ici.</h2><p>Rejoignez les premiers utilisateurs de Livri et decouvrez une nouvelle facon de faire circuler les choses a Alger.</p><div className="store-buttons"><button aria-label="Telecharger Livri sur l'App Store"><AppleStoreMark /><span>Telecharger sur<br /><strong>l'App Store</strong></span></button><button aria-label="Telecharger Livri sur Google Play"><GooglePlayMark /><span>Disponible sur<br /><strong>Google Play</strong></span></button></div></div>
      <div className="download-visual"><div className="floating-order"><span><PackageCheck /></span><div><small>Livraison terminee</small><strong>Merci d'avoir choisi Livri</strong></div><Check /></div><div className="download-word">livri<span>.</span></div><div className="download-route"><i /><b /><i /></div></div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main"><div className="footer-brand"><a className="site-logo" href="#accueil">livri<span>.</span></a><p>La livraison multi-services<br />pensee pour l'Algerie.</p><span className="footer-location"><MapPin size={15} /> Alger, Algerie</span></div><div className="footer-links"><div><strong>Livri</strong><a href="#services">Services</a><a href="#fonctionnement">Comment ca marche</a><a href="#entreprise">Notre entreprise</a></div><div><strong>Rejoindre</strong><a href="#partenaires">Devenir livreur</a><a href="#partenaires">Devenir commercant</a><a href="mailto:contact@livri.dz">Nous contacter</a></div><div><strong>Legal</strong><a href="#contact">Conditions d'utilisation</a><a href="#contact">Confidentialite</a><a href="#contact">Reglement interieur</a></div></div></div>
      <div className="footer-bottom"><span>© 2026 Livri. Tous droits reserves.</span><span className="footer-credit">Developed by <a href="https://sitemagique.com" target="_blank" rel="noreferrer">SITEMAGIQUE</a></span><span>Fait a Alger pour l'Algerie.</span></div>
    </footer>
  );
}

export default function App() {
  return <div className="website"><SiteHeader /><main><HeroSection /><div className="stats-strip"><div className="stat-card"><span className="stat-icon"><Sparkles size={20} /></span><span className="stat-copy"><strong>6 services</strong><small>Pour tous vos besoins</small></span></div><div className="stat-card"><span className="stat-icon"><WalletCards size={20} /></span><span className="stat-copy"><strong>200 DA</strong><small>Prix minimum</small></span></div><div className="stat-card"><span className="stat-icon"><Route size={20} /></span><span className="stat-copy"><strong>Temps reel</strong><small>Suivi de bout en bout</small></span></div><div className="stat-card"><span className="stat-icon"><Building2 size={20} /></span><span className="stat-copy"><strong>3 espaces</strong><small>Client, livreur, commerce</small></span></div></div><ServicesSection /><StepsSection /><AudienceSection /><VehiclesSection /><TrustSection /><DownloadSection /></main><SiteFooter /></div>;
}
