import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const [isFavorite, setIsFavourite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  };
  useEffect(() => {
    getMealData(item.idMeal);
  }, []);
  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />
      <View className="flex-row justify-center">
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 25,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginTop: 4,
          }}
        />
      </View>
      <View className="w-full flex-row absolute justify-between items-center pt-6">
        <TouchableOpacity
          className="p-2 ml-4 rounded-full bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavorite)}
          className="p-2 mr-4 rounded-full bg-white"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading size="large" color="gray" className="mt-16" />
      ) : (
        <View className="mx-4 flex justify-between space-y-4 pt-8">
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold to-neutral-700 flex-1"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium to-neutral-500 flex-1"
            >
              {meal?.strArea}
            </Text>
          </View>
          <View className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex justify-center items-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-500"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex justify-center items-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-500"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex justify-center items-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  135
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-500"
                >
                  Cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="bg-white rounded-full flex justify-center items-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-500"
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
