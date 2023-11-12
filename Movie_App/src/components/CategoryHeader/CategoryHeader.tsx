import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './Style';
import {CategoryHeaderProsp} from './Type';

export const CategoryHeader: React.FC<CategoryHeaderProsp> = ({title}) => {
  return (
    <View>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};
