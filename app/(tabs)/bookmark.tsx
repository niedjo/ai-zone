import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'
import { Colors } from '@/constants/Colors'
import { useGlobalContext } from '@/context/GlobalProvider'
import { getAllBookmarkedPost } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwreite'
import { Translations } from '@/types'
import { useState } from 'react'
import { View, Text, SafeAreaView, FlatList, RefreshControl } from 'react-native'
import tw from 'twrnc'


const Search = () => {

  const { user, text } : { user : any, text : Translations} = useGlobalContext()

  const {data : posts, isLoading, refetch} = useAppwrite(() => getAllBookmarkedPost(user.$id))
  const [refreshing, setRefreshing] = useState(false)

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
            <Text style={[tw`text-3xl text-gray-100 mt-10`, { fontFamily : Colors.fontFamily.pmedium[0]}]}>{text.Saved_Videos}</Text>
          </View>
        )}

        ListEmptyComponent={() => (
          <EmptyState 
            title={text.No_Videos_Found}
            subtitle={text.No_videos_found_for_this_search}
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onrefresh} />}
      />
    </SafeAreaView>
  )
}

export default Search