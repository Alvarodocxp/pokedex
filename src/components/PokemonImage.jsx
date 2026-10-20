import { useState } from 'react'
import { getArtwork } from '../data/pokedex.js'
import Icon from './Icon.jsx'

export default function PokemonImage({ pokemon, className = '', ...props }) {
  const [failedSource, setFailedSource] = useState(null)
  const source = getArtwork(pokemon.id)

  if (failedSource === source) {
    return <span className={`image-fallback ${className}`} role="img" aria-label={`Ilustração indisponível de ${pokemon.name}`}><Icon name="pokeball" size={64} /></span>
  }

  return <img className={className} src={source} alt={pokemon.name} loading="lazy" decoding="async" width="475" height="475" {...props} onError={() => setFailedSource(source)} />
}
