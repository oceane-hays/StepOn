export const formattedSteps = (steps: number) => {
    return(new Intl.NumberFormat('fr-FR').format(steps));
}