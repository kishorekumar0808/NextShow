import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {SPACING} from '../../Assets/theme/theme';
import CustomIcon from '../../Assets/CustomIcon/CustomIcon';
import {MovieCardProps, genresData} from './Type';
import {styles} from './Style';

export const MovieCard: React.FC<MovieCardProps> = ({
  image,
  title,
  cardFunction,
  cardWidth,
  marginAtEnd,
  marginAround,
  isFirst,
  isLast,
  vote_average,
  vote_count,
  genre,
  genresList = genresData,
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

        <View>
          <View style={styles.rateContainer}>
            <CustomIcon name="star" style={styles.starIcon} />
            <Text style={styles.voteText}>
              {vote_average} ({vote_count})
            </Text>
          </View>
          <Text style={styles.textTitle} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.genreContainer}>
            {genre?.map(item => {
              return (
                <View key={item} style={styles.genreBox}>
                  <Text style={styles.genreText}>{genresList[item]}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
