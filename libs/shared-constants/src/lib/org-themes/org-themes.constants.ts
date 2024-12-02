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
  [ORGIDS.MATT]: {},
}

const OrgComponentColors = {
  [ORGIDS.TELESTELA]: {
    core: {
      [CORE_COLORS.PRIMARY]: OrgBaseColors[ORGIDS.TELESTELA].green,
      [CORE_COLORS.SECONDARY]: OrgBaseColors[ORGIDS.TELESTELA].pink,
      [CORE_COLORS.WARNING]: OrgBaseColors[ORGIDS.TELESTELA].orange,
      [CORE_COLORS.DANGER]: OrgBaseColors[ORGIDS.TELESTELA].red,
    },
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
    main: {
      background: OrgBaseColors[ORGIDS.TELESTELA].black,
      text: OrgBaseColors[ORGIDS.TELESTELA].offWhite,
    },
    nav: {
      title: 'telestela',
      color: OrgBaseColors[ORGIDS.TELESTELA].offBlack,
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
              nav: '',
              color: OrgBaseColors[ORGIDS.TELESTELA].green,
            },
            {
              title: 'instagram',
              nav: '',
              color: OrgBaseColors[ORGIDS.TELESTELA].red,
            },
            {
              title: 'email',
              nav: '',
              color: OrgBaseColors[ORGIDS.TELESTELA].purple,
            },
          ],
        },
      ],
    },
  },
  [ORGIDS.MATT]: {},
}

const OrgStaticImages = {
  [ORGIDS.TELESTELA]: {
    homePage:
      'https://res.cloudinary.com/dllkd6o9h/image/upload/v1732407756/monorepo/12356/static/uibreyyhdx6f1fvx5qt3.png',
    logo: 'https://res.cloudinary.com/dllkd6o9h/image/upload/v1732553990/monorepo/12356/static/vrcvulamgzqwq4gezrwv.png',
  },
  [ORGIDS.MATT]: {},
}

export const OrgThemes = {
  [ORGIDS.TELESTELA]: {
    baseColors: OrgBaseColors[ORGIDS.TELESTELA],
    componentColors: OrgComponentColors[ORGIDS.TELESTELA],
    staticImages: OrgStaticImages[ORGIDS.TELESTELA],
  },
  [ORGIDS.MATT]: {
    baseColors: OrgBaseColors[ORGIDS.MATT],
    componentColors: OrgComponentColors[ORGIDS.MATT],
    staticImages: OrgStaticImages[ORGIDS.MATT],
  },
}
