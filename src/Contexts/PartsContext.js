import { createContext } from 'react';

const PartsContext = createContext({
    selectedPartsArray: [],
    setSelectedPartsArray: () => {},
    hasTankTreadLeg: false,
    setHasTankTreadLeg: () => {}
});

export default PartsContext;
