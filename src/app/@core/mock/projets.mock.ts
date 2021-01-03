export const PROJETS = [
    {
        id: '1',
        tranche: '1',
        numero: '1D2321',
    },
    {
        id: '2',
        tranche: '2',
        numero: '2R2121',
    },
];

export function getProjetFromId(id: string) {
    return PROJETS.find(projet => projet.id === id);
}