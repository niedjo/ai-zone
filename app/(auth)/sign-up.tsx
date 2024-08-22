import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { Colors } from '../../constants/Colors';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { CreatUser } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import { fieldType, Translations } from '@/types';
import { Picker } from '@react-native-picker/picker';
import { en, fr } from '@/constants/lang';


const SignUp = () => {

  const { setUser , setIsLoggedIn, text, setText } : { setUser : any, setIsLoggedIn : any, text : Translations, setText : any} = useGlobalContext()

  const [form, setForm] = useState<fieldType>({
    username : "",
    email : "",
    password : ""
  })

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<"fr" | "en">("fr");

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert(text.Error, text.Please_fill_in_all_the_fields)
    }
    setIsSubmitting(true)

    try {
      const result = await CreatUser(form.email, form.password, form.username as string)
      
      // set it to global state using context...

      setUser(result)
      setIsLoggedIn(true)

      router.replace("/home")
    } catch (error) {
      Alert.alert(text.Error, error.message)
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
          <Text style={[tw`text-2xl text-white mt-10`, {fontFamily : Colors.fontFamily.psemibold[0]}]}>{text.Sign_up_to_Aora}</Text>
          
          <FormField 
            title={text.Username}
            value={form.username as string}
            handleChangeText={(e : any) => setForm({...form, username : e})}
            otherStyle="mt-10"
          />
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

          <View style={tw`flex flex-row justify-between items-center`}>
            <Text style={tw`text-white text-xl`}>{text.Language}</Text> 
            <Picker
              selectedValue={selectedValue}
              style={tw`border border-red-200 text-white text-3xl w-[150px]`}
              onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue); setText(itemValue === "en" ? en : fr)}}
            >
              <Picker.Item label={text.french} value="fr" />
              <Picker.Item label={text.english} value="en" />
            </Picker>
          </View>


          <CustomButton 
            title={text.Sign_up} 
            handlePress={submit} 
            containerStyle={'mt-7'} 
            isLoading={isSubmitting}           
          />

          <View style={tw`justify-center flex-row gap-2 pt-5 items-center`}>
            <Text style={[tw`text-lg text-gray-100`, {fontFamily : Colors.fontFamily.pregular[0]}]}>{text.Have_an_account_already}</Text>
            <Link href={'/sign-in'} style={[tw`text-sm`, {color : Colors.secondary.DEFAULT, fontFamily : Colors.fontFamily.psemibold[0]}]}>{text.Sign_in}</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp