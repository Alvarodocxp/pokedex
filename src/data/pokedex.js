import data from './pokedex-data.json';

// O arquivo fornecido pela atividade é a única fonte de dados da aplicação.
export const pokemon = data.pokemon;
export const trainers = data.trainers;
export const types = data.types;

export const STAT_FIELDS = [
  { key: 'hp', label: 'HP', shortLabel: 'HP' },
  { key: 'attack', label: 'Ataque', shortLabel: 'ATQ' },
  { key: 'defense', label: 'Defesa', shortLabel: 'DEF' },
  { key: 'specialAttack', label: 'Ataque especial', shortLabel: 'ATQ. ESP.' },
  { key: 'specialDefense', label: 'Defesa especial', shortLabel: 'DEF. ESP.' },
  { key: 'speed', label: 'Velocidade', shortLabel: 'VEL' },
];

export const typeLabels = {
  Typeless: 'Sem tipo',
  Normal: 'Normal',
  Fire: 'Fogo',
  Water: 'Água',
  Grass: 'Planta',
  Electric: 'Elétrico',
  Ice: 'Gelo',
  Fighting: 'Lutador',
  Poison: 'Veneno',
  Ground: 'Terra',
  Flying: 'Voador',
  Psychic: 'Psíquico',
  Bug: 'Inseto',
  Rock: 'Pedra',
  Ghost: 'Fantasma',
  Dark: 'Sombrio',
  Dragon: 'Dragão',
  Steel: 'Aço',
};

export function formatId(id) {
  return `#${String(id).padStart(3, '0')}`;
}

export function getArtwork(id) {
  return `${import.meta.env.BASE_URL}images/pokemon/${id}.png`;
}

export function normalizeSearch(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function filterPokemon(
  list,
  { query = '', selectedTypes = [], favoritesOnly = false, favorites = [], sort = 'id' } = {},
) {
  const search = normalizeSearch(query);
  const searchedId = /^#?\d+$/.test(search) ? Number(search.replace('#', '')) : null;
  const normalizedTypes = selectedTypes.map(normalizeSearch);
  const favoriteIds = new Set(favorites.map(Number));
  const statSort = STAT_FIELDS.some(({ key }) => key === sort);

  return list
    .filter((entry) => {
      const matchesQuery = !search || (searchedId !== null
        ? entry.id === searchedId
        : normalizeSearch(entry.name).includes(search));
      const matchesTypes = normalizedTypes.every((selectedType) => (
        (selectedType === 'typeless' && entry.types.length === 0)
        || entry.types.some((entryType) => normalizeSearch(entryType.name) === selectedType)
      ));
      const matchesFavorites = !favoritesOnly || favoriteIds.has(entry.id);
      return matchesQuery && matchesTypes && matchesFavorites;
    })
    .sort((left, right) => {
      if (sort === 'name') {
        return left.name.localeCompare(right.name, 'pt-BR') || left.id - right.id;
      }
      if (statSort) {
        return right.stats[sort] - left.stats[sort] || left.id - right.id;
      }
      return left.id - right.id;
    });
}
