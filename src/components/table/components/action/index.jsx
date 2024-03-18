import { defineComponent } from 'vue'
import Group from './Group'
import classNames from '@/utils/classNames/bind'
import styles from './style/index.module.scss'

const cx = classNames.bind(styles)

const Action = defineComponent({
    inheritAttrs: false,
    props: {
        type: {
            type: String,
            default: 'primary'
        },
        onClick: {
            type: Function,
            default: undefined
        }
    },
    emits: ['click'],
    setup (props, { emit, slots, attrs }) {
        function onClick (evt) {
            emit('click', evt)
        }

        return () => {
            const actionClassNames = cx('action', {
                'action__primary': props.type === 'primary',
                'action__warning': props.type === 'warning',
                'action__error': props.type === 'error'
            })

            return (
                <a class={actionClassNames} {...attrs} onClick={onClick}>
                    {slots.default && slots.default()}
                </a>
            )
        }
    }
})

Action.Group = Group

export default Action
