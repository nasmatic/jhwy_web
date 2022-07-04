<template>
    <section>
        <Header />

        <Card dis-hover :bordered="false">
            <Table stripe :columns="columns" :data="list" />
            <Row class="margin-top-10">
                <Button icon="md-download" @click="downloadExcel">导出记录</Button>
            </Row>

            <ListFooter>
                <Page
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
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { Header, FilterQuery, ListFooter } from '@/components';
import { Card, Page, Spin, Row, Table, Button } from 'view-design';
import * as utils from '@/utils';
import pageMixin from '@/mixins/page';
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
    name: 'BasicTopicList',
    data() {
        return {
            fetching: true,
            columns: [
                {
                    title: '索引',
                    key: 'id',
                    minWidth: 70
                },
                {
                    title: '绿植名称',
                    minWidth: 180,
                    render: (h, p) => h('span', p.row.plant)
                },
                {
                    title: '租赁开始时间',
                    key: 'rent_start',
                    minWidth: 180,
                    render: (h, p) => h('span', moment(p.row.rent_start).format('YYYY-MM-DD HH:mm:ss'))
                },
                {
                    title: '计划归还时间',
                    key: 'rent_end',
                    minWidth: 180,
                    render: (h, p) => h('span', moment(p.row.rent_end).format('YYYY-MM-DD HH:mm:ss'))
                },

                {
                    title: '租赁人',
                    minWidth: 120,
                    render: (h, p) => h('span', p.row.renter)
                },
                {
                    title: '备注信息',
                    minWidth: 100,
                    render: (h, p) => h('span', p.row.misc_info)
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
            const { page_num, page_size, filters, postInfo } = this;

            this.fetching = true;

            const data = {
                page_num,
                page_size,
                community_id: postInfo.default_community_id,
                ...filters
            };

            utils.request.post('/plant/list', data).then(res => {
                this.fetching = false;
                this.page_num = res.data.page_num;
                this.page_size = res.data.page_size;
                this.list = res.data.list;
                this.total = res.data.total;
            });
        },
        downloadExcel() {
            this.list.forEach(item => {
                if (item['rent_start'] || item['rent_end']) {
                    item['rent_start'] = moment(new Date(item['rent_start'])).format('MM/DD/YYYY');
                    item['rent_end'] = moment(new Date(item['rent_end'])).format('MM/DD/YYYY');
                }
                this.allData.push(item);
                // more tranformation to be done
            });
            const ws = XLSX.utils.json_to_sheet(this.allData, {
                header: ['id', 'plant', 'rent_start', 'rent_end', 'renter', 'misc_info']
            });
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            // save
            const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
            XLSX_SAVE.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), '绿植租赁.xlsx');
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
        FilterQuery,
        ListFooter,
        Card,
        Row,
        Page,
        Spin,
        Table,
        Button
    }
};
</script>
