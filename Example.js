import React, {useRef, useContext, useState} from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FilterScreen from './FilterScreen ';
import {FilterContext} from './FilterDataProvider';

export default function Example() {
  const {selectedFilterData} = useContext(FilterContext);
  const refRBSheet = useRef();
  const [modalRef, setModalRef] = useState(refRBSheet);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
      }}>
      <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => {
          refRBSheet.current.open();
          setModalRef(refRBSheet);
        }}
      />

      <View
        style={{
          width: '70%',
          backgroundColor: '#fff',
          marginTop: 20,
          borderRadius: 10,
        }}>
        {selectedFilterData.price.length > 0 && (
          <Text style={{margin: 10}}>
            Price:
            {selectedFilterData
              ? selectedFilterData.price.map(
                  priceList => ` ${priceList.name}, `,
                )
              : ''}
          </Text>
        )}
        {selectedFilterData.size.length > 0 && (
          <Text style={{margin: 10}}>
            Size:
            {selectedFilterData
              ? selectedFilterData.size.map(sizeList => ` ${sizeList.name}, `)
              : ''}
          </Text>
        )}
        {selectedFilterData.color.length > 0 && (
          <Text style={{margin: 10}}>
            Color:
            {selectedFilterData
              ? selectedFilterData.color.map(
                  colorList => ` ${colorList.name}, `,
                )
              : ''}
          </Text>
        )}
        {selectedFilterData.brand.length > 0 && (
          <Text style={{margin: 10}}>
            Brand:
            {selectedFilterData
              ? selectedFilterData.brand.map(
                  BrandList => ` ${BrandList.name}, `,
                )
              : ''}
          </Text>
        )}
        {selectedFilterData.discount.length > 0 && (
          <Text style={{margin: 10}}>
            Discount:
            {selectedFilterData
              ? selectedFilterData.discount.map(
                  DiscountList => ` ${DiscountList.name}, `,
                )
              : ''}
          </Text>
        )}
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={380}
        openDuration={1000}
        customStyles={{
          wrapper: {
            backgroundColor: 'gray',
          },

          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <FilterScreen modalRef={modalRef} />
      </RBSheet>
    </View>
  );
}

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
});
