import React, { Component } from 'react'
import { StyleSheet, View, Modal, ActivityIndicator, Text} from 'react-native'

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size='small'
            animating={loading}
            color={'#FFFFFF'}
           />
           <Text allowFontScaling={false} style={styles.text}>Loading</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'

  },
  activityIndicatorWrapper: {
    backgroundColor: '#333333E6',
    height: 105,
    width: 150,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: '#000000',

  },
  text: {
    color: '#FFFFFF',
    marginTop: 16
  }
});

export default Loader;
