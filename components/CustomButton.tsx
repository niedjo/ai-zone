import { Colors } from '@/constants/Colors'
import { CustomButtonsProps } from '@/types'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'


const CustomButton = ({title, handlePress, containerStyle, textStyle, isLoading} : CustomButtonsProps) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        style={
            [tw`rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`,
                {backgroundColor : Colors.secondary.DEFAULT}]
            }
        disabled={isLoading}
        >
        <Text style={[tw`text-lg ${textStyle as string}`, {color : Colors.primary, fontFamily : Colors.fontFamily.psemibold[0]}]}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton