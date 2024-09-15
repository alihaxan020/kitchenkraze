import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  withSpring,
  useSharedValue,
  FadeInDown,
  useAnimatedStyle,
} from "react-native-reanimated";

import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  };

  const getRecipies = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        // setCategories(response.data.categories);
        setRecipes(response.data.meals);
      }
    } catch (error) {
      console.log("ERROR: ", error.message);
    }
  };

  const handleChangeCategory = (category) => {
    getRecipies(category);
    setActiveCategory(category);
    setRecipes([]);
  };
  useEffect(() => {
    getCategories();
    getRecipies();
    opacity.value = withSpring(1);
    translateY.value = withSpring(0);
  }, []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-4 pt-8 "
      >
        <View className="flex-row justify-between items-center mx-4">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{
              height: hp(7),
              width: hp(7.5),
            }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Animated.Text
            style={[{ fontSize: hp(1.7) }, animatedStyle]}
            className="text-neutral-600"
          >
            Hello, Hassan
          </Animated.Text>
          <View>
            <Animated.Text
              style={[{ fontSize: hp(3.8) }, animatedStyle]}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Animated.Text>
          </View>
          <Animated.Text
            style={[{ fontSize: hp(3.8) }, animatedStyle]}
            className="font-semibold text-neutral-600"
          >
            Stay at <Text className="text-amber-400">home</Text>
          </Animated.Text>
        </View>

        {/* searchbar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] ">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            style={{ fontSize: 16 }}
            className="flex-1 text-base mb-1 pl-3 items-center"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon color="gray" strokeWidth={3} size={16} />
          </View>
        </View>

        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>
        <View>
          <Recipes meals={recipes} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
