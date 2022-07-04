<template>
    <WaterMark>
        <Header />

        <FilterQuery :filterOptions="filterOptions" :filters="filters" class="mt-16" />

        <Card dis-hover :bordered="false">
            <Table stripe :columns="columns" :data="list" />

            <ListFooter>
                <Page
                    show-total
                    show-elevator
                    show-sizer
                    :page-size="page_size"
                    :total="total"
                    :current="page_num"
                    @on-change="onPageChange"
                    @on-page-size-change="onPageSizeChange"
                />
            </ListFooter>
        </Card>

        <Spin size="large" fix v-if="fetching" />
    </WaterMark>
</template>

<script>
import { mapGetters } from 'vuex';
import { Header, ListFooter, FilterQuery, WaterMark } from '@/components';
import { Card, Page, Spin, Table } from 'view-design';
import pageMixin from '@/mixins/page';

export default {
    name: 'BasicCCTVList',
    data() {
        return {
            fetching: true,
            filterOptions: [
                {
                    label: '监控状态',
                    prop: 'used',
                    list: [
                        { label: '正常', value: true },
                        { label: '不正常', value: false }
                    ]
                }
            ],
            filters: {
                used: undefined
            },
            columns: [
                {
                    title: '编号',
                    minWidth: 120,
                    render: (h, p) => h('span', p.row.id)
                },
                {
                    title: '文件姓名',
                    minWidth: 180,
                    render: (h, p) => h('span', p.row.name)
                },
                {
                    title: '操作',
                    key: 'id',
                    minWidth: 80,
                    fixed: 'right',
                    render: (h, p) => h('a', { on: { click: () => this.goDetail(p.row.url) } }, '查看')
                }
            ]
        };
    },
    mixins: [pageMixin],
    mounted() {
        if (this.postInfo.default_community_id) {
            this.getListData();
        }
    },
    methods: {
        getListData() {
            this.page_num = 1;
            this.page_size = 1;
            this.list = [
                {
                    id: '001',
                    name: 'building',
                    url:
                        'https://open.ys7.com/v3/openlive/G46903830_1_1.m3u8?expire=1676299962&id=414917173039296512&t=3e822eef4ed7e7936c3147a320973df85d85189244663014da918fc2fbe5e6f1&ev=100'
                }
            ];
            this.total = 1;
            this.fetching = false;
        },
        goDetail(real_video_url) {
            this.$router.push({
                path: `/basic/tutorial/detail`,
                query: { video_url: real_video_url }
            });
        }
    },
    computed: {
        ...mapGetters({
            postInfo: 'common/postInfo'
        })
    },
    components: {
        Header,
        ListFooter,
        Card,
        Page,
        Spin,
        Table,
        FilterQuery,
        WaterMark
    }
};
</script>
