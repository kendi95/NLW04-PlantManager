import React, { FC } from "react";
import { Text, View } from "react-native";
import Modal from 'react-native-modal';
import { RectButton } from 'react-native-gesture-handler';

import { styles } from "./styles";
import colors from "../../styles/colors";

interface AlertModal {
  headerTitle: string;
  contentText: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  onDismiss: () => void;
  isVisible: boolean;
}

export const AlertModal: FC<AlertModal> = ({ 
  headerTitle,
  contentText,
  okText,
  cancelText,
  onOk,
  onCancel,
  onDismiss,
  isVisible,
}) => {
  return (
    <Modal
      hideModalContentWhileAnimating
      useNativeDriverForBackdrop
      useNativeDriver
      hasBackdrop
      hardwareAccelerated
      animationIn="slideInDown"
      onBackdropPress={onDismiss}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      onDismiss={onDismiss}
      animationInTiming={500}
      animationOutTiming={500}
      isVisible={isVisible}
    >
      <View style={styles.container}>
        <View style={styles.modalHeaderContainer}>
          <Text style={styles.modalHeaderTitle}>
            {headerTitle}
          </Text>
        </View>

        <View style={styles.modalContentContainer}>
          <Text style={styles.modalContentText}>
            {contentText}
          </Text>
        </View>

        <View style={styles.modalFooterContainer}>
          {okText && (
            <RectButton 
              activeOpacity={0.8}
              style={[
                styles.modalFooterButton,
                {
                  backgroundColor: colors.green,
                }
              ]}
            >
              <Text 
                onPress={onOk}
                style={[
                  styles.modalFooterOkButton,
                  {
                    color: colors.white
                  }
                ]}
              >
                {okText}
              </Text>
            </RectButton>
          )}

          {cancelText && (
            <RectButton 
              activeOpacity={0.8}
              style={[
                styles.modalFooterButton,
                {
                  backgroundColor: colors.gray
                }
              ]}
            >
              <Text 
                onPress={onCancel}
                style={[
                  styles.modalFooterCancelButton,
                  {
                    color: colors.heading
                  }
                ]}
              >
                {cancelText}
              </Text>
            </RectButton>
          )}
        </View>
      </View>
    </Modal>
  );
}