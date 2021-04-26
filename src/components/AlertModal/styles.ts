import { StyleSheet, Dimensions } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  modalContainer: {
    // padding: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: colors.white,
    // width: "80%",
    // height: 150
  },
  container: {
    backgroundColor: colors.white,
    // height: (Dimensions.get('screen').width * 2) / 4,
    borderRadius: 20
  },
  modalHeaderContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.body_light,
  },
  modalHeaderTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    paddingLeft: 32,
  },
  modalContentContainer: {
    paddingVertical: 24,
    paddingHorizontal: 32
  },
  modalContentText: {
    fontFamily: fonts.text,
    fontSize: 18,
    lineHeight: 24,
  },
  modalFooterContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.body_light
  },
  modalFooterButton: {
    width: '25%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
    marginRight: 8,
    borderRadius: 12
  },
  modalFooterOkButton: {
    fontFamily: fonts.complement,
    fontSize: 14
  },
  modalFooterCancelButton: {
    fontFamily: fonts.complement,
    fontSize: 14
  }
});