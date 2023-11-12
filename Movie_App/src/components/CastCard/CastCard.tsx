import {Image, Text, View} from 'react-native';
import React from 'react';
import {SPACING} from '../../Assets/theme/theme';
import {styles} from './Style';
import {CastCardProps} from './Type';

export const CastCard: React.FC<CastCardProps> = ({
  image,
  name,
  subTitle,
  cardWidth,
  marginAtEnd,
  isFirst,
  isLast,
}) => {
  return (
    <View
      style={[
        styles.container,
        marginAtEnd
          ? isFirst
            ? {marginLeft: SPACING.space_24}
            : isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {},
        {maxWidth: cardWidth},
      ]}>
      <Image
        source={{uri: image}}
        style={[styles.cardImg, {width: cardWidth}]}
      />
      <Text numberOfLines={1} style={styles.name}>
        {name}
      </Text>
      <Text numberOfLines={1} style={styles.subTitle}>
        {subTitle}
      </Text>
    </View>
  );
};
