const contexts = {
    head: require.context('../Data/Head', false, /\.json$/),
    rightArm: require.context('../Data/RightArm', false, /\.json$/),
    leftArm: require.context('../Data/LeftArm', false, /\.json$/),
    rightShoulder: require.context('../Data/RightShoulder', false, /\.json$/),
    leftShoulder: require.context('../Data/LeftShoulder', false, /\.json$/),
    core: require.context('../Data/Core', false, /\.json$/),
    arms: require.context('../Data/Arms', false, /\.json$/),
    legs: require.context('../Data/Legs', false, /\.json$/),
    booster: require.context('../Data/Booster', false, /\.json$/),
    fcs: require.context('../Data/FCS', false, /\.json$/),
    generator: require.context('../Data/Generator', false, /\.json$/),
    expansion: require.context('../Data/Expansion', false, /\.json$/)
};

const loadDataForPartType = (partType) => {
    const context = contexts[partType];
    if (!context) {
        console.warn(`Unknown partType: ${partType}. Returning an empty array.`);
        return [];
    }
    return context.keys().map(context);
};

export default loadDataForPartType;