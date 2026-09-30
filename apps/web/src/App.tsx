import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Status = 'inbox' | 'saved' | 'shortlisted' | 'visited'
type Confidence = 'verified' | 'extracted' | 'estimated' | 'missing'
type Profile = 'Ismail' | 'Partner'
type Place = { id: string; name: string; location: string; category: string; price: number | null; currency: string; distanceKm: number | null; source: 'Facebook' | 'Instagram' | 'YouTube' | 'Website' | 'Manual'; sourceUrl: string; status: Status; confidence: Confidence; capturedAt: string; note: string; ratings: Record<Profile, number | null>; sample?: boolean }

const STORAGE_KEY = 'wayfare:places:v1'
const demoPlaces: Place[] = [
  { id: 'sample-river', name: 'Riverside cottage', location: 'Munshiganj, Dhaka Division', category: 'Cottage', price: 6500, currency: 'BDT', distanceKm: 42, source: 'Instagram', sourceUrl: '', status: 'shortlisted', confidence: 'extracted', capturedAt: '2026-09-29T10:00:00.000Z', note: 'Quiet, close enough for a spontaneous weekend.', ratings: { Ismail: 5, Partner: 4 }, sample: true },
  { id: 'sample-houseboat', name: 'Lake houseboat stay', location: 'Rangamati, Chattogram Division', category: 'Houseboat', price: 12000, currency: 'BDT', distanceKm: 305, source: 'Facebook', sourceUrl: '', status: 'saved', confidence: 'estimated', capturedAt: '2026-09-27T15:30:00.000Z', note: 'Price needs confirmation before planning.', ratings: { Ismail: 4, Partner: null }, sample: true },
  { id: 'sample-resort', name: 'Forest edge resort', location: 'Sreemangal, Sylhet Division', category: 'Resort', price: null, currency: 'BDT', distanceKm: 185, source: 'YouTube', sourceUrl: '', status: 'inbox', confidence: 'missing', capturedAt: '2026-09-30T08:15:00.000Z', note: 'The video looked peaceful. Needs review.', ratings: { Ismail: null, Partner: null }, sample: true },
]

const formatPrice = (place: Place) => place.price === null ? 'Price unknown' : new Intl.NumberFormat('en-BD', { style: 'currency', currency: place.currency, maximumFractionDigits: 0 }).format(place.price)
const sourceFromUrl = (url: string): Place['source'] => /instagram\.com/i.test(url) ? 'Instagram' : /facebook\.com|fb\.com/i.test(url) ? 'Facebook' : /youtube\.com|youtu\.be/i.test(url) ? 'YouTube' : url ? 'Website' : 'Manual'
const loadPlaces = () => { try { const stored = localStorage.getItem(STORAGE_KEY); return stored ? JSON.parse(stored) as Place[] : demoPlaces } catch { return demoPlaces } }

