import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: 'center',
    width: 76,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.shape,
    marginRight: 4
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.text,
    color: colors.heading
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
    fontWeight: "bold"
  }
});