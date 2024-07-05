export default {
    cluster: {
        title: 'Cluster Dashboard',
        searchForm: {
            add: 'Add',
            clear: 'Clear'
        },
        dialog: {
            title: 'Add new Connect',
            cluster: 'cluster',
            bootstrapServers: 'bootstrapServers',
            zkHost: 'zkHost',
            zkPort: 'zkPort'
        },
        table: {
            index: 'index',
            cluster: 'cluster',
            version: 'version',
            bootstrapServers: 'bootstrapServers',
            brokerCount: 'brokerCount',
            partitions: 'partitions',
            topics: 'topics',
            production: 'production',
            consumption: 'consumption',
            opera: {
                label: 'opera',
                remove: 'remove'
            }
        }
    },
    topics: {
        searchForm: {
            topic: 'topic',
            add: 'Add Topic',
            search: 'Search',
            clear: 'Clear'
        },
        table: {
            index: 'index',
            topic: 'topic',
            partition: 'partition',
            leader: 'leader',
            replicas: 'replicas',
            isr: 'isr',
            opera: {
                title: 'opera',
                del: 'del'
            }
        },
        dialog: {
            title: 'Add Topics',
            topic: 'Topic',
            partitions: 'Partitions',
            replicationFactor: 'replicationFactor',
            cancel: 'Cancel',
            confirm: 'Confirm'
        }
    }
}