function App() {
  const [places, setPlaces] = useState<Place[]>(loadPlaces)
  const [profile, setProfile] = useState<Profile>('Ismail')
  const [view, setView] = useState<'places' | 'map' | 'trips'>('places')
  const [filter, setFilter] = useState<'all' | Status>('all')
  const [query, setQuery] = useState('')
  const [captureOpen, setCaptureOpen] = useState(() => { const p = new URLSearchParams(location.search); return Boolean(p.get('url') || p.get('text')) })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(places)), [places])
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(''), 2600); return () => clearTimeout(timer) }, [toast])

  const filtered = useMemo(() => places.filter((place) => (filter === 'all' || place.status === filter) && (!query.trim() || `${place.name} ${place.location} ${place.category}`.toLowerCase().includes(query.toLowerCase()))), [places, filter, query])
  const stats = useMemo(() => ({ total: places.length, inbox: places.filter((p) => p.status === 'inbox').length, mutual: places.filter((p) => (p.ratings.Ismail ?? 0) >= 4 && (p.ratings.Partner ?? 0) >= 4).length }), [places])
  const selected = places.find((p) => p.id === selectedId) ?? null

  const saveCapture = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const sourceUrl = String(data.get('sourceUrl') ?? '').trim()
    const locationValue = String(data.get('location') ?? '').trim()
    const priceValue = String(data.get('price') ?? '').trim()
    const place: Place = { id: crypto.randomUUID(), name: String(data.get('name') ?? '').trim() || 'Untitled place', location: locationValue || 'Location needs review', category: String(data.get('category') ?? 'Other'), price: priceValue ? Number(priceValue) : null, currency: String(data.get('currency') ?? 'BDT'), distanceKm: null, source: sourceFromUrl(sourceUrl), sourceUrl, status: 'inbox', confidence: locationValue ? 'extracted' : 'missing', capturedAt: new Date().toISOString(), note: String(data.get('note') ?? ''), ratings: { Ismail: null, Partner: null } }
    setPlaces((current) => [place, ...current]); setCaptureOpen(false); setFilter('inbox'); setToast('Saved safely to your inbox'); history.replaceState({}, '', location.pathname)
  }
  const rate = (id: string, rating: number) => setPlaces((current) => current.map((p) => p.id === id ? { ...p, ratings: { ...p.ratings, [profile]: rating } } : p))
  const changeStatus = (id: string, status: Status) => { setPlaces((current) => current.map((p) => p.id === id ? { ...p, status } : p)); setToast(`Moved to ${status}`) }
  const exportPlaces = () => { const url = URL.createObjectURL(new Blob([JSON.stringify(places, null, 2)], { type: 'application/json' })); const link = document.createElement('a'); link.href = url; link.download = `wayfare-export-${new Date().toISOString().slice(0, 10)}.json`; link.click(); URL.revokeObjectURL(url); setToast('Your collection was exported') }
  const switchProfile = () => setProfile((current) => current === 'Ismail' ? 'Partner' : 'Ismail')

  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="/"><span className="brand-mark">W</span><span><strong>Wayfare</strong><small>Our places, remembered</small></span></a>
      <nav className="primary-nav">
        <button className={view === 'places' ? 'active' : ''} onClick={() => setView('places')}><span>⌂</span> Places <b>{stats.total}</b></button>
        <button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')}><span>⌖</span> Map</button>
        <button className={view === 'trips' ? 'active' : ''} onClick={() => setView('trips')}><span>◇</span> Trips</button>
      </nav>
      <div className="sidebar-section"><p>Library</p>
        <button onClick={() => { setView('places'); setFilter('inbox') }}>Inbox <b className="warm-count">{stats.inbox}</b></button>
        <button onClick={() => { setView('places'); setFilter('shortlisted') }}>Shortlisted</button>
        <button onClick={() => { setView('places'); setFilter('visited') }}>Visited</button>
        <button onClick={() => { setView('places'); setFilter('all') }}>All places</button>
      </div>
      <div className="profile-switcher"><span className="avatar">{profile[0]}</span><button onClick={switchProfile}><strong>{profile}</strong><small>Administrator · switch</small></button></div>
    </aside>

    <main>
      <header className="topbar">
        <div className="mobile-brand"><span className="brand-mark">W</span><strong>Wayfare</strong></div>
        <label className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search places, locations, categories" /></label>
        <button className="quiet-button" onClick={exportPlaces}>Export</button><button className="capture-button" onClick={() => setCaptureOpen(true)}>＋ Save a place</button>
      </header>
      {view === 'places' && <div className="content">
        <section className="welcome-row"><div><p className="eyebrow">YOUR SHARED COLLECTION</p><h1>Where could we go next?</h1><p>Keep every possibility. Decide when the moment is right.</p></div><div className="summary-card"><strong>{stats.mutual}</strong><span>mutual favourites</span><small>Rated 4 or higher by both of you</small></div></section>
        <section className="filter-row">{(['all', 'inbox', 'saved', 'shortlisted', 'visited'] as const).map((status) => <button key={status} className={filter === status ? 'active' : ''} onClick={() => setFilter(status)}>{status === 'all' ? 'All places' : status[0].toUpperCase() + status.slice(1)}</button>)}</section>
        <section className="places-grid">{filtered.map((place) => <PlaceCard key={place.id} place={place} onOpen={() => setSelectedId(place.id)} onShortlist={() => changeStatus(place.id, 'shortlisted')} />)}{!filtered.length && <div className="empty-state"><span>⌕</span><h2>No places found</h2><p>Try another filter, or save the place you have in mind.</p><button className="capture-button" onClick={() => setCaptureOpen(true)}>Save a place</button></div>}</section>
      </div>}
      {view === 'map' && <ComingSoon icon="⌖" title="Map view comes after capture" text="We will add free, policy-compliant mapping once real places have validated the collection workflow." />}
      {view === 'trips' && <ComingSoon icon="◇" title="Trip finder is intentionally next" text="First we prove that saving and reviewing places is effortless. Then this space will answer where you can go tomorrow." />}
    </main>
    <nav className="mobile-nav"><button onClick={() => setView('places')}>⌂<small>Places</small></button><button onClick={() => setView('map')}>⌖<small>Map</small></button><button className="mobile-add" onClick={() => setCaptureOpen(true)}>＋</button><button onClick={() => setView('trips')}>◇<small>Trips</small></button><button onClick={switchProfile}>◉<small>{profile}</small></button></nav>
    {captureOpen && <CaptureDialog onClose={() => setCaptureOpen(false)} onSave={saveCapture} />}
    {selected && <PlaceDrawer place={selected} profile={profile} onClose={() => setSelectedId(null)} onRate={rate} onStatus={changeStatus} />}
    {toast && <div className="toast" role="status">✓ {toast}</div>}
  </div>
}

