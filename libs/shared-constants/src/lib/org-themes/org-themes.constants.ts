import { ORGIDS } from '../org-ids.constants'
import { CORE_COLORS } from './org-themes.models'

const OrgBaseColors = {
  [ORGIDS.TELESTELA]: {
    yellow: '#fedf25',
    orange: '#ffa959',
    red: '#f46d6a',
    lightGreen: '#9be0aa',
    green: '#2cc7c9',
    pink: '#ea97dd',
    blue: '#007ace',
    purple: '#6759bb',
    offWhite: '#e6e6e6',
    black: '#2b2b2b',
    offBlack: '#323232',
  },
  [ORGIDS.MATT]: {
    gold1: '#d3993a',
    gold2: '#d39446',
    gold3: '#d68f57',
    gold4: '#d98572',
    pink1: '#d9817c',
    pink2: '#da7f82',
    pink3: '#dc7994',
    pink4: '#e168c5',
    white: '#fff8ef',
    offWhite: '#fff5e6',
    medBrown: '#68512f',
    darkBrown: '#352c1d',
    black: '#2b2b2b',
    offBlack: '#323232',
  },
}

const OrgComponentColors = {
  [ORGIDS.TELESTELA]: {
    core: {
      [CORE_COLORS.PRIMARY]: OrgBaseColors[ORGIDS.TELESTELA].green,
      [CORE_COLORS.SECONDARY]: OrgBaseColors[ORGIDS.TELESTELA].pink,
      [CORE_COLORS.WARNING]: OrgBaseColors[ORGIDS.TELESTELA].orange,
      [CORE_COLORS.DANGER]: OrgBaseColors[ORGIDS.TELESTELA].red,
      background: OrgBaseColors[ORGIDS.TELESTELA].black,
      navbars: OrgBaseColors[ORGIDS.TELESTELA].offBlack,
      text: OrgBaseColors[ORGIDS.TELESTELA].offWhite,
    },
    backgroundWave: {
      waveColors: {
        w1: OrgBaseColors[ORGIDS.TELESTELA].purple,
        w2: OrgBaseColors[ORGIDS.TELESTELA].blue,
        w3: OrgBaseColors[ORGIDS.TELESTELA].pink,
        w4: OrgBaseColors[ORGIDS.TELESTELA].green,
        w5: OrgBaseColors[ORGIDS.TELESTELA].lightGreen,
        w6: OrgBaseColors[ORGIDS.TELESTELA].red,
        w7: OrgBaseColors[ORGIDS.TELESTELA].orange,
        w8: OrgBaseColors[ORGIDS.TELESTELA].yellow,
      },
      background: OrgBaseColors[ORGIDS.TELESTELA].black,
    },
    nav: {
      color: OrgBaseColors[ORGIDS.TELESTELA].offBlack,
      svgColor: OrgBaseColors[ORGIDS.TELESTELA].offWhite,
      config: [
        {
          header: 'navigate',
          links: [
            {
              title: 'home',
              nav: '/home',
              color: OrgBaseColors[ORGIDS.TELESTELA].yellow,
            },
            {
              title: 'about',
              nav: '/about',
              color: OrgBaseColors[ORGIDS.TELESTELA].blue,
            },
            {
              title: 'music',
              nav: '/music',
              color: OrgBaseColors[ORGIDS.TELESTELA].lightGreen,
            },
            {
              title: 'video',
              nav: '/video',
              color: OrgBaseColors[ORGIDS.TELESTELA].orange,
            },
            {
              title: 'events',
              nav: '/events',
              color: OrgBaseColors[ORGIDS.TELESTELA].pink,
            },
          ],
        },
        {
          header: 'connect',
          links: [
            {
              title: 'facebook',
              externalNav: 'https://www.facebook.com/Telestela',
              color: OrgBaseColors[ORGIDS.TELESTELA].green,
            },
            {
              title: 'instagram',
              externalNav: 'https://www.instagram.com/telestela',
              color: OrgBaseColors[ORGIDS.TELESTELA].red,
            },
            {
              title: 'email',
              externalNav: 'mailto:telestela.booking@gmail.com',
              color: OrgBaseColors[ORGIDS.TELESTELA].purple,
            },
          ],
        },
      ],
    },
    footer: {
      color: OrgBaseColors[ORGIDS.TELESTELA].offBlack,
      homeTrack: {
        id: -1,
        name: 'Sweet Dreams',
        audioUrl:
          'https://res.cloudinary.com/dllkd6o9h/video/upload/v1735591883/monorepo/12356/static/Telestela_-_SpeakSiren_-_03_-_Sweet_Dreams_urnvdb.wav',
        trackPlacement: 1,
      },
    },
  },
  [ORGIDS.MATT]: {
    core: {
      [CORE_COLORS.PRIMARY]: OrgBaseColors[ORGIDS.MATT].gold1,
      [CORE_COLORS.SECONDARY]: OrgBaseColors[ORGIDS.MATT].gold4,
      [CORE_COLORS.WARNING]: OrgBaseColors[ORGIDS.MATT].pink1,
      [CORE_COLORS.DANGER]: OrgBaseColors[ORGIDS.MATT].pink4,
      background: OrgBaseColors[ORGIDS.MATT].gold1,
      navbars: OrgBaseColors[ORGIDS.MATT].offBlack,
      text: OrgBaseColors[ORGIDS.MATT].offWhite,
    },
    backgroundWave: {
      waveColors: {
        w1: OrgBaseColors[ORGIDS.MATT].gold1,
        w2: OrgBaseColors[ORGIDS.MATT].gold2,
        w3: OrgBaseColors[ORGIDS.MATT].gold3,
        w4: OrgBaseColors[ORGIDS.MATT].gold4,
        w5: OrgBaseColors[ORGIDS.MATT].pink1,
        w6: OrgBaseColors[ORGIDS.MATT].pink2,
        w7: OrgBaseColors[ORGIDS.MATT].pink3,
        w8: OrgBaseColors[ORGIDS.MATT].pink4,
      },
      background: OrgBaseColors[ORGIDS.MATT].black,
    },
    nav: {
      color: OrgBaseColors[ORGIDS.MATT].offBlack,
      svgColor: OrgBaseColors[ORGIDS.MATT].offWhite,
      config: [
        {
          header: 'navigate',
          links: [
            {
              title: 'home',
              nav: '/home',
              color: OrgBaseColors[ORGIDS.TELESTELA].yellow,
            },
            {
              title: 'about',
              nav: '/about',
              color: OrgBaseColors[ORGIDS.TELESTELA].blue,
            },
            {
              title: 'music',
              nav: '/music',
              color: OrgBaseColors[ORGIDS.TELESTELA].lightGreen,
            },
            {
              title: 'video',
              nav: '/video',
              color: OrgBaseColors[ORGIDS.TELESTELA].orange,
            },
            {
              title: 'events',
              nav: '/events',
              color: OrgBaseColors[ORGIDS.TELESTELA].pink,
            },
          ],
        },
        {
          header: 'connect',
          links: [
            {
              title: 'facebook',
              externalNav: 'https://www.facebook.com/Telestela',
              color: OrgBaseColors[ORGIDS.TELESTELA].green,
            },
            {
              title: 'instagram',
              externalNav: 'https://www.instagram.com/telestela',
              color: OrgBaseColors[ORGIDS.TELESTELA].red,
            },
            {
              title: 'email',
              externalNav: 'mailto:telestela.booking@gmail.com',
              color: OrgBaseColors[ORGIDS.TELESTELA].purple,
            },
          ],
        },
      ],
    },
    footer: {
      color: OrgBaseColors[ORGIDS.MATT].offBlack,
      homeTrack: {
        id: -1,
        name: 'Sweet Dreams',
        audioUrl:
          'https://res.cloudinary.com/dllkd6o9h/video/upload/v1735591883/monorepo/12356/static/Telestela_-_SpeakSiren_-_03_-_Sweet_Dreams_urnvdb.wav',
        trackPlacement: 1,
      },
    },
  },
}

