export const CalculateCenterParc = (coordinates : number[][]) => {
    let x = 0, y = 0, area = 0;

    for (let i = 0; i < coordinates.length - 1; i++) {
        const [x1, y1] = coordinates[i];
        const [x2, y2] = coordinates[i + 1];

        const a = x1 * y2 - x2 * y1;
        x += (x1 + x2) * a;
        y += (y1 + y2) * a;
        area += a;
    }

    // formule résultant de la dérivation mathématique du centroïde pour un polygone en deux dimensions
    area = area / 2;
    x = x / (6 * area);
    y = y / (6 * area);

    return { latitude: y, longitude: x };
};

