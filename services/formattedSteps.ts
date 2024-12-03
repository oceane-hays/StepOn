export const formattedSteps = (steps: number): string => {
    return Intl.NumberFormat('fr-FR').format(steps);
};