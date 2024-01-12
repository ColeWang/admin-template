import { defineComponent } from 'vue'
import XIcon from '@/components/icon'
import MenuOutlined from '@/icons/MenuOutlined'
import { isFunction, isString } from 'lodash-es'

export default defineComponent({
    inheritAttrs: false,
    props: {
        type: {
            type: [String, Function],
            default: undefined
        }
    },
    setup (props, { attrs }) {
        return () => {
            if (isFunction(props.type)) {
                return props.type(attrs)
            }
            if (props.type && isString(props.type)) {
                return <XIcon type={props.type}/>
            }
            return <MenuOutlined/>
        }
    }
})
