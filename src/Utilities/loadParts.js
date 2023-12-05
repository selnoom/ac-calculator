const contexts = {
    head: require.context('../Data/Head', false, /\.json$/),
    units: require.context('../Data/Units', false, /\.json$/),
    core: require.context('../Data/Core', false, /\.json$/),
    arms: require.context('../Data/Arms', false, /\.json$/),
    legs: require.context('../Data/Legs', false, /\.json$/),
    booster: require.context('../Data/Booster', false, /\.json$/),
    fcs: require.context('../Data/FCS', false, /\.json$/),
    generator: require.context('../Data/Generator', false, /\.json$/),
    expansion: require.context('../Data/Expansion', false, /\.json$/)
};

const loadDataForPartType = (partType, allowedSlots = null) => {
    if (["rightArm", "leftArm", "rightShoulder", "leftShoulder"].includes(partType)) {
        const context = contexts['units'];
        return context.keys().map(context).filter(part => {
            return part.PartSlot && Array.isArray(part.PartSlot) && 
                   allowedSlots && part.PartSlot.some(slot => allowedSlots.includes(slot));
        });
    } else {
        const context = contexts[partType];
        if (!context) {
            console.warn(`Unknown partType: ${partType}. Returning an empty array.`);
            return [];
        }
        return context.keys().map(context);
    }
};


export default loadDataForPartType;