import { StyleSheet, Text, View } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from 'react'
import { getPokemons } from "../api";
import HomeLoadingSkeleton from "../components/Home/Loading";
import HomeScreen from "../components/Home/HomeScreen";

function Home(n: any) {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["pokemonslist"],
    queryFn: getPokemons,
    getNextPageParam: (lastPage, pages) =>
      lastPage.next !== null ? lastPage.next : lastPage,
  });

  const [goods, setGoods] = useState<Array<{
    name: string,
    price: number,
  }>>([])

  if (status === "loading") {
    return <HomeLoadingSkeleton />;
  }
  if (status === "error") {
    return (
      <View style={styles.container}>
        <Text>Error</Text>
      </View>
    );
  }
  return (
    <HomeScreen
      allPokemons={data?.pages}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
}

// export default withNavigation(Home)
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
