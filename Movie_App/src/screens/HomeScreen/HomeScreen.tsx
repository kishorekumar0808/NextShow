import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SPACING} from '../../Assets/theme/theme';
import {InputHeader} from '../../components/InputHeader';
import {
  getNowPlayingMoviesList,
  getPopularMoviesList,
  getUpComingMoviesList,
} from '../../api/response';
import {CategoryHeader} from '../../components/CategoryHeader';
import {SubMovieCard} from '../../components/SubMovieCard';
import {baseImagePath} from '../../api/apiCalls';
import {MovieCard} from '../../components/MovieCard';
import {styles} from './Style';

const {width} = Dimensions.get('window');
export const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upComingMoviesList, setUpComingMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);

      const tempPopularMovies = await getPopularMoviesList();
      setPopularMoviesList(tempPopularMovies.results);

      const tempUpcomingMovies = await getUpComingMoviesList();
      setUpComingMoviesList(tempUpcomingMovies.results);
    })();
  }, []);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  const emptyScenario =
    nowPlayingMoviesList === undefined &&
    nowPlayingMoviesList === null &&
    popularMoviesList === undefined &&
    popularMoviesList === null &&
    upComingMoviesList === undefined &&
    upComingMoviesList === null;

  if (emptyScenario) {
    return (
      <View style={styles.container}>
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>

        <View style={styles.loadingCont}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </View>
    );
  }
  return (
    <ScrollView scrollEnabled bounces={false} style={styles.container}>
      <StatusBar hidden />

      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      <CategoryHeader title={'Now Playing'} />
      <FlatList
        horizontal
        bounces={false}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.7 + SPACING.space_36}
        data={nowPlayingMoviesList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.containerGap}
        renderItem={({item, index}) => {
          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}>
                {}
              </View>
            );
          }
          return (
            <MovieCard
              cardWidth={width * 0.7}
              image={baseImagePath('w780', item.poster_path)}
              title={item.original_title}
              isFirst={index === 0 ? true : false}
              isLast={index === upComingMoviesList?.length - 1 ? true : false}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieId: item.id});
              }}
            />
          );
        }}
      />
      <CategoryHeader title={'Popular'} />
      <FlatList
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={popularMoviesList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.containerGap}
        renderItem={({item, index}) => (
          <SubMovieCard
            cardWidth={width / 3}
            image={baseImagePath('w342', item.poster_path)}
            title={item.original_title}
            isFirst={index === 0 ? true : false}
            isLast={index === upComingMoviesList?.length - 1 ? true : false}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
          />
        )}
      />
      <CategoryHeader title={'Upcoming'} />

      <FlatList
        horizontal
        bounces={false}
        data={upComingMoviesList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.containerGap}
        renderItem={({item, index}) => (
          <SubMovieCard
            cardWidth={width / 3}
            image={baseImagePath('w342', item.poster_path)}
            title={item.original_title}
            isFirst={index === 0 ? true : false}
            isLast={index === upComingMoviesList?.length - 1 ? true : false}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
          />
        )}
      />
    </ScrollView>
  );
};