const OrgStaticResouces = {
  [ORGIDS.TELESTELA]: {
    homePage:
      'https://res.cloudinary.com/dllkd6o9h/image/upload/v1732407756/monorepo/12356/static/uibreyyhdx6f1fvx5qt3.png',
    logo: 'https://res.cloudinary.com/dllkd6o9h/image/upload/v1732553990/monorepo/12356/static/vrcvulamgzqwq4gezrwv.png',
    eventsPage:
      'https://res.cloudinary.com/dllkd6o9h/image/upload/v1734020457/monorepo/12356/static/telestela-live-barn_ttgom2.png',
  },
  [ORGIDS.MATT]: {
    homePage:
      'https://res.cloudinary.com/dllkd6o9h/image/upload/v1736452146/monorepo/67890/static/bvwnlsr5arwn1u66py1k.png',
    logo: 'https://res.cloudinary.com/dllkd6o9h/image/upload/v1736453903/monorepo/67890/static/gilahkquda7m2iw6qivp.png',
  },
}

export const OrgThemes = {
  [ORGIDS.TELESTELA]: {
    baseColors: OrgBaseColors[ORGIDS.TELESTELA],
    componentColors: OrgComponentColors[ORGIDS.TELESTELA],
    staticResouces: OrgStaticResouces[ORGIDS.TELESTELA],
  },
  [ORGIDS.MATT]: {
    baseColors: OrgBaseColors[ORGIDS.MATT],
    componentColors: OrgComponentColors[ORGIDS.MATT],
    staticResouces: OrgStaticResouces[ORGIDS.MATT],
  },
}
