export const PROJETS = [
    {
        id: '1',
        tranche: '1',
        numero: '1D2321',
        date: new Date('02/10/21'),
    },
    {
        id: '2',
        tranche: '2',
        numero: '2R2121',
        date: new Date('17/04/21'),
    },
    {
        id: '3',
        tranche: '2',
        numero: 'test',
        date: new Date('17/04/21'),
    },
];

export function getProjetFromId(id: string) {
    return PROJETS.find(projet => projet.id === id);
}
