import React, {useState, useEffect, createContext} from 'react';
export const FilterContext = createContext();
const initialState = {
  price: [],
  color: [],
  discount: [],
  size: [],
  brand: [],
};

const FilterDataProvider = props => {
  const [selectedFilterData, setSelectedFilterData] = useState(initialState);

  return (
    <FilterContext.Provider
      value={{
        selectedFilterData,
        setSelectedFilterData,
      }}>
      {props.children}
    </FilterContext.Provider>
  );
};
export default FilterDataProvider;
