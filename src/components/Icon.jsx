const paths = {
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  star: <path d="m12 3 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3L3 9.6l6.2-.9Z" />,
  users: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3" /></>,
  pokeball: <><circle cx="12" cy="12" r="9" /><path d="M3 12h6m6 0h6" /><circle cx="12" cy="12" r="3" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  shuffle: <><path d="m17 3 4 4-4 4M3 7h3c5 0 7 10 12 10h3M3 17h3c1.6 0 3-1.1 4.3-3M14 9c1.3-1.3 2.5-2 4-2h3m-4 6 4 4-4 4" /></>,
  'arrow-right': <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
  'arrow-left': <><path d="M20 12H4m6-6-6 6 6 6" /></>,
  'chevron-right': <path d="m9 5 7 7-7 7" />,
  x: <path d="m6 6 12 12M6 18 18 6" />,
  award: <><circle cx="12" cy="8" r="5" /><path d="m8 12-1 9 5-3 5 3-1-9" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  book: <><path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1v15" /></>,
  leaf: <><path d="M20 3C9 2 3 8 5 15c1 4 8 6 12 1 3-4 3-10 3-13ZM4 21 15 10" /></>,
  filter: <><path d="M4 7h16M7 12h10m-7 5h4" /></>,
}

export default function Icon({ name, size = 20, className = '', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...props}>
      {paths[name] || paths.pokeball}
    </svg>
  )
}
