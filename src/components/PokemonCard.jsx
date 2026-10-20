import { STAT_FIELDS, formatId } from '../data/pokedex.js'
import PokemonImage from './PokemonImage.jsx'
import TypeBadge from './TypeBadge.jsx'
import Icon from './Icon.jsx'

export default function PokemonCard({ pokemon, onSelect, isFavorite, onToggleFavorite }) {
  const displayedTypes = pokemon.types.length ? pokemon.types : [{ id: 0, name: 'Typeless' }]
  const primaryType = displayedTypes[0].name.toLowerCase()

  return (
    <article className={`pokemon-card card-type-${primaryType}`} style={{ '--card-color': `var(--type-${primaryType})` }} aria-label={pokemon.name}>
      <div className="card-topline">
        <span className="pokemon-number">{formatId(pokemon.id)}</span>
        <button type="button" className={`icon-button favorite-button ${isFavorite ? 'is-favorite' : ''}`} onClick={() => onToggleFavorite(pokemon.id)} aria-label={`${isFavorite ? 'Remover' : 'Adicionar'} ${pokemon.name} ${isFavorite ? 'dos' : 'aos'} favoritos`} aria-pressed={isFavorite} title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}><Icon name="star" size={18} /></button>
      </div>
      <button type="button" className="pokemon-card-open" onClick={() => onSelect(pokemon)} aria-label={`Ver detalhes de ${pokemon.name}`}>
        <span className="pokemon-art"><span className="art-pokeball" aria-hidden="true"><Icon name="pokeball" size={140} /></span><PokemonImage pokemon={pokemon} /></span>
        <span className="pokemon-name">{pokemon.name}</span>
        <span className="type-badges">{displayedTypes.map((type) => <TypeBadge key={type.id} type={type} />)}</span>
        <span className="card-stats">
          {STAT_FIELDS.map(({ key, shortLabel, label }) => <span className="card-stat" key={key}><abbr title={label}>{shortLabel}</abbr><span>{pokemon.stats[key]}</span></span>)}
        </span>
        <span className="card-detail-link">Ver detalhes <Icon name="arrow-right" size={14} /></span>
      </button>
    </article>
  )
}
