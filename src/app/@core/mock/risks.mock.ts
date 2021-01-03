export const RISKS = [
    {
        id: '1',
        label: 'Tir Radiographique',
        vitale: true,
    },
    {
        id: '2',
        label: 'Levage',
        vitale: true,
    },
    {
        id: '3',
        label: 'Risque éléctrique',
        vitale: true,
    },
    {
        id: '4',
        label: 'Chute de hauteur',
        vitale: true,
    },
    {
        id: '5',
        label: 'Contamination',
        vitale: false,
    },
    {
        id: '6',
        label: 'Chute de plain pied',
        vitale: false,
    },
    {
        id: '7',
        label: 'Glissage',
        vitale: false,
    },
    {
        id: '8',
        label: 'Bruit',
        vitale: false,
    },
];

export function getRiskFromId(id: string) {
    return RISKS.find(risk => risk.id === id);
}
