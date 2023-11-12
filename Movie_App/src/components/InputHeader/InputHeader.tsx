import {TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTSIZE} from '../../Assets/theme/theme';
import CustomIcon from '../../Assets/CustomIcon/CustomIcon';
import {InputHeaderProps} from './Type';
import {styles} from './Style';

export const InputHeader: React.FC<InputHeaderProps> = props => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={styles.inputBox}>
      <TextInput
        placeholder="Search Your Movies..."
        placeholderTextColor={COLORS.WhiteRGBA32}
        style={styles.textInput}
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <TouchableOpacity onPress={() => props.searchFunction?.(searchText)}>
        <CustomIcon
          name="search"
          color={COLORS.Orange}
          size={FONTSIZE.size_20}
        />
      </TouchableOpacity>
    </View>
  );
};
