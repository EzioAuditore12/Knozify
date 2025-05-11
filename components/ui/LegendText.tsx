// TODO : Need to improver Legned Text cinoibebt
import {View,Text} from 'react-native'

export const LegendText=({textName}:{textName:string})=>{
    return(
    <View className="flex-row items-center mb-5 w-11/12 self-center">
    <View className="flex-1 h-px bg-gray-300" />
    <Text className="text-gray-500 text-sm mx-2">{textName}</Text>
    <View className="flex-1 h-px bg-gray-300" />
    </View>
    )
}