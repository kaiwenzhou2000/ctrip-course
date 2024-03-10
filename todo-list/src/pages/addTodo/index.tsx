import { NavBar } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { ArrowLeft } from '@nutui/icons-react-taro'
import { View } from '@tarojs/components'
import AddTodoListsForm from '../../components/AddTodoListsForm/index'
import {getUuid} from '../../utils/time/index'


const onSubmit = async (v) => {
  const newTodo = {
    id: getUuid(),
    ...v
  }

  try{
    const temp = await Taro.getStorage({key: 'todos'})
    temp.data.push(newTodo)
    await Taro.setStorage({
      key: 'todos',
      data: temp.data
    })
  }catch(e){
    await Taro.setStorage({
      key: 'todos',
      data: [newTodo]
    }) 
  }
  
  

  Taro.showToast({ title: '添加成功' })

  Taro.navigateBack()
}

export default () => {
  return (
  <>
     <NavBar
        back={<ArrowLeft size={14} />}
        onBackClick={(e) => Taro.navigateBack()}
      >
        <View>
          <span
            onClick={(e) => Taro.showToast({ title: '清空' })}
          >
            添加todo
          </span>
        </View>
      </NavBar>
      <AddTodoListsForm onSubmit={onSubmit}/>
  </>
  )
}