import React, { Component } from 'react'
import {StyleSheet, Image, Dimensions, AsyncStorage } from 'react-native'
import { allLogo } from '@Assets'
const { width, height } = Dimensions.get('window')

type Props = {}
export default class SplashScreen extends Component<Props> {

  componentWillMount() {
    setTimeout(() => {
      AsyncStorage.getItem('dataUser', (err, result) => {
        if(result === null) {
          this.props.navigation.replace('Login')
        } else {
          this.props.navigation.replace('Homepage')
        }
      })
    }, 2000)
  }

  render() {
    return (
      <Image source={allLogo.splashscreen} style={styles.splashscreen} />
    )
  }
}

const styles = StyleSheet.create({
  splashscreen: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center'
  },
})