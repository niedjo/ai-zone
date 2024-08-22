import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from "../../constants"
import tailwind from 'twrnc'
import { Colors } from '@/constants/Colors'
import { TabIconType, Translations } from '@/types'
import { useGlobalContext } from '@/context/GlobalProvider'


const TabIcon = ({icon, color, name, focused} : TabIconType) => {
  return (
    <View style={tailwind`items-center justify-center gap-2`}>
      <Image 
        source={icon}
        resizeMode='contain'
        tintColor={color}
        style={tailwind`w-6 h-6`}
      />
      <Text 
        style={focused ? 
        [{fontFamily : Colors.fontFamily.psemibold[0], color : color}, tailwind`text-xs`] : 
        [{fontFamily : Colors.fontFamily.pregular[0], color : color}, tailwind`text-xs`]}
        >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {

  const { text } : { text : Translations } = useGlobalContext()

  return (
    <>
      <Tabs
        // parcequ'on voie home deux fois, on modifie un peu les options
        screenOptions={{
          tabBarShowLabel : false,
          tabBarActiveTintColor : "#FFA001",
          tabBarInactiveTintColor : "#CDCDE0",
          tabBarStyle : {
            backgroundColor : "#161622",
            borderTopWidth : 1,
            borderTopColor : "#232533",
            height : 84
          }
        }}
      >
        <Tabs.Screen 
          name='home' 
          options={{
            title : "Home",
            headerShown : false,
            tabBarIcon : ({ color, focused }) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name={text.Home}
                focused={focused}
              />
            )
          }}
          />
        <Tabs.Screen 
          name='bookmark' 
          options={{
            title : "Bookmark",
            headerShown : false,
            tabBarIcon : ({ color, focused }) => (
              <TabIcon 
                icon={icons.bookmark}
                color={color}
                name={text.Bookmark}
                focused={focused}
              />
            )
          }}
          />
        <Tabs.Screen 
          name='create' 
          options={{
            title : "Create",
            headerShown : false,
            tabBarIcon : ({ color, focused }) => (
              <TabIcon 
                icon={icons.plus}
                color={color}
                name={text.Create}
                focused={focused}
              />
            )
          }}
          />
        <Tabs.Screen 
          name='profile' 
          options={{
            title : "Profile",
            headerShown : false,
            tabBarIcon : ({ color, focused }) => (
              <TabIcon 
                icon={icons.profile}
                color={color}
                name={text.Profile}
                focused={focused}
              />
            )
          }}
          />
      </Tabs>
    </>
  )
}

export default TabsLayout