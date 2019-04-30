import React, { Component } from 'react'
import { StatusBar, ActivityIndicator, FlatList, ScrollView, Platform, Alert, SafeAreaView, StyleSheet, AsyncStorage,
Keyboard, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ImageBackground, Dimensions, Image, View } from
'react-native'
import { allLogo } from '@Assets'
import { getPosting } from '@Apis'
const { width, height } = Dimensions.get('window')
import { toDp } from '@percentageToDP'
import MapView, { Marker, Callout } from 'react-native-maps'
type Props = {}
export default class Maps extends Component<Props> {
constructor(props) {
super(props);
this.state = {
data: []
}
}
componentWillMount() {
getPosting().then(respon => {
console.log(respon)
this.setState({data: respon.data})
}).catch(e => {
console.log(e)
})
}
render() {
if(this.state.data.length === 0) {
return (
<View style={styles.container}>
<ActivityIndicator size="large" color="#0000ff" />
</View>
)
}
return (
<View style={styles.container}>
<MapView
ref={ref => { this.map = ref; }}
style={styles.mapView}
initialRegion={{
latitude: -2.9709095,
longitude: 104.715411,
latitudeDelta: 0.0922,
longitudeDelta: 0.0421,
}}
>
{
this.state.data.map((item, index) => {
return (
    <Marker
    key={index}
    identifier={`id${index}`}
    coordinate={{
    latitude: parseFloat(item.latitude),
    longitude: parseFloat(item.longitude)
    }}
    title={item.fullname}
    deskripsi={item.deskripsi}  
    >
    <Callout tooltip={true} style={styles.calloutContainer}>
                <View style={styles.calloutContent}>
                  <Image source={{uri: item.url_image}} style={styles.photo} />
                  <View style={styles.viewTitleDesc}>
                    <Text allowFontScaling={false} style={styles.textTitle}>{item.fullname}</Text>
                    <Text allowFontScaling={false} style={styles.textDesc}>{item.title}</Text>
                  </View>
                </View>
                <View style={styles.calloutArrow} />
                <View style={styles.calloutArrowInside} />
              </Callout>
    </Marker>
)
})
}
</MapView>
</View>
)
}
}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
alignItems: 'center'
},
mapView: {
width,
height: '100%'
},
calloutContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  calloutContent: {
    paddingVertical: toDp(8),
    paddingHorizontal: toDp(8),
    justifyContent: 'center',
    borderRadius: toDp(4),
    borderWidth: toDp(1),
    borderColor: '#2F5596',
    backgroundColor: '#ffffff',
  },
  calloutArrow: {
    width: toDp(20),
    borderTopWidth: toDp(10),
    borderLeftWidth: toDp(9),
    borderRightWidth: toDp(9),
    borderBottomWidth: 0,
    borderTopColor: '#2F5596',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    marginBottom: toDp(5),
  },
  calloutArrowInside: {
    width: toDp(16),
    position: 'absolute',
    bottom: toDp(6),
    borderTopWidth: toDp(10),
    borderLeftWidth: toDp(9),
    borderRightWidth: toDp(9),
    borderBottomWidth: 0,
    borderTopColor: '#ffffff',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  calloutText: {
    fontSize: toDp(12),
    color: '#504a4a',
  },
  photo: {
    width: toDp(150),
    height: toDp(70),
  },
  viewTitleDesc: {
    padding: toDp(4),
    marginTop: toDp(4),
  },
  textTitle: {
    fontFamily: 'HelveticaNeue-Medium',
    color: '#000000',
    fontSize: toDp(12),
    fontWeight: 'bold'
  },
  textDesc: {
    fontFamily: 'HelveticaNeue-Medium',
    color: '#1C2029',
    fontSize: toDp(10),
  },
})
