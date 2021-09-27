import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import {FilterOptions} from './FilterOptions';
import CheckBox from 'react-native-check-box';
import {FilterContext} from './FilterDataProvider';

const FilterScreen = ({modalRef}) => {
  const {setSelectedFilterData, selectedFilterData} = useContext(FilterContext);
  const [selectedItem, setSelectedItem] = useState(FilterOptions[0]);
  const [selectedId, setSelectedId] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState({});
  const [isSelectAll, setIsSelectAll] = useState(false);
  // const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilterData(FilterOptions);
    if (FilterOptions) {
      setSelectedItem(FilterOptions[0]);
      FilterOptions[0].isChecked = true;
    }
  }, []);

  useEffect(() => {
    isItemSelectedAll(selectedItem);
  }, [isSelectAll, selectedItem, filterData]);

  const isItemSelectedAll = selectedItem => {
    let checker = selectedItem.subItems.every(v => v.isSubChecked === true);
    checker ? setIsSelectAll(true) : setIsSelectAll(false);
  };

  const handleSelection = id => {
    const tempFilterOption = [...FilterOptions];
    tempFilterOption.map(tempItem => {
      if (tempItem.id === id) {
        tempItem.isChecked = true;
        setSelectedItem(tempItem);
        setSelectedId(id);
      } else {
        tempItem.isChecked = false;
        setSelectedId(null);
      }
    });
    isItemSelectedAll(selectedItem);
    setFilterData(tempFilterOption);
  };

  const handleSubSelection = (id, index) => {
    const tempSelectedItem = {...selectedItem};
    const tempSubSelectedItem = [...tempSelectedItem.subItems];
    const tempSubItem = tempSubSelectedItem.find(element => element.id === id);

    tempSubItem.isSubChecked = !tempSubItem.isSubChecked;
    setSelectedItem(tempSelectedItem);
  };
  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
    selectedItem.subItems.map(item => {
      item.isSubChecked = !isSelectAll;
    });
    setSelectedItem(selectedItem);
  };

  const handleFilterData = () => {
    let price = [];
    let brand = [];
    let size = [];
    let color = [];
    let discount = [];
    let tempFilteredData = {};

    filterData.map(filterItem => {
      if (filterItem.title === 'Price') {
        filterItem.subItems.map(subItem =>
          subItem.isSubChecked ? price.push(subItem) : null,
        );
      } else if (filterItem.title === 'Brand') {
        filterItem.subItems.map(subItem =>
          subItem.isSubChecked ? brand.push(subItem) : null,
        );
      } else if (filterItem.title === 'Size') {
        filterItem.subItems.map(subItem =>
          subItem.isSubChecked ? size.push(subItem) : null,
        );
      } else if (filterItem.title === 'Color') {
        filterItem.subItems.map(subItem =>
          subItem.isSubChecked ? color.push(subItem) : null,
        );
      } else if (filterItem.title === 'Discount') {
        filterItem.subItems.map(subItem =>
          subItem.isSubChecked ? discount.push(subItem) : null,
        );
      }
    });

    tempFilteredData.price = price;
    tempFilteredData.brand = brand;
    tempFilteredData.size = size;
    tempFilteredData.color = color;
    tempFilteredData.discount = discount;
    setSelectedFilterData(tempFilteredData);
    modalRef.current.close();
  };

  return (
    <View>
      <View style={styles.container}>
        <FlatList
          data={filterData}
          renderItem={item => (
            <TouchableOpacity
              onPress={() => handleSelection(item.item.id)}
              style={
                item.item.isChecked ? styles.selected : styles.nonSelected
              }>
              <Text style={{color: '#000'}}>{item.item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={{flexDirection: 'column', width: 165}}>
          <View style={styles.subItems}>
            <CheckBox
              style={{
                flex: 1,
                padding: 10,
              }}
              onClick={handleSelectAll}
              isChecked={isSelectAll}
            />
            <TouchableOpacity style={styles.item}>
              <Text style={{color: '#000'}}>All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={selectedItem.subItems}
            renderItem={({item, index}) => (
              <View style={styles.subItems}>
                <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={() => handleSubSelection(item.id, index)}
                  isChecked={selectedItem?.subItems[index].isSubChecked}
                />

                <TouchableOpacity style={styles.item}>
                  <Text style={{color: '#000'}}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={{color: '#FFF'}}>CLEAR All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterData}>
          <Text style={{color: '#FFF'}}>APPLY FILTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  selected: {
    height: 60,
    width: 150,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#17e617',
  },
  nonSelected: {
    height: 60,
    width: 150,
    backgroundColor: '#F1F1F1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subItems: {
    flexDirection: 'row',
    height: 60,
    width: 120,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    justifyContent: 'center',
  },
  selectAll: {
    height: 60,
    width: 120,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
  },
  subContainer: {
    flexDirection: 'column',
    height: 60,
    width: 120,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    justifyContent: 'center',
  },
  item: {
    position: 'absolute',
    left: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 62,
    // backgroundColor: 'red',
    zIndex: 2,
  },
  clearButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    backgroundColor: '#30302F',
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 245,
    backgroundColor: '#DE8511',
  },
});
