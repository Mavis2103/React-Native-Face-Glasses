import {View, FlatList, TouchableOpacity, ListRenderItem} from 'react-native';

import FastImage from 'react-native-fast-image';
import {SelectGlassesProps} from '../CameraFace.interface';

const assets = [
  'https://th.bing.com/th/id/R.c55ba5a997ba432269cb1c4c196801ea?rik=IpfheawqGVMy2w&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f1%2fGlasses-PNG-Pic.png&ehk=eXJA4zC0XWFdJ%2bKtN2wq0dmMCqFshrT89hYsr1mXRiU%3d&risl=&pid=ImgRaw&r=0',
  'https://th.bing.com/th/id/R.56a999fa096e58bfa4e1be2c7cbd867a?rik=0w3%2f5pZakV4t7g&pid=ImgRaw&r=0',
];

const SelectGlasses: React.FC<SelectGlassesProps> = ({onSelected}) => {
  const renderItem: ListRenderItem<string> = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onSelected(item)}>
        <FastImage
          style={{width: 100, height: 100}}
          source={{uri: item}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{height: 100, alignItems: 'center'}}>
      <FlatList
        data={assets}
        horizontal
        renderItem={renderItem}
        disableScrollViewPanResponder
      />
    </View>
  );
};

export default SelectGlasses;
