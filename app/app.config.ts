export default defineAppConfig({
  global: {
    picture: {
      dark: '/img/logo.jpg',
      light: '/img/logo.jpg',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/markidesign/15min',
    email: 'markidesign@gmail.com',
    available: true
  },
  profile: {
    name: 'Marki Design',
    job: 'Diseño de relojes acrílicos de lujo',
    email: 'markidesign@gmail.com',
    phone: '(+57) 317 800 0000',
    picture: '/img/logo.jpg'
  },
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Built by Yurier Herrera • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-instagram',
      'to': 'https://www.instagram.com/markidesign_/?utm_source=ig_web_button_share_sheet',
      'target': '_blank',
      'aria-label': 'Abrir Instagram'
    }, {
      'icon': 'i-simple-icons-gmail',
      'to': 'mailto:markidesign@gmail.com',
      'target': '_blank',
      'aria-label': 'Mandar un correo'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/markidesign',
      'target': '_blank',
      'aria-label': 'Arkitos en X'
    }, {
      'icon': 'i-simple-icons-whatsapp',
      'to': 'https://wa.me/55296764',
      'target': '_blank',
      'aria-label': 'Escribir al WhatsApp'
    }]
  }
})
