import { icons } from '@/constants'
import { Colors } from '@/constants/Colors'
import { useGlobalContext } from '@/context/GlobalProvider'
import { BookmarkePost } from '@/lib/appwrite'
import { ResizeMode, Video } from 'expo-av'
import { useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Pressable, Alert } from 'react-native'
import tw from 'twrnc'

const VideoCard = ({ videos : { $id, title, thumbnail, video, creator : { username, avatar }} }) => {
  
  const [play, setPlay] = useState<boolean>(false);
  const ref = useRef(null)

  const { user } = useGlobalContext()

  const likePost = async () => {

    try {
      await BookmarkePost(user.$id, $id)
  
    } catch (error) {
      throw new Error(error);
      
    }
     
  }

  return (
    <View style={tw`flex-col items-center px-4 mb-14`}>
        <View style={tw`flex-row gap-3 items-start`}>
            <View style={tw`justify-center items-center flex-row flex-1`}>
                <View style={tw`w-[46px] h-[46px] rounded-lg border border-orange-400 justify-center items-center p-0.5`}>
                    <Image source={{ uri : avatar }} style={tw`w-full h-full rounded-lg`} resizeMode='cover'/>
                </View>
                <View style={tw`justify-center flex-1 ml-3 gap-y-1`}>
                  <Text style={[tw`text-white text-sm`, {fontFamily : Colors.fontFamily.psemibold[0]}]} numberOfLines={1}>{title}</Text>
                  <Text style={[tw`text-xs text-gray-100`, {fontFamily : Colors.fontFamily.pregular[0]}]}>{username}</Text>
                </View>
            </View>
            <View style={tw`pt-2`}>
              <TouchableOpacity onPress={likePost}>
                <Image source={icons.bookmark} style={tw`w-5 h-5`} resizeMode='contain'/>
              </TouchableOpacity>
            </View>
        </View>
        
        { play ? 
          (<Video 
            // ref={ref}
            // 'https://www.w3schools.com/html/mov_bbb.mp4'
            source={{ uri : video}} 
            style={tw`w-full h-60 rounded-xl mt-3`} 
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay={play}
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false)
                // console.log(video);
              }
            }}
            
          />) 
          : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPlay(true)}
              style={tw`w-full h-60 rounded-xl mt-3 relative justify-center items-center`}
            >
              <Image source={{uri : thumbnail}} style={tw`w-full h-full rounded-xl mt-3`} resizeMode='cover'/>
              <Image source={icons.play} style={tw`w-12 h-12 absolute`}/>
            </TouchableOpacity>
          )
        }
    </View>
  )
}

export default VideoCard