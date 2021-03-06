import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  backButtonContainer: {
    marginTop: 48,
    marginLeft: 18,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  plantInfo: {
    flex: 1,
    marginTop: "-24%",
    zIndex: -1,
    paddingHorizontal: 32,
    // paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 8,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 16,
    marginTop: 8
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 10
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 16,
    borderRadius: 20,
    top: -70
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
    marginTop: -56
  },
  inputDateTimePicker: {
    width: '80%',
    height: 60,
    lineHeight: 60,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.shape,
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 16,
    paddingHorizontal: 16,
    marginVertical: 16
  }
});