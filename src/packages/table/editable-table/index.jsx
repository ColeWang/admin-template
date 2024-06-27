import { defineComponent, reactive, watch } from 'vue'
import { Form } from '@/packages/form'
import Table from '../table'

const editable = {
    type: 'multiple', // 可编辑表格的类型，单行编辑或者多行编辑
    editableKeys: [], // 正在编辑的行，受控属性。 默认 key 会使用 rowKey 的配置
    onChange: (editableKeys, editableRows) => {
    },
    onSave: (key, row, originRow, newLine) => {
    }, // Promise
    onDelete: (key, row) => {
    }, // Promise
}

export default defineComponent({
    inheritAttrs: false,
    props: {
        ...Table.props,
        editable: {
            type: Object,
            default: () => ({})
        },
        controlled: {
            type: Boolean,
            default: false
        },
        onChange: {}
    },
    emits: ['update:value'],
    setup (props, { emit, slots }) {
        const model = reactive(props.dataSource || [])

        watch(model, (value) => {
            emit('update:value', value)
        }, { deep: true, immediate: true })

        return () => {
            return (
                <Form model={model} layout={'vertical'}>
                    <Table
                        search={false}
                        options={false}
                        pagination={false}
                    />
                </Form>
            )
        }
    }
})
