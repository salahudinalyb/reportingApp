import React, { Component } from 'react'
import {View, ActivityIndicator, TouchableOpacity,Image, FlatList, StyleSheet, Dimensions, Text} from 'react-native'
import { toDp } from '@percentageToDP'
import { getPosting } from '@Apis'
const { width, height } = Dimensions.get('window')
class Home extends Component {
constructor(props) {
super(props);
this.state = {
data: [getPosting().then(respon => {
  console.log(respon)
  this.setState({data: respon.data})
  }).catch(e => {
  console.log(e)
  })]
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
renderItem = (item) => {

  if(item.url_image !== '') {
    return (
      <View style={styles.content}>
      <View style={styles.itemHeader}>
      <Image source={{uri: item.url_image }} style={styles.image} />
      <View style={styles.viewNameEmail}>
      <Text allowFontScaling={false} style={styles.textName}>{item.fullname}</Text>
      <Text allowFontScaling={false} style={styles.textEmail}>{item.textEmail}</Text>
      </View>
      </View>
      <Image source={{
      uri: item.url_image
      }}
      style={styles.photo}
      />
      
      <View style={styles.viewTitleDesc}>
      <Text allowFontScaling={false} style={styles.textTitle}>{item.title}</Text>
      <Text allowFontScaling={false} style={styles.textDesc}>{item.description}</Text>
      </View>
      </View>
      )
      }
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
<FlatList
data={this.state.data}
renderItem={({item}) => this.renderItem(item)}
/>
<TouchableOpacity style={styles.touchPlus} onPress={() => this.props.navigation.navigate('AddReport')}>
<Text allowFontScaling={false} style={styles.textPlus}>+</Text>
</TouchableOpacity>
</View>
)
}
}
const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center'
},
touchPlus: {
width: toDp(48),
height: toDp(48),
borderRadius: toDp(24),
backgroundColor: '#2F5596',
alignItems: 'center',
justifyContent: 'center',
position: 'absolute',
right: toDp(16),
bottom: toDp(16)
},
textPlus: {
fontFamily: 'HelveticaNeue-Light',
color: '#FFFFFF',
fontSize: toDp(32),
fontWeight: '500',
marginBottom: toDp(4)
},
content: {
width,
height: 'auto',
borderWidth: 1,
borderColor: '#ECECED',
backgroundColor: '#FFFFFF',
},
itemHeader: {
width,
height: 'auto',
flexDirection: 'row',
padding: toDp(16),
},
image: {
width: toDp(48),
height: toDp(48),
borderRadius: toDp(24)
},
viewNameEmail: {
marginLeft: toDp(8)
},
textName: {
fontFamily: 'HelveticaNeue-Medium',
color: '#000000',
fontSize: toDp(16),
},
textEmail: {
fontFamily: 'HelveticaNeue-Light',
color: '#616770',
fontSize: toDp(12),
},
photo: {
marginLeft: -1,
width,
height: toDp(200),
},
viewTitleDesc: {
padding: toDp(16),
},
textTitle: {
fontFamily: 'HelveticaNeue-Medium',
color: '#000000',
fontSize: toDp(16),
},
textDesc: {
marginTop: toDp(4),
fontFamily: 'HelveticaNeue-Light',
color: '#1C2029',
fontSize: toDp(12),
},
})
export default Home