import { icons } from '@/constants';
import { Colors } from '@/constants/Colors'
import { FormFieldProps } from '@/types';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import tw from 'twrnc'


const FormField = ({title, value, placeholder, handleChangeText, otherStyle, keyboardType, ...props} : FormFieldProps) => {

    const [showPAssword, setShowPAssword] = useState<boolean>(false)

    return (
    <View style={tw` ${otherStyle}`}>
      <Text style={[tw`text-base text-gray-100`, { fontFamily : Colors.fontFamily.pmedium[0]}]}>{title}</Text>
        
      <View style={[tw`border-2 w-full h-16 px-4 rounded-2xl items-center flex-row`, {backgroundColor : Colors.black[100]}]}>
        <TextInput 
            style={[tw`flex-1 text-white text-base`, { fontFamily : Colors.fontFamily.psemibold[0]}]}
            value={value}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={"#7B7B8B"}
            secureTextEntry={(title === 'Password' || title === "Mot de passe") && !showPAssword}
        />

        {(title === 'Password' || title === "Mot de passe") && 
            <TouchableOpacity onPress={() => setShowPAssword(!showPAssword)}>
                <Image 
                    source={!showPAssword ? icons.eye : icons.eyeHide}
                    style={tw`w-6 h-6`}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        }
      </View>
    
    </View>
  )
}

export default FormField