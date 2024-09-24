import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

const { height } = Dimensions.get("screen");
export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory == activeCategory;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              className="flex items-center space-y-1"
            >
              <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                <Animated.Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
              <Text
                className="text-neutral-600"
                style={{ fontSize: height * 0.016 }}
              >
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
