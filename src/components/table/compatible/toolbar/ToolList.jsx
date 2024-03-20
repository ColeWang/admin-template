import { defineComponent } from 'vue'
import { Button, Space, Tooltip } from 'ant-design-vue'
import { ReloadOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons-vue'
import Density from '../../components/density'
import Setting from '../../components/setting'
import { useLocaleReceiver } from '@/components/locale-provider'

const toolListProps = {
    loading: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: undefined
    },
    columns: {
        type: Array,
        default: () => ([])
    },
    exportRender: {
        type: Boolean,
        default: true
    },
    densityRender: {
        type: Boolean,
        default: true
    },
    settingRender: {
        type: Boolean,
        default: true
    },
    onReload: {
        type: Function,
        default: undefined
    },
    onExport: {
        type: Function,
        default: undefined
    }
}

export default defineComponent({
    inheritAttrs: false,
    props: toolListProps,
    emits: ['reload', 'export'],
    setup (props, { emit }) {
        const { t } = useLocaleReceiver('Table.toolbar')

        function onReloadClick () {
            !props.loading && emit('reload')
        }

        function onExportClick () {
            emit('export')
        }

        return () => {
            const { loading, size, columns } = props
            const { exportRender, densityRender, settingRender } = props

            return (
                <Space.Compact>
                    <Tooltip title={t('reload')}>
                        <Button onClick={onReloadClick}>
                            <ReloadOutlined spin={loading}/>
                        </Button>
                    </Tooltip>
                    {exportRender && (
                        <Tooltip title={t('export')}>
                            <Button onClick={onExportClick}>
                                <VerticalAlignBottomOutlined/>
                            </Button>
                        </Tooltip>
                    )}
                    {densityRender && (
                        <Density size={size}/>
                    )}
                    {settingRender && (
                        <Setting columns={columns}/>
                    )}
                </Space.Compact>
            )
        }
    }
})
