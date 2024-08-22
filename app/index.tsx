import CustomButton from '@/components/CustomButton'
import { images } from '@/constants'
import { Colors } from '@/constants/Colors'
import { Redirect, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from "twrnc"
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '@/context/GlobalProvider'
import { Translations } from '../types/index';

const App = () => {

  const {isLoading, isLoggedIn, text } : {isLoading : boolean, isLoggedIn : boolean, text : Translations } = useGlobalContext()

  if (!isLoading && isLoggedIn) return <Redirect href={"/home"}/>

  return (
    <SafeAreaView style={[tw`h-full`,{backgroundColor : Colors.primary}]}>
      <ScrollView contentContainerStyle={{height : '100%'}}>
        <View style={tw`w-full justify-center items-center h-full px-4`}>
          <Image 
            source={images.logo}
            style={tw`w-[170px] h-[104px] -mt-5`}
            resizeMode='contain'
          />

          <Image 
            source={images.cards}
            style={tw`max-w-[380px] w-full h-[300px]`}
            resizeMode='contain'
          />

          <View style={tw`relative mt-5 text-black`}>
            <Text style={[tw`text-3xl text-white text-center`, {fontFamily : Colors.fontFamily.pbold[0]}]}>
              {text.presentation}{'    '}
              <Text style={{color : Colors.secondary[200]}}>AI Zone</Text>
            </Text>
            {/* <Image 
              source={images.path}
              style={tw`w-[196px] h-[15px] -right-16 bottom-2`}
              resizeMode='contain'
            /> */}
          </View>

          <Text style={tw`text-sm text-gray-100 mt-7 text-center`}>{text.fullPresentation}</Text>
          <CustomButton 
            title = {text.Continue_with_Email}
            handlePress = {() => router.push('/sign-in')}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default App
