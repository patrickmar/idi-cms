/*@type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    screens: {
      // @media (min-width: 640px) { ... } 
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      // xs: 0,
      // sm: 600,
      // md: 900,
      // lg: 1200,
      // xl: 1536,
    },
    extend: {
      backgroundImage: {
        img1: "url('./src/imgs/img1.png')",
        img2: "url('./src/imgs/img2.png')",
        img3: "url('./src/imgs/img3.png')",
        img4: "url('./src/imgs/img4.png')",
      },
      colors: {
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a"
        },
        primary2: "#25aae1",
        secondary: "#c10006",
        info: "#096df3",
        success: "#25e182",
        warning: "#eabb2d",
        error: "#eb5757",
        black: "#1d1d1d",
        // "ql-snow": "#ffffff",
        background: { bg: 'rgb(249 250 251 / 1)' },
        atendiOrangeColor: '#EC661D',
        atendiIndigoColor: 'rgb(35, 8, 113)'
      }
    },
    fontFamily: {
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms')
  ],
}

