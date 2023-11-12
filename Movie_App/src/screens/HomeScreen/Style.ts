import {StyleSheet} from 'react-native';
import {COLORS, SPACING} from '../../Assets/theme/theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingCont: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap: {
    gap: SPACING.space_36,
  },
});
