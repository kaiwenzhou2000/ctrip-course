import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from "expo-router";
import { HStack, Icon, Tips } from "../../gluestack-ui-comp";
import { PlusCircle, ArrowLeft, MinusCircle } from "lucide-react-native";
import { useLocalSearchParams } from 'expo-router';
import { set } from '@gluestack-style/react';

interface Goods {
  name: string;
  price: number; 
  count: number;
}

const Item = ({name, price, count, onPlus, onMinus}: {
  name: string;
  price: number;
  count: number;
  onPlus: (name: string) => void;
  onMinus:(name: string) => void; 
}) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
      <Text style={{width: 100}}>{name}</Text>
      <Text style={{width: 100}}>{price}</Text>
      <Pressable onPress={() => {onPlus(name)}}>
        <Icon size="lg" as={PlusCircle} color="$muted900" />
      </Pressable>
      <Text style={{width: 20, margin: 'auto'}}>{count}</Text>
      <Pressable onPress={() => {onMinus(name)}}>
        <Icon size="lg" as={MinusCircle} color="$muted900" />
      </Pressable>
      
    </View>
  )
}

const ShoppingCart: React.FC<{ cartItems: Goods[], onPlus: (name: string) => void, onMinus: (name: string) => void  }> = ({ cartItems, onPlus, onMinus }) => {

  return (
    <View>
      <FlatList
        data={cartItems}
        renderItem={({ item, index }) => 
          <Item name={item.name} price={item.price} count={item.count} onMinus={onMinus} onPlus={onPlus} />}
      ></FlatList>

    </View>
  );
};

const countAll = (goods: Goods[]) => goods.reduce((total, item) => total + item.price*item.count, 0);

const Index: React.FC = () => {
  const router = useRouter();
  const parmas = useLocalSearchParams()

  const {goods: goodsString} = parmas

  
  const [goods, setGoods] = useState(goodsString ? JSON.parse(goodsString) : [])

  const [totalPrice, setTotalPrice] = useState(countAll(goods))


  const onPlus = (name: string) => {
    const newGoods = goods.map((item: Goods) => {
      if (item.name === name) {
        return {
          ...item,
          count: item.count + 1
        }
      }
      return item
    })
    setGoods(newGoods)
    console.log(countAll(newGoods))
    setTotalPrice(countAll(newGoods))

  }
  const onMinus = (name:string) => {
    const newGoods = goods.map((item: Goods) => {
      if (item.name === name) {
        return {
          ...item,
          count: item.count - 1
        }
      }
      return item
    }).filter(item => item.count > 0)

    setGoods(newGoods)
    setTotalPrice(countAll(newGoods))
  }

  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={{ flex: 1, padding: 20 }}>

    <Tips text='结算成功' visible={modalVisible} confirm={() => {
        setModalVisible(!modalVisible)
        
    }}/>
        <HStack alignItems="center" justifyContent="space-between">
        <Pressable onPress={router.back}>
          <Icon size="lg" as={ArrowLeft} color="$muted900" />
        </Pressable>
      </HStack>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>购物车 🛒</Text>
      <View style={{display: 'flex', flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
        <Text style={{width: 100}}>名称</Text>
        <Text style={{width: 100}}>价格</Text>
        <Text style={{width: 40, margin: 'auto'}}>数量</Text>
        
      </View>
      <ShoppingCart cartItems={goods} onMinus={onMinus} onPlus={onPlus} />
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>
        总价 💰: {totalPrice}
      </Text>

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
          setGoods([])
          setTotalPrice(0)
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, margin: 'auto' }}>结算</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
