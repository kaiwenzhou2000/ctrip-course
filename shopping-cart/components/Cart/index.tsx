import { SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";

import { Box, Text } from "../../gluestack-ui-comp";
import SearchInput from "./Search";
import { AllPokemon } from "../../types";
import PokemonCard from "./PokemonCard/Index";

interface HomeScreenProps {
  allPokemons: AllPokemon[];
  fetchNextPage: any;
  hasNextPage: boolean | undefined;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  allPokemons,
  fetchNextPage,
  hasNextPage,
}) => {
  const results = allPokemons
    ? allPokemons?.flatMap((data) => data?.results)
    : [];
  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1} width={"$full"} padding={"$5"} mb={"$1.5"}>
        <Text size="3xl" fontWeight="$bold" color="$textDark950">
          宝可梦交易平台🛍️
        </Text>
        <Text size="md">
        选择你喜欢的宝可梦吧～
        </Text>
        <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: 'blue',
          height: 50,
          display: 'flex',
          justifyContent: "center",
          alignContent: 'center'
        }}
        onPress={() => {
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, margin: 'auto' }}>查看购物车</Text>
      </TouchableOpacity>
        <SearchInput />
        <FlatList
          data={results}
          renderItem={({ item, index }) => (
            <PokemonCard item={item} index={index} />
          )}
          keyExtractor={({ name }) => name}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        />
      </Box>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
