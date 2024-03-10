import { useState  } from "react";
import { DatePicker, Form, Button, Input, Rate } from '@nutui/nutui-react-taro';
import { PickerOption } from "@nutui/nutui-react-taro/dist/types/packages/picker/types";
import Taro from "@tarojs/taro";

type Props = {
  onSubmit: (values: any) => void
}

export default ({onSubmit}: Props) => {
  const startDate = new Date()
  const endDate = new Date(2026, 10, 1)

  const [form] = Form.useForm()

  const onTimePickerConfirm = (values:(string|number)[],options:PickerOption[])=>{
    console.log(values)
    const date = values.slice(0, 3).join('-');
    const time = values.slice(3).join(':');
    form.setFieldsValue({ time: `${date  } ${  time}` })
  }

  const [timePickerVisible, setTimePickerVisible] = useState(false)

  
  return (
    <>
      <Form
        form={form}
        divider
        labelPosition="left"
        onFinish={(values) => onSubmit(values)}
        onFinishFailed={() => Taro.showToast({ title: '请根据提示修改输入', icon: 'error' })}
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button formType="submit" type="primary">
              提交
            </Button>
          </div>
        }
      >
        <Form.Item
          label="事项名称"
          name="text"
          rules={[{ required: true, message: "请输入事项名称" }]}
        >
          <Input placeholder="请输入事项名称" type="text" />
        </Form.Item>
        <Form.Item label="重要性" name="priority" rules={[{ required: true, message: "请选择事项的重要性" }]}>
          <Rate defaultValue={0} />
        </Form.Item>
        <Form.Item
          label="提醒时间"
          name="time"
          rules={[{ required: true, message: "请选择事项的执行时间" }]}
        >
          <Input placeholder="请选择事项的执行时间" type="string" onClick={() => {
            setTimePickerVisible(true)
          }}/>
        </Form.Item>
      </Form>
      <DatePicker
        title="日期时间选择"
        startDate={startDate}
        endDate={endDate}
        visible={timePickerVisible}
        type="datetime"
        onClose={() => setTimePickerVisible(false)}
        onConfirm={(options, values) => onTimePickerConfirm(values,options)}
      />
    </>
  )
}