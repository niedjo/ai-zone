import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import { Colors } from '@/constants/Colors'
import { useGlobalContext } from '@/context/GlobalProvider'
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwreite'
import { Translations } from '@/types'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, FlatList, RefreshControl } from 'react-native'
import tw from 'twrnc'


const Search = () => {

  const { text } : { text : Translations } = useGlobalContext()
  const { query } = useLocalSearchParams()

  const {data : posts, isLoading, refetch} = useAppwrite(() => searchPosts(query as string))
  const [refreshing, setRefreshing] = useState(false)

  const onrefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  console.log(query, posts);

  useEffect(() => {
    refetch()
  }, [query])

  // console.log(posts[0]);

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
            <Text style={[tw`text-sm text-gray-100`, { fontFamily : Colors.fontFamily.pmedium[0]}]}>{text.Search_Result}</Text>
            <Text style={[tw`text-2xl text-white`, { fontFamily : Colors.fontFamily.psemibold[0]}]}>{query}</Text>
            <View style={tw`mt-6 mb-8`}>
              <SearchInput initialQuery = {query as string} />
            </View>
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