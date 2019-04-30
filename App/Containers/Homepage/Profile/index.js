import React, { Component } from 'react'
import { StatusBar, FlatList, ScrollView, Platform, Alert, SafeAreaView, StyleSheet, AsyncStorage, Keyboard,
TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ImageBackground, Dimensions, Image, View } from
'react-native'
import { allLogo } from '@Assets'
const { width, height } = Dimensions.get('window')
import { toDp } from '@percentageToDP'
import ImagePicker from 'react-native-image-crop-picker'
import Loader from '@Loader'
import { postUpload, postUpdatePhoto } from '@Apis'

type Props = {}
export default class Profile extends Component<Props> {


    constructor(props) {
        super(props);
        this.state = { 
            data:{}
        }
      }
    
      componentWillMount() {
        AsyncStorage.getItem('dataUser', (err, result) => {
          let data = JSON.parse(result)
          this.setState({data})
        })
      }

back = () => {
this.props.navigation.goBack()
}
logout = () => {
// AsyncStorage.clear()
// this.props.navigation.replace('Login')
Alert.alert(
  'Konfirmasi',
  'Apakah anda akan log out',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {
      AsyncStorage.clear()
      this.props.navigation.replace('Login')
    }
      
    },
  ],
  {cancelable: false},
);


}


updatePhoto = () => {
    Alert.alert(
      'Update Photo',
      'Silahkan pilih sumber photo',
      [
        {text: 'Camera', onPress: () => {
          ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: true,
          }).then(image => {
            console.log(image);
            this.setState({photo: Platform.OS === 'ios' ? image.sourceURL : image.path})
            this.upload(image)
          })
        }},
        {text: 'Gallery',onPress: () => {
          ImagePicker.openPicker({
            width: 200,
            height: 200,
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

    this.setState({loading: true})

    postUpload(formData).then(respon => {
      console.log(respon)

      var formData = new FormData()
      formData.append('id_users', this.state.data.id_users)
      formData.append('url_photo', respon.data.url_image)

      postUpdatePhoto(formData).then(responUpdate => {
        console.log(responUpdate)

        AsyncStorage.setItem('dataUser', JSON.stringify( {...this.state.data, ...{url_photo: respon.data.url_image}} ))
        this.setState({loading: false, data: {...this.state.data, ...{url_photo: respon.data.url_image}}})

      }).catch(e => {
        console.log(e)
      })


    }).catch(e => {
      console.log(e)
    })
  }

render() {
return (
<View style={styles.container}>
<View style={styles.wrapper}>
<View style={styles.viewProfile}>

<TouchableOpacity onPress={() => this.updatePhoto()}>
    <Image source={{uri: this.state.data.url_photo}} style={styles.imgProfile} />
</TouchableOpacity>


<View style={styles.viewInfo}>
<Text style={styles.textName}>{this.state.data.fullname}</Text>
<Text style={styles.text}>{this.state.data.email}</Text>
</View>
</View>
<View style={styles.content}>
<View style={styles.root}>
  <TouchableOpacity style={styles.row} onPress={() => this.logout()}>
  <Text allowFontScaling={false} style={[styles.text, {color: '#FF0000'}]}>{'Log Out'}</Text>
  </TouchableOpacity>

</View>
</View>
</View>
</View>
)
}
}
const styles = StyleSheet.create({
container: {
flex: 1,
},
wrapper: {
flex: 1,
},
title: {
fontFamily: 'HelveticaNeue-Medium',
fontSize: toDp(16),
marginLeft: toDp(24),
marginBottom: toDp(16),
fontWeight: '500',
color: '#FFFFFF',
},
content: {
flex: 1,
alignItems: 'center'
},
root: {
width,
height: 'auto',
backgroundColor: '#FFFFFF',
},
row: {
height: toDp(66),
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
borderBottomColor: '#ECECED',
borderBottomWidth: 1,
paddingLeft: toDp(16),
paddingRight: toDp(16)
},
text: {
fontSize: toDp(14),
fontFamily: 'HelveticaNeue-Light',
fontWeight: '300',
color: '#212121',
},
icCircle: {
width: toDp(28),
height: toDp(28)
},
icChevronRight: {
width: toDp(28),
height: toDp(28),
tintColor: '#189E84'
},
viewProfile: {
width,
height: toDp(100),
borderBottomWidth: 1,
borderBottomColor: '#ECECED',
flexDirection: 'row',
alignItems: 'center'
},
imgProfile: {
width: toDp(70),
height: toDp(70),
borderRadius: toDp(35),
marginHorizontal: toDp(16)
},
textName: {
fontSize: toDp(16),
fontFamily: 'HelveticaNeue-Bold',
fontWeight: '500',
color: '#212121',
marginBottom: toDp(4)
}
})