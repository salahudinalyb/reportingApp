import React, { Component } from 'react'
import { Platform, Alert, ScrollView, SafeAreaView, StyleSheet,AsyncStorage, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ImageBackground, Dimensions, Image, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import GetLocation from 'react-native-get-location'

import { allLogo } from '@Assets'
import Loader from '@Loader'
import { toDp } from '@percentageToDP'

import { postUpload, postPosting } from '@Apis'

const { width, height } = Dimensions.get('window')
class AddReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idUser: '',
      title: '',
      description: '',
      photo: '',
      url_image: '',
      latitude: '',
      longitude: ''
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('dataUser', (err, result) => {
      console.log(result)
      let data = JSON.parse(result)
      this.setState({idUser: data.id_users})
    })

    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(location => {
        console.log(location);
        this.setState({
          latitude: location.latitude,
          longitude: location.longitude
        })
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })

  }

  back = () => {
    this.props.navigation.goBack()
  }

  addPhoto = () => {
    Alert.alert(
      'Add Photo',
      'Silahkan pilih sumber photo',
      [
        {text: 'Camera', onPress: () => {
          ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
            this.setState({photo: Platform.OS === 'ios' ? image.sourceURL : image.path})
            this.upload(image)
          })
        }},
        {text: 'Gallery',onPress: () => {
          ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
            this.setState({photo: Platform.OS === 'ios' ? image.sourceURL : image.path})
            this.upload(image)
          })
        }},
      ],
      {cancelable: false},
    )
  }

  upload = (image) => {
    var formData = new FormData()
    formData.append('image', {
      uri: Platform.OS === 'ios' ? image.sourceURL : image.path,
      type: 'image/jpg',
      name: ''+Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '.jpg'
    })

    postUpload(formData).then(respon => {
      console.log(respon)
      this.setState({url_image: respon.data.url_image})
    }).catch(e => {
      console.log(e)
    })
  }

  submit = () => {
    //validasi ...

    var formData = new FormData()
    formData.append('id_users', this.state.idUser)
    formData.append('title', this.state.title)
    formData.append('description', this.state.description)
    formData.append('url_image', this.state.url_image)
    formData.append('latitude', this.state.latitude)
    formData.append('longitude', this.state.longitude)

    postPosting(formData).then(respon => {
      console.log(respon)

      Alert.alert(
        'Informasi',
        respon.data.message,
        [
          {text: 'OK', onPress: () => respon.data.message === "Posting Success" ? this.back() : console.log('')},
        ]
      );

    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.viewTitle}>
            <Text allowFontScaling={false} style={styles.textTitle}>Add Report</Text>
          </View>
          <TouchableOpacity style={styles.touchHeader} onPress={() => this.props.navigation.goBack()}>
            <Image source={allLogo.iconBack} style={styles.iconBack} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.content}>
            <Text allowFontScaling={false} style={styles.textTitleContent}>Silahkan Posting Laporan Anda</Text>
            <View style={styles.viewRootPhoto}>
              {
                this.state.photo === '' ?
                <TouchableOpacity style={styles.viewAddPhoto} onPress={() => this.addPhoto()}>
                  <View style={styles.touchPlus}>
                    <Text allowFontScaling={false} style={styles.textPlus}>+</Text>
                  </View>
                  <Text allowFontScaling={false} style={styles.textAddPhoto}>Add Photo</Text>
                </TouchableOpacity>
                :
                <View style={styles.viewPhoto}>
                  <Image source={{uri: this.state.photo}} style={styles.photo} />
                  <View style={styles.viewSilang}>
                  <TouchableOpacity style={styles.circle} onPress={() => this.setState({photo: ''})}>
                    <Text allowFontScaling={false} style={styles.icSilang}>x</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              }
            </View>
            <View style={styles.box}>
              <TextInput
                allowFontScaling={false}
                underlineColorAndroid={'transparent'}
                style={styles.textInput}
                placeholder={'Title'}
                value={this.state.title}
                autoCapitalize={'none'}
                onChangeText={ (title) => this.setState({ title }) }
              />
            </View>
            <View style={styles.viewTextInput}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                allowFontScaling={false}
                underlineColorAndroid={'transparent'}
                style={styles.textInput}
                placeholder={'Description'}
                value={this.state.description}
                autoCapitalize={'none'}
                onChangeText={ (description) => this.setState({ description }) }
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.submit()}
          style={styles.btnSubmit}>
          <Text allowFontScaling={false} style={styles.text}>{'SUBMIT'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: '#F3F3F4'
  },
  header: {
    width,
    height: toDp(48),
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height  : 2 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2,
  },
  viewTitle: {
    width: '100%',
    height: toDp(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    color: '#2F5596',
    fontSize: toDp(16),
    fontWeight: '400'
  },
  touchHeader: {
    width: toDp(48),
    height: toDp(48),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  iconBack: {
    width: toDp(32),
    height: toDp(32),
    tintColor: '#2F5596',
  },
  content: {
    width,
    alignItems: 'center',
    paddingTop: toDp(16),
  },
  textTitleContent: {
    color: '#212121',
    fontSize: toDp(16),
    fontWeight: '400',
    marginTop: toDp(16),
    marginBottom: toDp(8)
  },
  box: {
    marginTop: toDp(8),
    width: width * 0.9,
    height: toDp(48),
    borderWidth: 1,
    borderColor: '#D1D1D2',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textInput: {
    width: '95%',
    height: 'auto',
    fontSize: toDp(12),
  },
  btnSubmit: {
    width,
    height: toDp(56),
    backgroundColor: '#2F5596',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#FFFFFF',
    fontSize: toDp(14),
    fontWeight: '500',
    letterSpacing: 3
  },
  viewAddPhoto: {
    flexDirection: 'row',
    marginTop: toDp(8),
    alignItems: 'center'
  },
  touchPlus: {
    width: toDp(32),
    height: toDp(32),
    borderRadius: toDp(24),
    backgroundColor: '#2F5596',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: toDp(8)
  },
  textPlus: {
    fontFamily: 'HelveticaNeue-Light',
    color: '#FFFFFF',
    fontSize: toDp(24),
    fontWeight: '500',
    marginBottom: toDp(4)
  },
  viewRootPhoto: {
    width,
    height: 'auto',
    paddingLeft: toDp(16),
    marginBottom: toDp(16)
  },
  viewTextInput: {
    marginTop: toDp(16),
    paddingTop: toDp(8),
    paddingLeft: toDp(8),
    paddingRight: toDp(8),
    width: width * 0.9,
    height: toDp(120),
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height  : 2 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2,
    marginBottom: 4,
  },
  photo: {
    width: toDp(100),
    height: toDp(100),
    borderRadius: toDp(4)
  },
  viewSilang: {
    width: toDp(100),
    height: toDp(100),
    position: 'absolute',
  },
  circle: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: toDp(24),
    height: toDp(24),
    backgroundColor: 'white',
    borderRadius: toDp(12),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: '#000000',
    elevation: 2
  },
  icSilang: {
    fontFamily: 'HelveticaNeue-Bold',
    color: '#FF9999',
    fontSize: toDp(18),
    fontWeight: '800',
    marginBottom: toDp(4)
  },
})

export default AddReport