import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
const { height, width } = Dimensions.get("screen");
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
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import YoutubeIframe from "react-native-youtube-iframe";
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
  const ingredientIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 0; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  useEffect(() => {
    getMealData(item.idMeal);
  }, [item.idMeal]);
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
            width: width * 0.98,
            height: height * 0.5,
            borderRadius: 25,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginTop: 4,
          }}
        />
      </View>
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full flex-row absolute justify-between items-center pt-6"
      >
        <TouchableOpacity
          className="p-2 ml-4 rounded-full bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon
            size={height * 0.035}
            strokeWidth={4.5}
            color={"#fbbf24"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavorite)}
          className="p-2 mr-4 rounded-full bg-white"
        >
          <HeartIcon
            size={height * 0.035}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>
      {loading ? (
        <Loading size="large" color="gray" className="mt-16" />
      ) : (
        <Animated.View
          entering={FadeInDown.delay(300)
            .duration(1100)
            .springify()
            .damping(12)}
          className="mx-4 flex justify-between space-y-4 pt-8"
        >
          <View className="space-y-2">
            <Text
              style={{ fontSize: height * 0.03 }}
              className="font-bold to-neutral-700 flex-1"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: height * 0.02 }}
              className="font-medium to-neutral-500 flex-1"
            >
              {meal?.strArea}
            </Text>
          </View>
          <View className="flex-row justify-around">
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(1100)
                .springify()
                .damping(12)}
              className="flex rounded-full bg-amber-300 p-2 shadow-sm shadow-gray-300"
            >
              <View
                style={{ width: height * 0.065, height: height * 0.065 }}
                className="bg-white rounded-full flex justify-center items-center"
              >
                <ClockIcon
                  size={height * 0.04}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: height * 0.02 }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: height * 0.013 }}
                  className="font-bold text-neutral-500"
                >
                  Mins
                </Text>
              </View>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(1200)
                .springify()
                .damping(12)}
              className="flex rounded-full bg-amber-300 p-2 shadow-sm shadow-gray-300"
            >
              <View
                style={{ width: height * 0.065, height: height * 0.065 }}
                className="bg-white rounded-full flex justify-center items-center"
              >
                <UsersIcon
                  size={height * 0.04}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: height * 0.02 }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: height * 0.013 }}
                  className="font-bold text-neutral-500"
                >
                  Servings
                </Text>
              </View>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(1300)
                .springify()
                .damping(12)}
              className="flex rounded-full bg-amber-300 p-2 shadow-sm shadow-gray-300"
            >
              <View
                style={{ width: height * 0.065, height: height * 0.065 }}
                className="bg-white rounded-full flex justify-center items-center"
              >
                <FireIcon
                  size={height * 0.04}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: height * 0.02 }}
                  className="font-bold text-neutral-700"
                >
                  135
                </Text>
                <Text
                  style={{ fontSize: height * 0.013 }}
                  className="font-bold text-neutral-500"
                >
                  Cal
                </Text>
              </View>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(1400)
                .springify()
                .damping(112)}
              className="flex rounded-full bg-amber-300 p-2 shadow-sm shadow-gray-300"
            >
              <View
                style={{ width: height * 0.065, height: height * 0.065 }}
                className="bg-white rounded-full flex justify-center items-center"
              >
                <Square3Stack3DIcon
                  size={height * 0.04}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: height * 0.02 }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: height * 0.013 }}
                  className="font-bold text-neutral-500"
                >
                  Easy
                </Text>
              </View>
            </Animated.View>
          </View>
          <Animated.View
            entering={FadeInDown.delay(700)
              .duration(1100)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text className="font-bold flex-1 text-neutral-700">
              Instructions
            </Text>
            <View className="space-y-2 ml-2">
              {ingredientIndexes(meal).map((i) => {
                return (
                  <View className="space-x-4 flex-row " key={i}>
                    <View
                      className="bg-amber-300 rounded-full"
                      style={{
                        width: height * 0.015,
                        height: height * 0.015,
                      }}
                    />
                    <View className="space-x-2 flex-row">
                      <Text
                        style={{ fontSize: height * 0.017 }}
                        className="font-extrabold text-neutral-700"
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: height * 0.017 }}
                        className="font-medium text-neutral-600"
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>
          <View className="space-y-4">
            <Text className="font-bold flex-1 text-neutral-700">
              Ingredients
            </Text>
            <Text
              style={{ fontSize: height * 0.016 }}
              className="text-neutral-600"
            >
              {meal?.strInstructions}
            </Text>
          </View>
          {meal?.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: height * 0.025 }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe Video
              </Text>
              <View className="shadow-sm shadow-black ring-3 rounded-sm">
                <YoutubeIframe
                  videoId={getYoutubeId(meal.strYoutube)}
                  height={height * 0.3}
                />
              </View>
            </View>
          )}
        </Animated.View>
      )}
    </ScrollView>
  );
}
