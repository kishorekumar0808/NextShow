import React, {useState, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {COLORS, FONTSIZE, SPACING} from '../../Assets/theme/theme';
import {baseImagePath, searchMovies} from '../../api/apiCalls';
import {InputHeader} from '../../components/InputHeader';
import {SubMovieCard} from '../../components/SubMovieCard';
import CustomIcon from '../../Assets/CustomIcon/CustomIcon';
import {styles} from './Style';

const {width} = Dimensions.get('screen');

export const SearchScreen = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const searchMoviesFunction = async (name: string) => {
    try {
      setIsLoading(true);
      let response = await fetch(searchMovies(name));
      let jsonResponse = await response.json();
      setSearchList(jsonResponse.results);
      setIsEmpty(jsonResponse.results.length === 0);
    } catch (error) {
      console.error('searchMoviesFunction error');
      setIsEmpty(true);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setSearchList([]);
      setIsLoading(false);
      setIsEmpty(false);
      setSearchText('');
    }, []),
  );

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(loadingTimeout);
    };
    setSearchText('');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={{flex: 1}}>
        <FlatList
          bounces={false}
          numColumns={2}
          data={searchList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.centerContainer}
          ListHeaderComponent={
            <View style={styles.inputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction} />
            </View>
          }
          renderItem={({item, index}) => (
            <SubMovieCard
              cardWidth={width / 2 - SPACING.space_12 * 2}
              marginAround={true}
              marginAtEnd={false}
              image={baseImagePath('w342', item.poster_path)}
              title={item.original_title}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieId: item.id});
              }}
            />
          )}
        />

        {isLoading &&
          !isEmpty && ( // Showing loading indicator if not empty
            <View style={styles.loader}>
              <ActivityIndicator size={'large'} color={COLORS.Orange} />
            </View>
          )}

        {isEmpty && ( // Showing empty view if isEmpty is true
          <View style={styles.emptyView}>
            <CustomIcon
              name="search"
              color={COLORS.Orange}
              size={FONTSIZE.size_30}
            />
            <Text style={styles.emptyText}>No data found</Text>
          </View>
        )}
      </View>
    </View>
  );
};
