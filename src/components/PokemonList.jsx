import PokemonCard from './PokemonCard.jsx'
import Icon from './Icon.jsx'

export default function PokemonList({ pokemon, favorites, onSelect, onToggleFavorite, isFavoritesPage, hasFilters, onReset, onExplore }) {
  if (!pokemon.length) {
    return (
      <section className="empty-state" aria-label="Nenhum Pokémon encontrado">
        <span className="empty-icon"><Icon name={isFavoritesPage && !hasFilters ? 'star' : 'search'} size={38} /></span>
        <h2>{isFavoritesPage && !hasFilters ? 'Nenhum favorito' : 'Nenhum Pokémon encontrado'}</h2>
        <p>{isFavoritesPage && !hasFilters ? 'Marque a estrela de um Pokémon para adicioná-lo.' : 'Altere a pesquisa ou os tipos selecionados.'}</p>
        <button className="button button-primary" type="button" onClick={hasFilters ? onReset : onExplore}>{hasFilters ? 'Limpar filtros' : 'Ver Pokémon'}<Icon name="arrow-right" size={16} /></button>
      </section>
    )
  }

  return <div className="pokemon-grid">{pokemon.map((item) => <PokemonCard key={item.id} pokemon={item} isFavorite={favorites.includes(item.id)} onSelect={onSelect} onToggleFavorite={onToggleFavorite} />)}</div>
}
