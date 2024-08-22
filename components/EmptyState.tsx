import { images } from '@/constants';
import { Image, Text, View } from 'react-native';
import tw from 'twrnc'
import CustomButton from './CustomButton';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { EmptyStateProps, Translations } from '@/types';
import { useGlobalContext } from '@/context/GlobalProvider';


const EmptyState = ({ title, subtitle } : EmptyStateProps) => {

  const { text } : { text : Translations} = useGlobalContext()

  return (
    <View style={tw`justify-center items-center px-4`}>
      <Image 
        source={images.empty}
        style={tw`w-[270px] h-[215px]`}
        resizeMode='contain'
      />
      <Text style={[tw`text-xl text-white text-center mt-2`, { fontFamily : Colors.fontFamily.psemibold[0]}]}>{title}</Text>
      <Text style={[tw`text-sm text-gray-100`, { fontFamily : Colors.fontFamily.pmedium[0]}]}>{subtitle}</Text>
      <CustomButton 
        title={text.Create_Videos}
        handlePress={() => router.push('/create')}
        containerStyle='w-full my-5'
      />
    </View>
  )
}

export default EmptyState