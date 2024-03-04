import { useWindowDimensions, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Box, Text, Tips } from "../../gluestack-ui-comp";
import Header from "../../components/Details/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import GradientBG from "../../components/Details/GradientBG";
import PokemonImage from "../../components/Details/PokemonImage";
import { Pokemon } from "../../types";
import About from "./About";
import Stats from "./Stats";
import Moves from "./Moves";
import Evolutions from "./Evolutions";
import { ScrollView } from "react-native";
import { useState } from "react"

interface DetailsScreenProps {
  data: Pokemon;
  id: string;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ data, id }) => {
  const [modalVisible, setModalVisible] = useState(false)

  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "about", title: "关于" },
    { key: "stats", title: "状态" },
    { key: "moves", title: "技能" },
    { key: "evolutions", title: "进化" },
  ]);

  const parmas = useLocalSearchParams()

  const {goods: goodsString} = parmas

  const goods = goodsString ? JSON.parse(goodsString) : []

  console.log(goods)

  const renderScene = SceneMap({
    about: () => (
      <About
        abilities={data?.abilities}
        weight={data?.weight}
        height={data?.base_experience}
        types={data?.types}
      />
    ),
    stats: () => <Stats stats={data?.stats} />,
    moves: () => <Moves moves={data?.moves} />,
    evolutions: () => <Evolutions name={data.name} />,
  });

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Tips text={'添加成功！'} visible={modalVisible} confirm={() => {
        setModalVisible(false)
        const isExist = goods.find((item: any) => item.name === data.name)

        if(isExist){
          goods.forEach((item: any) => {
            if(item.name === data.name){
              item.count += 1
            }
          })
        }else{
          goods.push({
            name: data.name,
            price: data.base_experience,
            count: 1
          })
        }
        console.log(goods)
        router.push({
          pathname: '/',
          params: {
            goods: JSON.stringify(goods)
          }
        })
      }}/>
 
      <Box>
        <GradientBG ability={data?.types[0]?.type?.name ?? ""} />
        <Box paddingTop={top + 20} px={"$5"}>
          <Header
            id={id as string}
            back={() => {
              router.back();
            }}
          />
          {data?.sprites.other?.dream_world?.front_default ? (
            <PokemonImage
              url={data?.sprites.other?.dream_world?.front_default}
            />
          ) : null}
          <Text
            mt={"$6"}
            size="2xl"
            textTransform="capitalize"
            textAlign="center"
            fontWeight="$bold"
            color="$muted900"
          >
            {data?.name}
          </Text>
          <Text
            mb={"$5"}
            size="lg"
            textTransform="capitalize"
            textAlign="center"
            fontWeight="$semibold"
            color="$text400"
            letterSpacing={"$md"}
          >
            {data?.types[0]?.type?.name} 宝可梦
          </Text>
        </Box>
      </Box>
      {/* Tabs Start */}
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: "#000000",
            }}
            style={{ backgroundColor: "#ffffff" }}
            renderLabel={({ route, focused }) => (
              <Text
                style={{
                  color: focused ? "#000000" : "#a1a1aa",
                  fontSize: 15,
                  fontWeight: "700",
                  textTransform: "capitalize",
                }}
              >
                {route.title}
              </Text>
            )}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        // To make react-native-tab-view scrollable
        style={{ height: layout.height }}
      />
      {/* Tabs End */}
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          height: 50,
          display: 'flex',
          justifyContent: "center",
          alignContent: 'center'
        }}
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, margin: 'auto' }}>添加至购物车</Text>
      </TouchableOpacity>
      {/* <Tips /> */}

    </ScrollView>
  );
};



export default DetailsScreen;
