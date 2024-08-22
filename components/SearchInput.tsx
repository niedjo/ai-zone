import { icons } from '@/constants';
import { Colors } from '@/constants/Colors'
import { router, usePathname } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import tw from 'twrnc'


const SearchInput = ({ initialQuery, placeholder } : { initialQuery? : string, placeholder?: string }) => {

    const pathName = usePathname()
    const [query, setQuery] = useState(initialQuery || '');

    return (
      <View style={[tw`border-2 w-full h-16 px-4 rounded-2xl items-center flex-row`, {backgroundColor : Colors.black[100]}]}>
        <TextInput 
            style={[tw`text-base mt-0.5 text-white flex-1`, { fontFamily : Colors.fontFamily.pregular[0]}]}
            value={query}
            onChangeText={(e) => setQuery(e)}
            placeholder={placeholder || "Search for a video topic"}
            placeholderTextColor={"#CDCDE0"}
        />

        <TouchableOpacity onPress={() => {
            if (!query) {
              return Alert.alert('Missing Query', "Please input something to search results across database")  
            }

            if (pathName.startsWith('/search')) router.setParams({ query })
            else router.push(`/search/${query}`)
        }}>
            <Image 
                source={icons.search}
                style={tw`w-5 h-5`}
                resizeMode='contain'
            />
        </TouchableOpacity>
      </View>
    
  )
}

export default SearchInput