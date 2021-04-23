import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingHorizontal: 30
  },
  content: {
    paddingLeft: 30
  },
  titleStrong: {
    fontSize: 18,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 20,
    marginTop: 16
  },
  titleLight: {
    fontSize: 18,
    fontFamily: fonts.text,
    color: colors.heading
  },
  enviromentItems: {
    marginTop: 24,
    height: "20%",
  },
  plants: {
    width: "100%",
  }
});