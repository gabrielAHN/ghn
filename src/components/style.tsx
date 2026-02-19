export const ColorDict = {
    "end": [255,139,142],
    "middle": [255, 228, 139],
    "start": [181,229,80],
    "unkown": [250, 250, 250]
}

export const rgbToHex = (rgb) => {
    const [r, g, b] = rgb;
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

export const RideType = {
    "electric_bike":  [255, 228, 139],
    "normal": [59, 130, 246]
}