import React, { Component } from 'react'
import { Alert, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity, Text, TextInput, KeyboardAvoidingView,
ImageBackground, Dimensions, Image, View } from 'react-native'
import Loader from '@Loader'
import { allLogo } from '@Assets'
import { toDp } from '@percentageToDP'
import { postLogin} from '@Apis'
import md5 from '../../Helper/md5'
const { width, height } = Dimensions.get('window')

export default class Login extends Component {
constructor(props) {
super(props);
this.state = {
email: '',
password: '',
loading: false,
}
}

actionLogin = (email, password) => {
// coding...


this.setState({loading: true})

var formData = new FormData()
formData.append('email',this.state.email)
formData.append('password', md5.hex_md5(password))


    postLogin(formData).then(respon => {
        console.log(respon)
        this.setState({loading:false})
        if(respon.data.length === 0) {
            Alert.alert(
                'Gagal Masuk',
                'Email atau Password Salah',
                [
                  {text: 'OK', onPress: () => this.setState({loading: false})},
                ]
              );
            } else {
                AsyncStorage.setItem('dataUser', JSON.stringify(respon.data))
                this.props.navigation.replace('Homepage')
            }

    }).catch(error => {
        console.log(error)
        this.setState({loading:false})
    })



}


render() {
return (
<View style={styles.container}>
<Loader loading={this.state.loading} />
<ScrollView>
<View style={styles.viewTitle}>
<Text allowFontScaling={false} style={styles.textTitle}>Silahkan Login</Text>
</View>
<View style={styles.viewContent}>
<View style={styles.box}>
<TextInput

allowFontScaling={false}
onSubmitEditing={() => this.password.focus() }
underlineColorAndroid={'transparent'}
style={styles.textInput}
placeholder={'Email'}
value={this.state.email}
maxLength={50}
keyboardType='email-address'
autoCapitalize={'none'}
onChangeText={ (email) => this.setState({ email }) }
/>
</View>
<View style={[styles.box, {marginTop: toDp(8)}]}>
<TextInput
secureTextEntry={true}
allowFontScaling={false}
ref={(input) => this.password = input }
underlineColorAndroid={'transparent'}
style={styles.textInput}
placeholder={'Password'}
value={this.state.password}
maxLength={50}
autoCapitalize={'none'}
onChangeText={ (password) => this.setState({ password }) }
/>
</View>
<TouchableOpacity
onPress={() => this.actionLogin(this.state.email, this.state.password)}
style={styles.btnLogin}>
<Text allowFontScaling={false} style={styles.textLogin}>LOGIN</Text>
</TouchableOpacity>
<View style={styles.viewRowRight}>
<Text allowFontScaling={false} style={styles.textShow}>{'Belum punya account ?'}</Text>
<TouchableOpacity
onPress={() => this.props.navigation.navigate('Register')}
style={styles.btnRegister}>
<Text allowFontScaling={false} style={styles.textRegister}>{'REGISTER'}</Text>
</TouchableOpacity>
</View>
</View>
</ScrollView>
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
viewTitle: {
paddingTop: toDp(48),
width,
alignItems: 'center'
},
textTitle: {
color: '#212121',
fontSize: toDp(24),
fontWeight: '400',
marginBottom: toDp(16)
},
viewContent: {
width,
alignItems: 'center'
},
box: {
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
width: '90%',
height: 'auto',
fontSize: toDp(12),
},
btnLogin: {
marginTop: toDp(24),
borderRadius: 4,
width: '90%',
height: toDp(48),
backgroundColor: '#2F5596',
justifyContent: 'center',
alignItems: 'center'
},
textLogin: {
color: '#FFFFFF',
fontSize: toDp(16),
fontWeight: 'bold',
letterSpacing: 3
},
viewRowRight: {
marginTop: toDp(8),
width: width * 0.9,
height: toDp(36),
alignItems: 'center',
flexDirection: 'row',
justifyContent: 'flex-end'
},
textShow: {
color: '#212121',
fontSize: toDp(12),
fontWeight: '300',
marginLeft: toDp(8)
},
btnRegister: {
marginLeft: toDp(8),
borderRadius: 4,
height: toDp(32),
paddingHorizontal: toDp(16),
borderWidth: 1,
borderColor: '#2F5596',
justifyContent: 'center',
alignItems: 'center'
},
textRegister: {
color: '#2F5596',
fontSize: toDp(14),
fontWeight: '400',
letterSpacing: 2
},
})