import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {SPACING} from '../../Assets/theme/theme';
import {SubMovieCardProps} from './Type';
import {styles} from './Style';

export const SubMovieCard: React.FC<SubMovieCardProps> = ({
  image,
  title,
  cardFunction,
  cardWidth,
  marginAtEnd,
  marginAround,
  isFirst,
  isLast,
}) => {
  return (
    <Pressable onPress={() => cardFunction?.()}>
      <View
        style={[
          styles.cardContainer,
          marginAtEnd
            ? isFirst
              ? {marginLeft: SPACING.space_36}
              : isLast
              ? {marginRight: SPACING.space_36}
              : {}
            : null,
          marginAround ? {margin: SPACING.space_12} : {},
          {maxWidth: cardWidth},
        ]}>
        <Image
          style={[styles.imageStyle, {width: cardWidth}]}
          source={{uri: image}}
        />
        <Text style={styles.textTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
