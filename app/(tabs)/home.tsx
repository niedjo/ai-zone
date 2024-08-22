import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import VideoCard from '@/components/VideoCard'
import { images } from '@/constants'
import { Colors } from '@/constants/Colors'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getAllPost, getLatestPost } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwreite'
import { Translations } from '@/types'
import { useState } from 'react'
import { View, Text, SafeAreaView, FlatList, Image, RefreshControl, Alert } from 'react-native'
import tw from 'twrnc'


const Home = () => {

  const { user, setUser, setIsLoggedIn, text } : { user : any, setUser : any, setIsLoggedIn : any, text : Translations } = useGlobalContext()
  const {data : posts, isLoading, refetch} = useAppwrite(getAllPost)
  const {data : latestPost} = useAppwrite(getLatestPost)

  const [refreshing, setRefreshing] = useState<boolean>(false)

  const onrefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }


  return (
    <SafeAreaView style={[{backgroundColor : Colors.primary}, tw`h-full`]}>
      <FlatList 
        // data={[]}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          // <Text>hi</Text>
          <VideoCard videos = {item}/>
        )}

        ListHeaderComponent={() => (
          <View style={tw`my-6 px-4`}>
            <View style={tw`flex flex-row mt-6 justify-between items-center`}>
              <View>
                <Text style={[tw`text-sm text-gray-100`, { fontFamily : Colors.fontFamily.pmedium[0]}]}>{text.Welcome_Back}</Text>
                <Text style={[tw`text-2xl text-white`, { fontFamily : Colors.fontFamily.psemibold[0]}]}>{user?.username}</Text>
              </View>
              <View style={tw`mt-1.5`}>
                <Image 
                  source={images.logoSmall}
                  style={tw`w-9 h-10`}
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput 
              placeholder={text.Search_for_a_video_topic}
            />

            <View style={tw`w-full flex-1 pt-5 pb-8`}>
              <Text style={[tw`text-gray-100 text-lg mb-3`, {fontFamily : Colors.fontFamily.pregular[0]}]}>{text.Latest_videos}</Text>
              <Trending 
                post={latestPost}
              />
            </View>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
            title={text.No_Videos_Found}
            subtitle={text.Be_the_first_one_to_upload_a_video}
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onrefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home