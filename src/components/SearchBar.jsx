import { types, typeLabels } from '../data/pokedex.js'
import Icon from './Icon.jsx'

export default function SearchBar({ query, onQueryChange, type, onTypeChange, onReset, hasFilters }) {
  return (
    <section className="search-panel" aria-label="Pesquisa e filtros de Pokémon">
      <div className="search-row">
        <div className="search-input-wrap">
          <Icon name="search" size={21} />
          <label className="sr-only" htmlFor="pokemon-search">Pesquisar Pokémon por nome ou ID</label>
          <input id="pokemon-search" type="search" placeholder="Qual Pokémon você está procurando?" value={query} onChange={(event) => onQueryChange(event.target.value)} autoComplete="off" />
          <span className="search-hint">Nome ou Nº</span>
        </div>
        <div className="type-select-wrap">
          <Icon name="filter" size={18} />
          <label className="sr-only" htmlFor="type-filter">Filtrar por tipo</label>
          <select id="type-filter" value={type} onChange={(event) => onTypeChange(event.target.value)}>
            <option value="all">Todos os tipos</option>
            {types.map((item) => <option key={item.id} value={item.name}>{typeLabels[item.name] || item.name}</option>)}
          </select>
        </div>
      </div>
      <div className="filter-row">
        <div className="quick-filters" role="group" aria-label="Tipos em destaque">
          <button type="button" className={`filter-chip ${type === 'all' ? 'is-selected' : ''}`} aria-pressed={type === 'all'} onClick={() => onTypeChange('all')}>Todos</button>
          {['Grass', 'Fire', 'Water', 'Electric', 'Psychic', 'Ghost', 'Dragon', 'Rock'].map((name) => (
            <button key={name} type="button" className={`filter-chip type-${name.toLowerCase()} ${type === name ? 'is-selected' : ''}`} aria-pressed={type === name} onClick={() => onTypeChange(type === name ? 'all' : name)}>
              <span className="type-dot" aria-hidden="true" />{typeLabels[name]}
            </button>
          ))}
        </div>
        {hasFilters && <button type="button" className="clear-filters" onClick={onReset}><Icon name="x" size={13} /> Limpar</button>}
      </div>
    </section>
  )
}
