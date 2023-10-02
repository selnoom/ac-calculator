import LegData from '../Data/legs.json';
import Part from '../Models/Part';

export const loadLegs = () => {
  return LegData.map(leg => new Part(leg.id, leg.type, leg.slot, leg.weight, leg.enLoad, leg.imageUrl, leg.features));
};
