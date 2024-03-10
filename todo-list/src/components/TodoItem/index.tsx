import { View } from "@tarojs/components"
import styles from './index.module.scss'
import { Todos } from "types/todo"
import { Tag } from '@nutui/nutui-react-taro';
import { Alarm } from '@nutui/icons-react-taro'

interface Props extends Todos {
  onCheck: (id: string) => void
}

export default ({id, text, completed, priority, time, onCheck}: Props) => {
  return (
    <View className={styles.container}>
      <View className={styles.left}>
        <View className={styles['todo-name']}>{text}</View>
        <View className={styles['todo-info']}>
          <View className={styles.time}>
            <Alarm color="#52AA63"></Alarm>{time}
          </View>
          <View className={styles.priority}>
          <Tag round type="primary">{`优先级 P ${priority}`}</Tag>
          </View>
        </View>
      </View>
      <View className={styles.right}>
        <View className={`${styles['check-box']} ${completed ? styles.checked : ''}`} onClick={() => onCheck(id)}></View>
      </View> 
    </View>
  )
}