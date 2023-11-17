import { createContext } from 'react';

const PartsContext = createContext({
    selectedPartsArray: [],
    setSelectedPartsArray: () => {},
    hasTankTreadLeg: false,
    setHasTankTreadLeg: () => {},
    totalLoad: 0,
    setTotalLoad: () => {},
    maxLoadLimit: 8000
});

export default PartsContext;
