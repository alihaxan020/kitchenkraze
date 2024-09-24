import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";

import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";
const { height } = Dimensions.get("screen");
const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

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
  }, []);

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
              height: height * 0.07,
              width: height * 0.075,
            }}
          />
          <BellIcon size={height * 0.04} color="gray" />
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text
            style={{ fontSize: height * 0.017 }}
            className="text-neutral-600"
          >
            Hello, Hassan
          </Text>
          <View>
            <Text
              style={{ fontSize: height * 0.038 }}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: height * 0.038 }}
            className="font-semibold text-neutral-600"
          >
            Stay at <Text className="text-amber-400">home</Text>
          </Text>
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
