import { pokemon, trainers } from '../data/pokedex';
import Icon from './Icon';
import PokemonImage from './PokemonImage';

const pokemonById = new Map(pokemon.map((entry) => [entry.id, entry]));

function getInitials(name) {
  return name.split(' ').slice(0, 2).map((part) => part[0]).join('');
}

export default function Trainers({ onSelectPokemon }) {
  return (
    <section aria-labelledby="trainers-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">COMPANHEIROS DE JORNADA</p>
          <h2 className="section-title" id="trainers-title">Cada treinador, uma história<span>.</span></h2>
          <p className="section-description">Conheça os treinadores de Kanto e os Pokémon que estão ao seu lado.</p>
        </div>
        <span className="trainer-count"><Icon name="users" size={18} />{trainers.length} treinadores</span>
      </div>

      <div className="trainers-grid">
        {trainers.map((trainer) => (
          <article className="trainer-card" key={trainer.id} aria-labelledby={`trainer-${trainer.id}`}>
            <div className="trainer-heading">
              <div className="trainer-avatar" aria-hidden="true">{getInitials(trainer.name)}</div>
              <div className="trainer-meta">
                <h3 id={`trainer-${trainer.id}`}>{trainer.name}</h3>
                <span className="trainer-badges">
                  <Icon name="award" size={15} />
                  {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
                </span>
              </div>
            </div>

            <p className="eyebrow">EQUIPE · {trainer.pokemonIds.length} POKÉMON</p>
            <div className="trainer-team">
              {trainer.pokemonIds.map((pokemonId, index) => {
                const member = pokemonById.get(pokemonId);
                if (!member) return null;

                return (
                  <button
                    className="trainer-pokemon"
                    type="button"
                    key={`${pokemonId}-${index}`}
                    onClick={() => onSelectPokemon(member)}
                    aria-label={`Ver detalhes de ${member.name}, da equipe de ${trainer.name}`}
                  >
                    <PokemonImage pokemon={member} className="trainer-pokemon-image" alt="" />
                    <span className="trainer-pokemon-name">{member.name}</span>
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
