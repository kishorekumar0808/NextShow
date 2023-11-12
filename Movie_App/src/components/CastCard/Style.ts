import {StyleSheet} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../../Assets/theme/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImg: {
    aspectRatio: 1920 / 2880,
    borderRadius: BORDERRADIUS.radius_25 * 2,
  },
  name: {
    alignSelf: 'center',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  subTitle: {
    alignSelf: 'center',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.White,
  },
});
