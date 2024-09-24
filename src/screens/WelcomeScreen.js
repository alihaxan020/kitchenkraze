import React, { useEffect } from "react";
import { Image, View, Text, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, { withSpring, useSharedValue } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const WelcomeScreen = () => {
  // Shared values for animation padding
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    // Initial animation setup
    const timeout1 = setTimeout(() => {
      ring1padding.value = withSpring(height * 0.05);
    }, 100);

    const timeout2 = setTimeout(() => {
      ring2padding.value = withSpring(height * 0.055);
    }, 300);

    const navigationTimeout = setTimeout(() => {
      navigation.navigate("Home");
    }, 2500);

    // Cleanup timeouts on component unmount
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(navigationTimeout);
    };
  }, [navigation, ring1padding, ring2padding]);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      {/* Logo with animated rings */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ring2padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring1padding }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{
              width: height * 0.2,
              height: height * 0.2,
              resizeMode: "contain",
            }}
          />
        </Animated.View>
      </Animated.View>
      {/* Title and subtitle */}
      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: height * 0.07 }}
          className="font-bold tracking-widest text-white"
        >
          KitchenKraze
        </Text>
        <Text
          style={{ fontSize: height * 0.03 }}
          className="font-medium tracking-wide text-white"
        >
          Delicious Recipes at Your Fingertips
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
