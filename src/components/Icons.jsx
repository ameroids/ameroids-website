/** Lightweight inline stroke-icon set — no external dependency. */
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
}

const paths = {
  warehouse: (
    <>
      <path d="M3 21V9l9-5 9 5v12" />
      <path d="M7 21v-8h10v8" />
      <path d="M7 17h10M10 13v8" />
    </>
  ),
  boxes: (
    <>
      <path d="M3 9.5L12 5l9 4.5-9 4.5z" />
      <path d="M3 9.5V17l9 4.5V14" />
      <path d="M21 9.5V17l-9 4.5" />
      <path d="M7.5 7.2l9 4.5" />
    </>
  ),
  truck: (
    <>
      <path d="M1.5 6h13v11h-13z" />
      <path d="M14.5 10h4l3 3.5V17h-7" />
      <circle cx="6" cy="17.5" r="1.9" />
      <circle cx="17.5" cy="17.5" r="1.9" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 2.5h6v3H9zM8.5 10.5l2 2 4-4M8.5 16.5H15" />
    </>
  ),
  document: (
    <>
      <path d="M6 2.5h8l4 4V21.5H6z" />
      <path d="M14 2.5v4h4M9 12h6M9 15.5h6M9 8.5h2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5l8 3v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10v-6z" />
      <path d="M8.5 11.5l2.5 2.5 4.5-4.5" />
    </>
  ),
  medal: (
    <>
      <circle cx="12" cy="14.5" r="5.5" />
      <path d="M12 12.2l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3zM8 9.5L5.5 2.5h5L12 7l1.5-4.5h5L16 9.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.5V12l3.5 2.5" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M10.8 7.2L6.3 15.8M13.2 7.2l4.5 8.6M7.5 18h9" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7.5 16.5v-5M12 16.5V8M16.5 16.5v-8.5M19.5 5.5l-3 3" />
    </>
  ),
  handshake: (
    <>
      <path d="M2 7l4-1.5L12 8l6-2.5L22 7v9l-4 1.5-5-2-3.5 1.8L4 15z" />
      <path d="M12 8l-3.5 3.2a1.4 1.4 0 002 2L13 11" />
    </>
  ),
  phone: (
    <>
      <path d="M5 3h4l1.5 4.5L8 9.5a13 13 0 006.5 6.5l2-2.5L21 15v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.2-7-11.5a7 7 0 0114 0c0 5.3-7 11.5-7 11.5z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  arrow: <path d="M4 12h16m-6-6l6 6-6 6" />,
  check: <path d="M4.5 12.5l5 5L19.5 7" />,
  quote: (
    <path
      d="M9.5 8C7 8 5 10 5 12.7c0 2.3 1.7 4 3.9 4 .4 2-1 3.4-2.6 3.8 3.9.4 6.6-2.6 6.6-6.6C12.9 10.4 11.5 8 9.5 8zm9.4 0c-2.5 0-4.5 2-4.5 4.7 0 2.3 1.7 4 3.9 4 .4 2-1 3.4-2.6 3.8 3.9.4 6.6-2.6 6.6-6.6 0-3.5-1.4-5.9-3.4-5.9z"
      fill="currentColor"
      stroke="none"
    />
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  twitter: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />,
  linkedin: (
    <>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />,
  search: (
    <>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </>
  ),
  map: (
    <>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </>
  ),
  brush: <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>,
  code: (
    <>
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"></path>
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"></path>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </>
  ),
  shield_check: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M9 12l2 2 4-4"></path>
    </>
  ),
}

export default function Icon({ name, size = 26, className = '' }) {
  return (
    <svg {...base} width={size} height={size} className={className}>
      {paths[name] || paths.boxes}
    </svg>
  )
}
