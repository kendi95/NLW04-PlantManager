import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: colors.green,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading
  }
});