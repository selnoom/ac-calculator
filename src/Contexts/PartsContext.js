import { createContext } from 'react';

const PartsContext = createContext({
    selectedPartsArray: [],
    setSelectedPartsArray: () => {},
    hasTankTreadLeg: false,
    setHasTankTreadLeg: () => {},
    totalLoad: 0,
    setTotalLoad: () => {},
    maxLoadLimit: 3000
});

export default PartsContext;
