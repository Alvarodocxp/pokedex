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
      <div className="sidebar-label">SEU GUIA DE EXPLORAÇÃO</div>
      <nav className="navigation" aria-label="Navegação principal">
        {navigation.map((item) => (
          <button key={item.id} type="button" className={`nav-item ${activePage === item.id ? 'is-active' : ''}`} aria-label={item.label} aria-current={activePage === item.id ? 'page' : undefined} onClick={() => onNavigate(item.id)}>
            <Icon name={item.icon} size={21} /><span>{item.label}</span>
            {item.id === 'favorites' && <span className="nav-count">{favoriteCount}</span>}
            {item.id === 'pokedex' && <span className="nav-count">151</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-guide">
        <span className="guide-icon"><Icon name="book" size={24} /></span>
        <strong>Um universo de descobertas</strong>
        <p>Conheça os Pokémon, explore seus tipos e encontre seus favoritos.</p>
        <span className="guide-line" />
        <span className="guide-region"><span className="status-dot" /> Região de Kanto</span>
      </div>
      <div className="sidebar-footer"><Icon name="pokeball" size={18} /><span>Feito para quem ama Pokémon.</span></div>
    </aside>
  )
}
