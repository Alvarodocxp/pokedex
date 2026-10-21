import Icon from './Icon.jsx'

const navigation = [
  { id: 'pokedex', label: 'Pokédex', icon: 'grid' },
  { id: 'favorites', label: 'Favoritos', icon: 'star' },
  { id: 'trainers', label: 'Treinadores', icon: 'users' },
]

export default function Header({ activePage, onNavigate, favoriteCount }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#conteudo" onClick={() => onNavigate('pokedex')} aria-label="Pokédex, início">
        <span className="brand-mark"><Icon name="pokeball" size={32} /></span>
        <span>pokédex<span className="brand-period">.</span></span>
      </a>
      <nav className="navigation" aria-label="Navegação principal">
        {navigation.map((item) => (
          <button key={item.id} type="button" className={`nav-item ${activePage === item.id ? 'is-active' : ''}`} aria-label={item.label} aria-current={activePage === item.id ? 'page' : undefined} onClick={() => onNavigate(item.id)}>
            <Icon name={item.icon} size={21} /><span>{item.label}</span>
            {item.id === 'favorites' && <span className="nav-count">{favoriteCount}</span>}
            {item.id === 'pokedex' && <span className="nav-count">151</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-region"><Icon name="globe" size={16} /><span>Kanto · 1ª geração</span></div>
    </aside>
  )
}
