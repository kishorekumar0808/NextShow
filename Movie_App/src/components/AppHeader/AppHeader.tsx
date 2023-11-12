import {Pressable, Text, View} from 'react-native';
import React from 'react';
import CustomIcon from '../../Assets/CustomIcon/CustomIcon';
import {styles} from './Style';
import {AppHeaderProps} from './Type';

export const AppHeader: React.FC<AppHeaderProps> = ({
  iconName,
  header,
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onClose} style={styles.iconBG}>
        <CustomIcon name={`${iconName}`} style={styles.iconStyle} />
      </Pressable>
      <Text style={styles.headerText}>{header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};
