import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import Animated, {
  withSpring,
  useSharedValue,
  FadeInDown,
  useAnimatedStyle,
} from "react-native-reanimated";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Loading from "./loading";
import { useNavigation } from "@react-navigation/native";
export default function Recipes({ meals, categories }) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {categories.length == 0 || meals.length == 0 ? (
          <Loading size="large" className="mt-20" color="#fbbf24" />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => (
              <RecipeCard recipe={item} index={i} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
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
          //   height: index % 3 == 0 ? hp(25) : hp(35),
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
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
        />
        <Text
          style={{ fontSize: hp(1.5) }}
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
