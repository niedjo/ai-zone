import EmptyState from '@/components/EmptyState'
import InfoBox from '@/components/InfoBox'
import VideoCard from '@/components/VideoCard'
import { icons } from '@/constants'
import { Colors } from '@/constants/Colors'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getUserPosts, signOut } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwreite'
import { Translations } from '@/types'
import { router } from 'expo-router'
import { View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import tw from 'twrnc'


const Profile = () => {

  const { user, setUser, setIsLoggedIn, text } : { user : any, setUser : any, setIsLoggedIn : any, text : Translations } = useGlobalContext()

  const {data : posts, isLoading, refetch} = useAppwrite(() => getUserPosts(user?.$id as string)) 

  const logOut = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace('/sign-in')
  }

  return (
    <SafeAreaView style={[{backgroundColor : Colors.primary}, tw`h-full`]}>
      <FlatList 
        // data={[]}
        data={posts}
        keyExtractor={(item) => item?.$id}
        renderItem={({item}) => (
          // <Text>hi</Text>
          <VideoCard videos = {item}/>
        )}

        ListHeaderComponent={() => (
          <View style={tw`w-full justify-center items-center mt-6 mb-12 px-4`}>
            <TouchableOpacity
              style={tw`w-full items-end mb-10`}
              onPress={logOut}
            >
              <Image 
                source={icons.logout}
                resizeMode='contain'
                style={tw`w-6 h-6`}
              />
            </TouchableOpacity>
            <View style={tw`w-16 h-16 mt-10 rounded-lg justify-center items-center`}>
              <Image 
                source={{ uri : user?.avatar}}
                style={tw`w-[90%] h-[90%] rounded-lg  border border-orange-300`}
                resizeMode='contain'
              />

              <InfoBox 
                title = {user?.username}
                containerStyles = "mt-5"
                titleStyles = "text-lg"
              />

              <View style={tw`mt-1 flex-row`}>
                <InfoBox 
                  title = {(posts.length).toString() || "0"}
                  subtitle = {text.Post}
                  containerStyles = "mr-8 mb-10"
                  titleStyles = "text-xl"
                />
                <InfoBox 
                  title = {"1.2k"}
                  subtitle = {text.Followes}
                  titleStyles = "text-xl"
                />
              </View>
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
            title={text.No_Videos_Found}
            subtitle={text.No_videos_found_for_this_search}
          />
        )}

        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onrefresh} />}
      />
    </SafeAreaView>
  )
}

export default Profile