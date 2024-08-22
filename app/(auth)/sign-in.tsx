import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { Colors } from '../../constants/Colors';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import { fieldType, Translations } from '@/types';


const SignIn = () => {

  const { setUser , setIsLoggedIn, text } : { setUser : any, setIsLoggedIn : any, text : Translations} = useGlobalContext()

  const [form, setForm] = useState<fieldType>({
    email : "",
    password : ""
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert(text.Error, text.Please_fill_in_all_the_fields)
    }
    setIsSubmitting(true)

    try {
      await signIn(form.email, form.password)

      // set it to global state using context...

      const result = await getCurrentUser();
      setUser(result)
      setIsLoggedIn(true)

      router.replace("/home")
    } catch (error) {
      Alert.alert('Error', error.message)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={[tw`h-full` ,{backgroundColor : Colors.primary}]}>
      <ScrollView>
        <View style={tw`w-full justify-center h-full px-4 my-6`}>
          <Image 
            source={images.logo}
            resizeMode='contain'
            style={tw`w-[115px] h-[35px]`}
          />
          <Text style={[tw`text-2xl text-white mt-10`, {fontFamily : Colors.fontFamily.psemibold[0]}]}>{text.Log_in_to_Aora}</Text>
          
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e : any) => setForm({...form, email : e})}
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title={text.Password}
            value={form.password}
            handleChangeText={(e : any) => setForm({...form, password : e})}
            otherStyle="mt-7"
          />

          <CustomButton 
            title={text.Sign_in} 
            handlePress={submit} 
            containerStyle={'mt-7'} 
            isLoading={isSubmitting}           
          />

          <View style={tw`justify-center flex-row gap-2 pt-5`}>
            <Text style={[tw`text-lg text-gray-100`, {fontFamily : Colors.fontFamily.pregular[0]}]}>{text.Don_t_have_an_account}</Text>
            <Link href={'/sign-up'} style={[tw`text-lg`, {color : Colors.secondary.DEFAULT, fontFamily : Colors.fontFamily.psemibold[0]}]}>{text.Sign_up}</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn