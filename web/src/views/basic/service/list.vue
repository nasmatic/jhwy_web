<template>
    <WaterMark>
        <Header />

        <FilterQuery :filterOptions="filterOptions" :filters="filters" class="mt-16" />

        <Card dis-hover :bordered="false">
            <Table stripe :columns="columns" :data="list" />

            <Row class="margin-top-10">
                <Button icon="md-download" @click="downloadExcel">导出记录</Button>
            </Row>

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
import { Card, Page, Row, Spin, Table, Button } from 'view-design';
import pageMixin from '@/mixins/page';
import * as utils from '@/utils';
import moment from 'moment';
import XLSX from 'xlsx';
import XLSX_SAVE from 'file-saver';

// xlsx 文件输出操作方法
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
}

export default {
    name: 'BasicServiceList',
    data() {
        return {
            fetching: true,
            filterOptions: [
                {
                    label: '户型',
                    prop: 'area',
                    list: [
                        { label: '大户型', value: 1 },
                        { label: '小户型', value: 0 }
                    ]
                },
                {
                    label: '打蜡',
                    prop: 'needWax',
                    list: [
                        { label: '需要', value: 1 },
                        { label: '不需要', value: 0 }
                    ]
                },
                {
                    label: '地毯清洁',
                    prop: 'needCarpet',
                    list: [
                        { label: '需要', value: 1 },
                        { label: '不需要', value: 0 }
                    ]
                },
                {
                    label: '玻璃清洁',
                    prop: 'needGlass',
                    list: [
                        { label: '需要', value: 1 },
                        { label: '不需要', value: 0 }
                    ]
                }
            ],
            filters: {
                area: undefined,
                needWax: undefined,
                needCarpet: undefined,
                needGlass: undefined
            },
            columns: [
                {
                    title: '编号',
                    minWidth: 20,
                    render: (h, p) => h('span', p.row.id)
                },
                {
                    title: '姓名',
                    minWidth: 40,
                    render: (h, p) => h('span', p.row.name)
                },
                {
                    title: '电话',
                    minWidth: 40,
                    render: (h, p) => h('span', p.row.phone)
                },
                {
                    title: '住址',
                    minWidth: 140,
                    render: (h, p) => {
                        return h('span', p.row.building_info);
                    }
                },
                {
                    title: '登记时间',
                    minWidth: 180,
                    render: (h, p) => h('span', moment(p.row.created_at).format('YYYY-MM-DD HH:mm:ss'))
                },
                {
                    title: '户型',
                    minWidth: 20,
                    render: (h, p) => h('span', p.row.area === 0 ? '大户型' : '小户型')
                },
                {
                    title: '打蜡',
                    minWidth: 20,
                    render: (h, p) => h('span', p.row.needWax === 0 ? '需要' : '不需要')
                },
                {
                    title: '打蜡类型',
                    minWidth: 20,
                    render: (h, p) => {
                        if (p.row.needWax === 0) {
                            return h('span', '不需要');
                        }

                        return h('span', p.row.waxType === 0 ? '固体蜡 ' : '液体蜡');
                    }
                },
                {
                    title: '地毯清洁',
                    minWidth: 20,
                    render: (h, p) => h('span', p.row.needCarpet === 0 ? '需要' : '不需要')
                },
                {
                    title: '玻璃清洁',
                    minWidth: 20,
                    render: (h, p) => h('span', p.row.needGlass === 0 ? '需要' : '不需要')
                }
            ],
            allData: []
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
            const { page_num, page_size, postInfo, filters } = this;
            this.fetching = true;
            const data = {
                page_num,
                page_size,
                community_id: postInfo.default_community_id,
                ...filters
            };

            utils.request
                .post('/service/list', data)
                .then(res => {
                    this.fetching = false;
                    this.page_num = res.data.page_num;
                    this.page_size = res.data.page_size;
                    this.list = res.data.list;
                    this.total = res.data.total;
                    // this.allData = [
                    //     {
                    //         id: 5,
                    //         wechat_mp_user_id: 33,
                    //         community_id: 1,
                    //         building_id: 100,
                    //         created_at: 1648940895277,
                    //         cleanType: 1,
                    //         area: '1期',
                    //         needWax: 1,
                    //         waxType: 1,
                    //         needCarpet: 1,
                    //         needGlass: 1,
                    //         community_name: '都市五星',
                    //         real_name: '顾伊娜',
                    //         phone: null,
                    //         type: 1,
                    //         building: '1号楼',
                    //         unit: '1单元',
                    //         number: '701'
                    //     }
                    // ];
                })
                .catch(() => (this.fetching = false));
        },
        downloadExcel() {
            this.list.forEach(item => {
                if (item['area'] === 0) {
                    item['area'] = '大户型';
                } else {
                    item['area'] = '小户型';
                }
                if (item['needWax'] === 0) {
                    item['needWax'] = '不需要';
                } else {
                    item['needWax'] = '需要';
                }
                if (item['waxType'] === 0) {
                    item['waxType'] = '固体蜡';
                } else {
                    item['waxType'] = '液体蜡';
                }
                if (item['needCarpet'] === 0) {
                    item['needCarpet'] = '不需要';
                } else {
                    item['needCarpet'] = '需要';
                }
                if (item['needGlass'] === 0) {
                    item['needGlass'] = '不需要';
                } else {
                    item['needGlass'] = '需要';
                }
                if (item['cleanType'] === 0) {
                    item['cleanType'] = '普通保洁';
                } else {
                    item['cleanType'] = '高端保洁';
                }
                if (item['building_info'] === null) {
                    item['building_info'] =
                        (item['community_name'] ? item['community_name'] : '') +
                        (item['building_area'] ? item['building_area'] : '') +
                        (item['building'] ? item['building'] : '') +
                        (item['unit'] ? item['unit'] : '') +
                        item['number'];
                }
                if (item['created_at'] !== null) {
                    item['created_at'] = moment(new Date(item['created_at'])).format('MM/DD/YYYY');
                }

                this.allData.push({
                    name: item['name'],
                    phone: item['phone'],
                    cleanType: item['cleanType'],
                    building_info: item['building_info'],
                    needWax: item['needWax'],
                    waxType: item['waxType'],
                    needCarpet: item['needCarpet'],
                    needGlass: item['needGlass'],
                    created_at: item['created_at']
                });
            });
            // more tranformation to be done

            const ws = XLSX.utils.json_to_sheet(this.allData, {
                header: [
                    'name',
                    'phone',
                    'building_info',
                    'cleanType',
                    'needWax',
                    'waxType',
                    'needCarpet',
                    'needGlass',
                    'created_at'
                ]
            });
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            // save
            const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
            XLSX_SAVE.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), '家政服务.xlsx');
        }
    },
    computed: {
        ...mapGetters({
            postInfo: 'common/postInfo'
        })
    },
    watch: {
        'postInfo.default_community_id'() {
            this.getListData();
        }
    },
    components: {
        Header,
        ListFooter,
        Card,
        Row,
        Page,
        Spin,
        Table,
        FilterQuery,
        WaterMark,
        Button
    }
};
</script>
