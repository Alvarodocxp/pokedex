import { useEffect, useState } from 'react'
import { filterPokemon, pokemon, STAT_FIELDS } from './data/pokedex.js'
import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import PokemonList from './components/PokemonList.jsx'
import PokemonDetails from './components/PokemonDetails.jsx'
import Trainers from './components/Trainers.jsx'
import PokemonImage from './components/PokemonImage.jsx'
import Icon from './components/Icon.jsx'

const FAVORITES_KEY = 'pokedex-kanto-favorites'

function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
    return Array.isArray(saved) ? [...new Set(saved.filter((id) => pokemon.some((item) => item.id === id)))] : []
  } catch {
    return []
  }
}

export default function App() {
  const [activePage, setActivePage] = useState('pokedex')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [sort, setSort] = useState('id')
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [favorites, setFavorites] = useState(readFavorites)
  const isFavoritesPage = activePage === 'favorites'
  const hasFilters = query.trim() !== '' || type !== 'all'
  const filteredPokemon = filterPokemon(pokemon, { query, type, sort, favorites, favoritesOnly: isFavoritesPage })

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch {
      // A coleção continua disponível nesta sessão quando o navegador bloqueia armazenamento.
    }
  }, [favorites])

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function resetFilters() {
    setQuery('')
    setType('all')
  }

  function navigate(page) {
    setActivePage(page)
    resetFilters()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function chooseRandomPokemon() {
    const collection = filteredPokemon.length ? filteredPokemon : pokemon
    setSelectedPokemon(collection[Math.floor(Math.random() * collection.length)])
  }

  return (
    <div className="app-layout">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header activePage={activePage} onNavigate={navigate} favoriteCount={favorites.length} />
      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb"><Icon name="globe" size={17} /><span>Universo Pokémon</span><Icon name="chevron-right" size={13} /><strong>{activePage === 'trainers' ? 'Treinadores' : isFavoritesPage ? 'Favoritos' : 'Pokédex'}</strong></div>
          <span className="generation-label"><span className="status-dot" /> 1ª geração <span className="topbar-divider" /> Kanto</span>
        </header>
        <main className="main-content" id="conteudo" tabIndex={-1}>
          {activePage === 'trainers' ? <Trainers onSelectPokemon={setSelectedPokemon} /> : <>
            <section className="hero">
              <div className="hero-copy">
                <span className="eyebrow"><span className="hero-dot" /> {isFavoritesPage ? 'SUA COLEÇÃO, DO SEU JEITO' : 'A AVENTURA COMEÇA EM KANTO'}</span>
                <h1>{isFavoritesPage ? <>Os seus <em>favoritos.</em></> : <>Kanto.<br />1ª <em>Geração.</em></>}</h1>
                <p>{isFavoritesPage ? 'Um lugar especial para os Pokémon que conquistaram você.' : 'Explore os 151 Pokémon da primeira geração.'}</p>
                <div className="hero-meta"><span><Icon name="pokeball" size={16} /><strong>{isFavoritesPage ? favorites.length : pokemon.length}</strong> </span><span className="meta-dot" /></div>
              </div>
              <div className="hero-art" aria-hidden="true">
                <span className="hero-art-ring ring-one" /><span className="hero-art-ring ring-two" />
                <span className="hero-art-spark spark-one">+</span><span className="hero-art-spark spark-two">+</span>
                <PokemonImage pokemon={pokemon[0]} className="hero-pokemon hero-bulbasaur" loading="eager" alt="" />
                <PokemonImage pokemon={pokemon[6]} className="hero-pokemon hero-squirtle" loading="eager" alt="" />
                <PokemonImage pokemon={pokemon[3]} className="hero-pokemon hero-charmander" loading="eager" alt="" />
                <span className="hero-art-caption">SEU PRIMEIRO PARCEIRO ESTÁ AQUI.</span>
              </div>
            </section>
            <SearchBar query={query} onQueryChange={setQuery} type={type} onTypeChange={setType} hasFilters={hasFilters} onReset={resetFilters} />
            <div className="results-toolbar">
              <div className="results-title"><h2>{isFavoritesPage ? 'Minha coleção' : 'Todos os Pokémon'}</h2><span className="results-count" role="status" aria-live="polite" aria-atomic="true">{filteredPokemon.length} {filteredPokemon.length === 1 ? 'encontrado' : 'encontrados'}</span></div>
              <div className="results-actions">
                <button type="button" className="random-button" onClick={chooseRandomPokemon} title="Descobrir um Pokémon aleatório"><Icon name="shuffle" size={16} /><span>Surpreenda-me</span></button>
                <span className="toolbar-divider" />
                <label className="sort-label" htmlFor="pokemon-sort">Ordenar por:</label>
                <select id="pokemon-sort" className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="id">Nº da Pokédex</option><option value="name">Nome (A–Z)</option>
                  {STAT_FIELDS.map(({ key, label }) => <option key={key} value={key}>{label} (maior primeiro)</option>)}
                </select>
              </div>
            </div>
            <PokemonList pokemon={filteredPokemon} favorites={favorites} onSelect={setSelectedPokemon} onToggleFavorite={toggleFavorite} isFavoritesPage={isFavoritesPage} hasFilters={hasFilters} onReset={resetFilters} onExplore={() => navigate('pokedex')} />
          </>}
          <footer className="page-footer"><span><Icon name="pokeball" size={16} /> Uma nova descoberta a cada Pokémon.</span><span>KANTO · GERAÇÃO 01</span></footer>
        </main>
      </div>
      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} onSelect={setSelectedPokemon} favorites={favorites} onToggleFavorite={toggleFavorite} />}
    </div>
  )
}
