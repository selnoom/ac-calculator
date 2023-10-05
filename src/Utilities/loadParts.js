const headContext = require.context('../Data/Head', false, /\.json$/);

export const loadHeads = () => {
    // Use the keys() method to get all the filenames and map over them to get their default export
    const heads = headContext.keys().map(headContext);
    return heads;
}