import { View, Text, Pressable, Image, Dimensions } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

import { MasonryFlashList } from "@shopify/flash-list";
const { height } = Dimensions.get("screen");
import Loading from "./loading";
import { useNavigation } from "@react-navigation/native";
export default function Recipes({ meals, categories }) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: height * 0.03 }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading size="large" className="mt-20" color="#fbbf24" />
        ) : (
          <MasonryFlashList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={meals.length}
            renderItem={({ item, i }) => (
              <RecipeCard recipe={item} index={i} navigation={navigation} />
            )}
          />
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ recipe, index, navigation }) => {
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: "100%",
          borderRadius: 35,
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => navigation.navigate("RecipeDetail", { ...recipe })}
      >
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? height * 0.25 : height * 0.35,
            borderRadius: 35,
          }}
        />
        <Text
          style={{ fontSize: height * 0.015 }}
          className="font-semibold text-neutral-600 ml-2"
        >
          {recipe.strMeal.length > 20
            ? recipe.strMeal.slice(0, 16) + "... "
            : recipe.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
