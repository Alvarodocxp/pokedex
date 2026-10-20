import { useEffect, useId, useRef } from 'react';
import { pokemon as allPokemon, trainers, STAT_FIELDS, formatId } from '../data/pokedex';
import Icon from './Icon';
import PokemonImage from './PokemonImage';
import TypeBadge from './TypeBadge';

const maxStat = Math.max(...allPokemon.flatMap((entry) => Object.values(entry.stats)));
const catalog = [...allPokemon].sort((first, second) => first.id - second.id);

export default function PokemonDetails({ pokemon, onClose, onSelect, favorites, onToggleFavorite }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const isOpen = Boolean(pokemon);

  useEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  if (!pokemon) return null;

  const index = catalog.findIndex((entry) => entry.id === pokemon.id);
  const previous = catalog[(index - 1 + catalog.length) % catalog.length];
  const next = catalog[(index + 1) % catalog.length];
  const relatedTrainers = trainers.filter((trainer) => trainer.pokemonIds.includes(pokemon.id));
  const isFavorite = favorites.includes(pokemon.id);
  const displayedTypes = pokemon.types.length ? pokemon.types : [{ id: 0, name: 'Typeless' }];
  const total = STAT_FIELDS.reduce((sum, stat) => sum + pokemon.stats[stat.key], 0);

  function dismiss() {
    dialogRef.current.close();
    onClose();
  }

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom
    ) dismiss();
  }

  return (
    <dialog
      ref={dialogRef}
      className="pokemon-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={handleBackdropClick}
      style={{ '--type-color': `var(--type-${displayedTypes[0].name.toLowerCase()})` }}
    >
      <button className="dialog-close icon-button" type="button" aria-label="Fechar detalhes" onClick={dismiss} autoFocus>
        <Icon name="x" />
      </button>

      <div className="detail-layout">
        <div className="detail-art">
          <span className="eyebrow">POKÉDEX {formatId(pokemon.id)}</span>
          <PokemonImage pokemon={pokemon} loading="eager" />
        </div>

        <div className="detail-content">
          <div className="type-badges">
            {displayedTypes.map((type) => <TypeBadge key={type.id} type={type} />)}
          </div>
          <h2 id={titleId} className="detail-title">{pokemon.name}</h2>
          <p className="detail-description">Conheça seus atributos e os treinadores que fazem parte da sua jornada.</p>

          <section className="detail-stats" aria-label="Atributos base">
            <div className="detail-stats-heading">
              <h3>Atributos base</h3>
              <span>Total <strong>{total}</strong></span>
            </div>
            <div className="stat-list">
              {STAT_FIELDS.map((stat) => (
                <div key={stat.key} className="stat-row">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{pokemon.stats[stat.key]}</span>
                  <div className="stat-track" aria-hidden="true">
                    <div className="stat-fill" style={{ width: `${(pokemon.stats[stat.key] / maxStat) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-trainers" aria-label="Treinadores relacionados">
            <h3>Treinadores</h3>
            {relatedTrainers.length ? (
              <div className="trainer-chips">
                {relatedTrainers.map((trainer) => (
                  <span className="trainer-chip" key={trainer.id}>
                    <Icon name="users" size={14} />{trainer.name}
                  </span>
                ))}
              </div>
            ) : <p>Nenhum treinador associado.</p>}
          </section>

          <button
            type="button"
            className={`button button-primary favorite-button${isFavorite ? ' is-favorite' : ''}`}
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(pokemon.id)}
          >
            <Icon name="star" size={18} />
            {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          </button>
        </div>
      </div>

      <div className="detail-footer">
        <button type="button" className="button button-secondary" onClick={() => onSelect(previous)} aria-label={`Pokémon anterior: ${previous.name}`}>
          <Icon name="arrow-left" size={17} />
          <span><small className="detail-nav-label">Anterior</small>{previous.name}</span>
        </button>
        <button type="button" className="button button-secondary" onClick={() => onSelect(next)} aria-label={`Próximo Pokémon: ${next.name}`}>
          <span><small className="detail-nav-label">Próximo</small>{next.name}</span>
          <Icon name="arrow-right" size={17} />
        </button>
      </div>
    </dialog>
  );
}
