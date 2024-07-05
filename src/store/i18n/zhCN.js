export default {
    cluster: {
        title: '集群面板',
        searchForm: {
            add: '新增',
            clear: '清除'
        },
        dialog: {
            title: '新增连接',
            cluster: '节点名称',
            bootstrapServers: '连接地址',
            zkHost: '主机',
            zkPort: '端口'
        },
        table: {
            index: '序号',
            cluster: '集群',
            bootstrapServers: '连接',
            version: '版本',
            brokerCount: 'broker数量',
            partitions: '分区',
            topics: '主题',
            production: '生产者',
            consumption: '消费者',
            opera: {
                label: '操作',
                remove: '删除'
            }
        }
    },
    topics: {
        searchForm: {
            topic: '主题',
            add: '新增',
            search: '查询',
            clear: '重置'
        },
        table: {
            index: '序号',
            topic: '主题',
            partition: '分区',
            leader: 'leader',
            replicas: '副本',
            isr: 'isr',
            opera: {
                title: '操作',
                del: '删除'
            }
        }
    }
}