function PlaceCard({ place, onOpen, onShortlist }: { place: Place; onOpen: () => void; onShortlist: () => void }) {
  const values = [place.ratings.Ismail, place.ratings.Partner].filter((v): v is number => v !== null)
  const match = values.length === 2 ? Math.round((values.reduce((a, b) => a + b, 0) / 10) * 100) : null
  return <article className="place-card" onClick={onOpen}><div className={`place-visual visual-${place.category.toLowerCase()}`}><span className="source">{place.source}</span>{place.sample && <span className="sample-tag">Sample</span>}<button className="heart" onClick={(e) => { e.stopPropagation(); onShortlist() }}>♡</button><div className="landscape"><i/><i/><i/></div></div><div className="place-body"><div className="place-title-row"><div><p>{place.category} · {place.status}</p><h2>{place.name}</h2></div>{match !== null && <span className="match">{match}%<small>match</small></span>}</div><p className="location">⌖ {place.location}</p><div className="facts"><span><strong>{formatPrice(place)}</strong><small>observed price</small></span><span><strong>{place.distanceKm ? `${place.distanceKm} km` : 'Not set'}</strong><small>from home</small></span></div><div className="card-footer"><span className={`confidence confidence-${place.confidence}`}>{place.confidence}</span><span>{new Date(place.capturedAt).toLocaleDateString('en-BD', { month: 'short', day: 'numeric' })}</span></div></div></article>
}

function ComingSoon({ icon, title, text }: { icon: string; title: string; text: string }) { return <section className="coming-soon"><span>{icon}</span><p className="eyebrow">PLANNED, NOT PRETENDED</p><h1>{title}</h1><p>{text}</p></section> }

function CaptureDialog({ onClose, onSave }: { onClose: () => void; onSave: (event: FormEvent<HTMLFormElement>) => void }) {
  const p = new URLSearchParams(location.search); const initialUrl = p.get('url') || p.get('text') || ''
  return <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><section className="dialog" role="dialog" aria-modal="true"><button className="close" onClick={onClose}>×</button><p className="eyebrow">CAPTURE FIRST, ORGANIZE LATER</p><h2>Save a place</h2><p>Only the link is required. Anything missing can be reviewed later.</p><form onSubmit={onSave}>
    <label className="full">Shared link<input name="sourceUrl" type="url" defaultValue={initialUrl} placeholder="https://instagram.com/..." /></label><label className="full">Place name<input name="name" placeholder="Optional for now" /></label><label className="full">Location<input name="location" placeholder="District, city, or country" /></label><label>Category<select name="category" defaultValue="Resort"><option>Resort</option><option>Cottage</option><option>Houseboat</option><option>Hotel</option><option>Experience</option><option>Other</option></select></label><label>Observed price<input name="price" type="number" min="0" inputMode="numeric" placeholder="Optional" /></label><label>Currency<select name="currency"><option>BDT</option><option>USD</option><option>EUR</option><option>INR</option></select></label><label className="full">Quick note<textarea name="note" placeholder="What made this place interesting?" /></label><div className="dialog-actions full"><button type="button" className="quiet-button" onClick={onClose}>Cancel</button><button className="capture-button">Save safely</button></div>
  </form></section></div>
}

function PlaceDrawer({ place, profile, onClose, onRate, onStatus }: { place: Place; profile: Profile; onClose: () => void; onRate: (id: string, rating: number) => void; onStatus: (id: string, status: Status) => void }) {
  return <div className="overlay drawer-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><aside className="drawer"><button className="close" onClick={onClose}>×</button><div className={`drawer-visual visual-${place.category.toLowerCase()}`}><div className="landscape"><i/><i/><i/></div></div><p className="eyebrow">{place.category} · {place.source}</p><h2>{place.name}</h2><p className="location">⌖ {place.location}</p><div className="detail-grid"><span><small>Observed price</small><strong>{formatPrice(place)}</strong></span><span><small>From home</small><strong>{place.distanceKm ? `${place.distanceKm} km` : 'Not calculated'}</strong></span></div><section className="rating-section"><p>Your rating as <strong>{profile}</strong></p><div>{[1,2,3,4,5].map((n) => <button key={n} className={(place.ratings[profile] ?? 0) >= n ? 'rated' : ''} onClick={() => onRate(place.id, n)}>★</button>)}</div><small>Ismail: {place.ratings.Ismail ?? 'Not rated'} · Partner: {place.ratings.Partner ?? 'Not rated'}</small></section>{place.note && <blockquote>{place.note}</blockquote>}<div className="evidence-box"><span className={`confidence confidence-${place.confidence}`}>{place.confidence}</span><div><strong>Evidence status</strong><p>Review important details before booking.</p></div></div><label className="status-select">Collection status<select value={place.status} onChange={(e) => onStatus(place.id, e.target.value as Status)}><option value="inbox">Inbox</option><option value="saved">Saved</option><option value="shortlisted">Shortlisted</option><option value="visited">Visited</option></select></label>{place.sourceUrl && <a className="source-link" href={place.sourceUrl} target="_blank" rel="noreferrer">Open original source ↗</a>}</aside></div>
}

export default App
