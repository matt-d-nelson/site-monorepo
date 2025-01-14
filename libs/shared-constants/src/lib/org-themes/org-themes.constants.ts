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
    black: '#030303',
    black2: '#200f1c',
    black3: '#34172c',
    black4: '#512445',
    black5: '#6d305d',
    black6: '#81396f',
    darkPink: '#9d4686',
    pink: '#ec78d1',
    gold: '#d1b166',
    orange: '#ffac6b',
    yellow: '#ffd360',
    purple: '#9179e3',
    salmon: '#ff6fa7',
    white: '#eaeaea',
    offWhite: '#e3e3e3',
    offBlack: '#191919',
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
      textColor: OrgBaseColors[ORGIDS.MATT].offWhite,
      homeTrack: {
        id: -1,
        name: 'Sweet Dreams',
        audioUrl:
          'https://res.cloudinary.com/dllkd6o9h/video/upload/v1736798417/monorepo/12356/static/cto9vzsxxu5x6vzcfsn4.mp3',
        trackPlacement: 1,
      },
    },
  },
  [ORGIDS.MATT]: {
    core: {
      [CORE_COLORS.PRIMARY]: OrgBaseColors[ORGIDS.MATT].pink,
      [CORE_COLORS.SECONDARY]: OrgBaseColors[ORGIDS.MATT].gold,
      [CORE_COLORS.WARNING]: OrgBaseColors[ORGIDS.MATT].yellow,
      [CORE_COLORS.DANGER]: OrgBaseColors[ORGIDS.MATT].salmon,
      background: OrgBaseColors[ORGIDS.MATT].offWhite,
      footer: OrgBaseColors[ORGIDS.MATT].black,
      text: OrgBaseColors[ORGIDS.MATT].black,
    },
    backgroundWave: {
      waveColors: {
        w1: OrgBaseColors[ORGIDS.MATT].black,
        w2: OrgBaseColors[ORGIDS.MATT].black2,
        w3: OrgBaseColors[ORGIDS.MATT].black3,
        w4: OrgBaseColors[ORGIDS.MATT].black4,
        w5: OrgBaseColors[ORGIDS.MATT].black5,
        w6: OrgBaseColors[ORGIDS.MATT].black6,
        w7: OrgBaseColors[ORGIDS.MATT].darkPink,
        w8: OrgBaseColors[ORGIDS.MATT].pink,
      },
      background: OrgBaseColors[ORGIDS.MATT].white,
    },
    nav: {
      color: OrgBaseColors[ORGIDS.MATT].offWhite,
      svgColor: OrgBaseColors[ORGIDS.MATT].black,
      config: [
        {
          header: 'navigate',
          links: [
            {
              title: 'home',
              nav: '/home',
              color: OrgBaseColors[ORGIDS.MATT].pink,
            },
            {
              title: 'about',
              nav: '/about',
              color: OrgBaseColors[ORGIDS.MATT].darkPink,
            },
            {
              title: 'code',
              nav: '/code',
              color: OrgBaseColors[ORGIDS.MATT].gold,
            },
            {
              title: 'music',
              nav: '/music',
              color: OrgBaseColors[ORGIDS.MATT].black6,
            },
            {
              title: 'video',
              nav: '/video',
              color: OrgBaseColors[ORGIDS.MATT].black5,
            },
          ],
        },
        {
          header: 'connect',
          links: [
            {
              title: 'linkedIn',
              externalNav: 'https://www.linkedin.com/in/matthew-dav-nelson/',
              color: OrgBaseColors[ORGIDS.MATT].black4,
            },
            {
              title: 'github',
              externalNav: 'https://github.com/matt-d-nelson',
              color: OrgBaseColors[ORGIDS.MATT].black3,
            },
            {
              title: 'email',
              externalNav: 'mailto:matt.dav.nelson@gmail.com',
              color: OrgBaseColors[ORGIDS.MATT].black2,
            },
          ],
        },
      ],
    },
    footer: {
      color: OrgBaseColors[ORGIDS.MATT].black,
      textColor: OrgBaseColors[ORGIDS.MATT].white,
      homeTrack: {
        id: -1,
        name: 'Pictures',
        audioUrl:
          'https://res.cloudinary.com/dllkd6o9h/video/upload/v1736809344/monorepo/67890/static/msahjoa1iwi6fbuqgzm6.mp3',
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
    logo: 'https://res.cloudinary.com/dllkd6o9h/image/upload/v1736785750/monorepo/67890/static/zg93ibktdes1jjdizdqp.png',
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
