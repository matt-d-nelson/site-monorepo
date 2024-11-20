import { ORGIDS } from "./org-ids.constants";

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
        offWhite: '#e2e2e2'
    },
    [ORGIDS.MATT]: {}
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
            w8: OrgBaseColors[ORGIDS.TELESTELA].yellow
        }
    },
    [ORGIDS.MATT]: {

    }
}

export const OrgThemes= {
    [ORGIDS.TELESTELA]: {
        baseColors: OrgBaseColors[ORGIDS.TELESTELA],
        componentColors: OrgComponentColors[ORGIDS.TELESTELA]
    },
    [ORGIDS.MATT]: {
        baseColors: OrgBaseColors[ORGIDS.MATT],
        componentColors: OrgComponentColors[ORGIDS.MATT]
    }
}