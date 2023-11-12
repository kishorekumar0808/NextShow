import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovieCastDetails, getMovieDetails} from '../../api/response';
import {COLORS} from '../../Assets/theme/theme';
import {AppHeader} from '../../components/AppHeader';
import {baseImagePath} from '../../api/apiCalls';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../../Assets/CustomIcon/CustomIcon';
import {CategoryHeader} from '../../components/CategoryHeader';
import {CastCard} from '../../components/CastCard';
import {styles} from './Style';

export const MovieDetailsScreen = ({navigation, route}: any) => {
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setMovieCastData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movieId);
      setMovieData(tempMovieData);
    })();

    (async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieId);
      setMovieCastData(tempMovieCastData.cast);
    })();
  }, []);

  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewCont}
        bounces={false}
        style={styles.container}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            iconName="close"
            header="Movie details"
            onClose={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingCont}>
          <ActivityIndicator color={COLORS.Orange} size={'large'} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      bounces={false}
      style={styles.container}>
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{
            uri: baseImagePath('w780', movieData?.backdrop_path),
          }}
          style={styles.imageBg}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader iconName="close" onClose={() => navigation.goBack()} />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imageBg}></View>
        <Image
          source={{uri: baseImagePath('w342', movieData?.poster_path)}}
          style={styles.cardImage}
        />
      </View>

      <View style={styles.timeContainer}>
        <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.runtimeText}>
          {Math.floor(movieData?.runtime / 60)}h{' '}
          {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>

      <View>
        <Text style={styles.title}>{movieData?.original_title}</Text>
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item: any) => {
            return (
              <View style={styles.genreBox} key={item.id}>
                <Text style={styles.genreText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.tagline}>{movieData?.tagline}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <CustomIcon name="star" style={styles.starIcon} />
          <Text style={styles.runtimeText}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text style={styles.runtimeText}>
            {movieData?.release_date.substring(8, 10)}{' '}
            {new Date(movieData?.release_date).toLocaleString('default', {
              month: 'long',
            })}{' '}
            {movieData?.release_date.substring(0, 4)}
          </Text>
        </View>
        <Text style={styles.descriptionText}>{movieData?.overview}</Text>
      </View>

      <View>
        <CategoryHeader title="Top Cast" />
        <FlatList
          data={movieCastData}
          horizontal={true}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => (
            <CastCard
              marginAtEnd={true}
              cardWidth={80}
              isFirst={index == 0 ? true : false}
              isLast={index == movieCastData?.length - 1 ? true : false}
              image={baseImagePath('w185', item.profile_path)}
              name={item.original_name}
              subTitle={item.character}
            />
          )}
        />
        <View>
          <TouchableOpacity
            style={styles.buttonBg}
            onPress={() => {
              navigation.push('SeatBooking', {
                BgImage: baseImagePath('w780', movieData.backdrop_path),
                PosterImage: baseImagePath('original', movieData.poster_path),
              });
            }}>
            <View style={styles.buttonCont}>
              <Text style={styles.buttonText}>Select Seats</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
