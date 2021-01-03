export const ZONES = [
    {
        id: '1',
        label: 'BR Supérieur',
    },
    {
        id: '2',
        label: 'Pince Vapeur / SDM',
    },
    {
        id: '3',
        label: 'SDP / Diesel',
    },
    {
        id: '4',
        label: 'BR inférieur',
    },
    {
        id: '5',
        label: 'BAN/BAS/BK/BN',
    },
];

export function getZoneFromId(id: string) {
    return ZONES.find(zone => zone.id === id);
}
