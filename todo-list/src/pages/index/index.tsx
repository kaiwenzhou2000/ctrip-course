import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { Button, Menu, NavBar } from "@nutui/nutui-react-taro"
import TodoItem from '../../components/TodoItem/index'
import styles from './index.module.scss'
import { Todos } from '../../../types/todo/index'
import Taro, { useDidShow, useShareAppMessage } from '@tarojs/taro';
import { Share } from '@nutui/icons-react-taro'

// TODO: 返回顶部

function Index() {

  const fetchData = async () => {
    try{
      const temp = await Taro.getStorage({key: 'todos'})
      setTodos(temp.data)
    }catch(e){
      await Taro.setStorage({
        key: 'todos',
        data: []
      }) 
    }
  }

  useEffect(() => {    
    fetchData();
  }, [])

  useDidShow(() => {
    console.log('did show')
    fetchData();
  })
  
  const [todos, setTodos] = useState<Todos[]>([])

  const [options] = useState([
    { text: '全部', value: 0 },
    { text: 'P1', value: 1 },
    { text: 'P2', value: 2 },
    { text: 'P3', value: 3 },
    { text: 'P4', value: 4 },
    { text: 'P5', value: 5 }
  ])
  const [options1] = useState([
    { text: '默认排序', value: 'default' },
    { text: '优先级排序', value: 'priority' },
    { text: '时间排序', value: 'time' }
  ])

  const [stateOne, setStateOne] = useState(0)
  const [stateTwo, setStateTwo] = useState('default')

  const order = async () => {
    let {data: res} = await Taro.getStorage({key: 'todos'})
    if(stateOne !== 0){
      res = res.filter(item => {
        console.log(item.priority)
        return item.priority === stateOne
      })
    }

    console.log(JSON.stringify(res))
    switch(stateTwo){
      case 'default':
        break
      case 'priority':
        res.sort((a, b) => {
          return b.priority - a.priority
        })
        break
      case 'time':
        res.sort((a, b) => {
          return new Date(a.time) - new Date(b.time)
        })
        break
    }

    setTodos(JSON.parse(JSON.stringify(res)))
  }

  useEffect(() => {
    order()
  }, [stateOne, stateTwo]);
  
  const right = (
    <span
      className="flex-center"
      onClick={(e) => {
          useShareAppMessage(res => {
            return {
              title: 'Todo List',
              path: '/pages/index/index',
            }
          })
        } 
      }
    >
      <Share size={14} />
    </span>
  )

  return (
    
    <View className={styles.container}>
      <NavBar
        right={process.env.TARO_ENV === 'weapp' ? right : null}
      >
        <span>
          Todo List
        </span>
      </NavBar>
      <Menu>
          <Menu.Item options={options} value={stateOne} onChange={(v) => {
            setStateOne(v.value)
          }} />
          <Menu.Item options={options1} value={stateTwo} onChange={(v) => {
            setStateTwo(v.value)
          }} />
      </Menu>
      <View className={styles.index}>
        {todos.map(item => {
          return <TodoItem key={item.id} {...item} onCheck={(id) => {
            const newTodos = todos.map(todo => {
              if(todo.id === id){
                todo.completed = !todo.completed
              }
              return todo
            })
            setTodos(newTodos)
            Taro.setStorage({
              key: 'todos',
              data: newTodos
            })
          }}/>
        })}
      </View>
      
      <View className={`${styles.index} ${styles.btn}`}>
        <Button type="primary" onClick={() => {
          Taro.navigateTo({
            url: '/pages/addTodo/index'
          });
        }}>
          添加todo
        </Button>
      </View>
    </View>
  )
}

export default Index
