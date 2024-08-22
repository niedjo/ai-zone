import { Colors } from '@/constants/Colors'
import { InfoBoxTypes } from '@/types'
import { View, Text } from 'react-native'
import tw from 'twrnc'

const InfoBox = ({ title, subtitle, containerStyles, titleStyles} : InfoBoxTypes) => {
  return (
    <View style={tw`${containerStyles}`}>
        <Text style={[tw`w-full text-white text-center ${titleStyles}`, { fontFamily : Colors.fontFamily.psemibold[0]}]}>{title}</Text>
        <Text style={[tw`text-sm text-gray-100 text-center`, { fontFamily : Colors.fontFamily.pregular[0]}]}>{subtitle}</Text>
    </View>
  )
}

export default InfoBox