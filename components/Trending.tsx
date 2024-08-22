import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import tw from 'twrnc'
import * as Animatable from 'react-native-animatable'
import { useState } from 'react'
import { icons } from '@/constants'
import { Video, ResizeMode } from 'expo-av'


const zoomIn = {
  0 : {
    scale : 0.9
  },
  1 : {
    scale : 1.1
  }
}

const zoomOut = {
  0 : {
    scale : 1.1
  },
  1 : {
    scale : 0.9
  }
}

const TrendingItem = ({ activeItem, item}) => {

  const [play, setPlay] = useState<boolean>(false);

  // console.log(item.video);
  return (
    <Animatable.View
      style={tw`mr-5`}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {
        play ? 
        (<Video 
            source={{ uri : item.video}} 
            style={tw`w-52 h-72 rounded-[35px] bg-white/10`} 
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false)
              }
            }}
          />) :  
        (<TouchableOpacity style={tw`relative justify-center items-center`} activeOpacity={0.7} onPress={() => setPlay(true)}>
          <ImageBackground 
            source={{ uri : item.thumbnail }}
            style={tw`w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40`}
            resizeMode='cover'
          />
          <Image source={icons.play} style={tw`w-12 h-12 absolute`}/>
        </TouchableOpacity>)

      }
    </Animatable.View>
  )
}

const Trending = ({ post } : {post : object[]}) => {
  
  const [activeItem, setActiveItem] = useState(post[1]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }
  
  return (
    <FlatList 
        data={post}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <TrendingItem activeItem={activeItem} item={item}/>
        )} 
        horizontal 
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold : 70
        }}
        contentOffset={{
          x : 170
        }}
    />
  )
}

export default Trending