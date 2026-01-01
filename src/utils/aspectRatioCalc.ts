const isAspectRatio = (
    width: number,
    height: number,
    target: number,
    tolerance: number,
): boolean => {
    const ratio = width / height;
    return Math.abs(ratio - target) <= tolerance;
};

export default isAspectRatio