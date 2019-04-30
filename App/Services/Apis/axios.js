import axios from 'axios'
import { Platform, AsyncStorage } from 'react-native'

const xhr = async (url, method, data, headers) => {
  const token = await AsyncStorage.getItem('token')

  let defaultHeader = {
    'Content-Type': 'application/json',
    'Authorization': token !== null ? token : '',
    'Accept': 'application/json',
  }

  config = {
    method,
    url,
    headers: defaultHeader,
    data,
  }
  // LOG ALL DATA
  console.log(config)
  try {
    const res = await axios(config)
    return res
  }
  catch ({response}) {
    throw response
  }
}

export default xhr
