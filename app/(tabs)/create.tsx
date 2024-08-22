import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { icons } from '@/constants'
import { Colors } from '@/constants/Colors'
import { useGlobalContext } from '@/context/GlobalProvider'
import { CreateVideo } from '@/lib/appwrite'
import { Translations, VideoFormType } from '@/types'
import { ResizeMode, Video } from 'expo-av'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import tw from 'twrnc'


const Create = () => {

  const [uploading, setUploading] = useState<boolean>(false)

  const { user, text } : { user : any, text : Translations} = useGlobalContext()

  const [form, setForm] = useState<VideoFormType>({
    title : '',
    video : null,
    thumbnail : null,
    prompt : '',
    userID : user?.$id
  })

  const openPicker = async (selectType : 'image' | 'video') => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({...form, thumbnail : result.assets[0]})
      }
      if (selectType === 'video') {
        setForm({...form, video : result.assets[0]})
      }
    }
  }

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert(text.Please_fill_in_all_the_fields)
    }

    setUploading(true)

    try {

      await CreateVideo(form)

      Alert.alert(text.Succes, text.Post_uploaded_successfully)
      router.push('/home')
      
    } catch (error) {
      console.log(error);
    }
    finally {
      setForm({
        title : '',
        video : null,
        thumbnail : null,
        prompt : '',
        userID : user?.$id
      })

      setUploading(false)
    }
  }
  
  return (
    <SafeAreaView style={[tw`h-full`, { backgroundColor : Colors.primary}]}>
      <ScrollView style={tw`px-4 my-10`}>
        <Text style={[tw`text-white text-2xl`, {fontFamily : Colors.fontFamily.psemibold[0]}]}>{text.Upload_Video}</Text>
        
        <FormField 
          title={text.Video_Title}
          value={form.title}
          placeholder={text.Give_Your_video_a_catch_title}
          handleChangeText={(e) => setForm({...form, title : e})}
          otherStyle='mt-10 text-sm'
        />
        <View style={tw`mt-7`}>
          <Text style={[tw`text-base text-gray-100`, { fontFamily : Colors.fontFamily.pmedium[0]}]}>{text.Upload_Video}</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video 
                source={{ uri : form.video.uri}}
                style={tw`w-full h-64 rounded-2xl`}
                // useNativeControls
                resizeMode={ResizeMode.COVER}
                // isLooping
              />) : (
              <View style={[tw`w-full h-40 px-4 rounded-2xl justify-center items-center`, { backgroundColor : Colors.black[100]}]}>
                <View style={tw`w-14 h-14 rounded-2xl border border-dashed border-orange-200 justify-center items-center`}>
                  <Image 
                    source={icons.upload}
                    resizeMode='contain'
                    style={tw`w-1/2 h-1/2`} 
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={tw`mt-7`}>
          <Text style={[tw`text-base text-gray-100`, { fontFamily : Colors.fontFamily.pmedium[0]}]}>{text.Thumbnail_Image}</Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image 
                source={{ uri : form.thumbnail.uri}}
                resizeMode='cover'
                style={tw`w-full h-64 rounded-2xl`}
              />
            ) : (
              <View style={[tw`w-full h-16 px-4 rounded-2xl justify-center items-center border-2 flex-row`, { backgroundColor : Colors.black[100]}]}>
                <Image 
                  source={icons.upload}
                  resizeMode='contain'
                  style={tw`w-5 h-5`} 
                />
                <Text style={[tw`text-sm text-gray-100`, { fontFamily : Colors.fontFamily.pmedium[0]}]}>{text.Choose_a_file}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField 
          title={text.AI_Prompt}
          value={form.prompt as string}
          placeholder={text.The_prompt_you_use_to_create_this_video}
          handleChangeText={(e) => setForm({...form, prompt : e})}
          otherStyle='mt-7'
        />

        <CustomButton 
          title={text.Submit_Publish}
          handlePress={submit}
          containerStyle='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create