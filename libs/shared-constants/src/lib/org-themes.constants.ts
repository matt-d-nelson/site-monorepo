import { ORGIDS } from './org-ids.constants'

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
    offWhite: '#f4f5f7',
    offBlack: '#3f3e3c',
  },
  [ORGIDS.MATT]: {},
}

const OrgComponentColors = {
  [ORGIDS.TELESTELA]: {
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
      background: OrgBaseColors[ORGIDS.TELESTELA].offBlack,
      border: OrgBaseColors[ORGIDS.TELESTELA].offWhite,
    },
  },
  [ORGIDS.MATT]: {},
}

const OrgStaticImages = {
  [ORGIDS.TELESTELA]: {
    homePage:
      'https://res.cloudinary.com/dllkd6o9h/image/upload/v1732407756/monorepo/12356/static/uibreyyhdx6f1fvx5qt3.png',
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
