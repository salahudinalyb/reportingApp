import React, { Component } from 'react'
import { Alert, ScrollView, SafeAreaView, StyleSheet,AsyncStorage, TouchableOpacity, Text, TextInput,
KeyboardAvoidingView, ImageBackground, Dimensions, Image, View } from 'react-native'
import { allLogo } from '@Assets'
import Loader from '@Loader'
import { toDp } from '@percentageToDP'
const { width, height } = Dimensions.get('window')
import { postRegister } from '@Apis'

type Props = {}
class Register extends Component {
constructor(props) {
super(props);
this.state = {
fullname: '',
email: '',
password: '',
loading : false
};
}
back = () => {
this.props.navigation.goBack()
}

register = () => {
    if(this.state.fullname === '') {
        alert('Fullname tidak boleh kosong')
    } else if(this.state.email === '') {
        alert('Email tidak boleh kosong')
    } else if(this.state.password === '') {
        alert('Password tidak boleh kosong')
    } else {
        

    this.setState({loading: true})

    var formData = new FormData()
    formData.append('fullname', this.state.fullname)
    formData.append('email',this.state.email)
    formData.append('password', this.state.password)

    postRegister(formData).then(respon => {
        console.log(respon)
        Alert.alert(
            'Informasi',
            'Register Success',
            [
              {text: 'OK', onPress: () => this.back()},
            ],
            {cancelable: false},
          );      
    }).catch(error => {
        console.log(error)
        this.setState({
            loading: false
        })
    })
}
}

render() {
return (
<View style={styles.container}>
<Loader loading={this.state.loading} />
    <View style={styles.header}>
    <View style={styles.viewTitle}>
    <Text allowFontScaling={false} style={styles.textTitle}>Register</Text>
</View>

    <TouchableOpacity style={styles.touchHeader} onPress={() =>             this.props.navigation.goBack()}>
        <Image source={allLogo.iconBack} style={styles.iconBack} />
        </TouchableOpacity>
        </View>
    <ScrollView>

<View style={styles.content}>
    <Text allowFontScaling={false} style={styles.textTitleContent}>Silahkan Register</Text>

        <View style={styles.box}>
            <TextInput
            allowFontScaling={false}
            underlineColorAndroid={'transparent'}
            style={styles.textInput}
            placeholder={'Fullname'}
            value={this.state.fullname}
            autoCapitalize={'none'}
            onChangeText={ (fullname) => this.setState({ fullname }) }
            />

        </View>

        <View style={styles.box}>
            <TextInput
            allowFontScaling={false}
            underlineColorAndroid={'transparent'}
            style={styles.textInput}
            placeholder={'Email'}
            value={this.state.email}
            autoCapitalize={'none'}
            onChangeText={ (email) => this.setState({ email }) }
            />
        </View>

        <View style={styles.box}>
            <TextInput
            secureTextEntry={true}
            allowFontScaling={false}
            underlineColorAndroid={'transparent'}
            style={styles.textInput}
            placeholder={'Password'}
            value={this.state.password}
            autoCapitalize={'none'}
            onChangeText={ (password) => this.setState({ password }) }
            />
        </View>

        <TouchableOpacity
        onPress={() => this.register()}
        style={styles.btnDaftar}>
            <Text allowFontScaling={false} style={styles.text}>{'DAFTAR SEKARANG'}</Text>
        </TouchableOpacity>


        <View style={{height: 48}} /></View>
            </ScrollView>
        </View>
        )
    }
}

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
backgroundColor: '#F3F3F4'
},
header: {
width,
height: toDp(48),
justifyContent: 'center',
backgroundColor: '#FFFFFF',
shadowColor: '#000000',
shadowOffset: { width: 0, height : 2 },
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
fontSize: toDp(24),
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
flexDirection: 'row', },textInput: { width: '95%', height: 'auto', fontSize: toDp(12), },btnDaftar: { marginTop: toDp(24), borderRadius: 4, width: '90%', height: toDp(48), backgroundColor: '#2F5596', justifyContent: 'center', alignItems: 'center' },
text: 
{ color: '#FFFFFF', fontSize: toDp(14), fontWeight: '500', letterSpacing: 3 }, })


export default Register