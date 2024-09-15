import { StyleSheet, Image, View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { withSpring, useSharedValue } from "react-native-reanimated";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();
  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100
    );

    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300
    );

    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      {/* logo image with rings  */}
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
              width: hp(20),
              height: hp(20),
              resizeMode: "contain",
            }}
          />
        </Animated.View>
      </Animated.View>
      {/* title and punch line */}
      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="font-bold tracking-widest  text-white"
        >
          KitchenKraze
        </Text>
        <Text
          style={{ fontSize: hp(3) }}
          className="font-medium tracking-wide  text-white"
        >
          Delicious Recipes at Your Fingertips
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
