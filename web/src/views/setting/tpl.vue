<template>
    <section>
        <Header>
            <span slot="description">
                微信公众号模板消息内设置，此处仅供展示。
            </span>
        </Header>

        <Card dis-hover :bordered="false">
            <Table stripe :columns="columns" :data="list" />
        </Card>

        <Spin size="large" fix v-if="fetching" />
    </section>
</template>

<script>
/**
 * +----------------------------------------------------------------------
 * | 「海门嘉海」 —— 助力物业服务升级，用心服务万千业主
 * +----------------------------------------------------------------------
 * | Copyright (c) 2020~2021 https://www.chowa.com All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed 未经许可不能去掉「海门嘉海」和「HMJH」相关版权
 * +----------------------------------------------------------------------
 * | Author: jixuecong@chowa.cn
 * +----------------------------------------------------------------------
 */

import { Header } from '@/components';
import { Card, Spin, Table } from 'view-design';
import * as utils from '@/utils';

export default {
    name: 'SettingTpl',
    data() {
        return {
            fetching: true,
            list: [],
            columns: [
                {
                    title: '模板标题',
                    minWidth: 140,
                    key: 'title'
                },
                {
                    title: '模板id',
                    key: 'template_id',
                    minWidth: 120
                },
                {
                    title: '模板示例',
                    minWidth: 320,
                    key: 'content'
                }
            ]
        };
    },
    mounted() {
        this.getListData();
    },
    methods: {
        getListData() {
            this.fetching = true;

            utils.request
                .get('/o-a/tpl')
                .then(res => {
                    this.fetching = false;
                    this.list = res.data.list;
                })
                .catch(() => (this.fetching = false));
        }
    },
    components: {
        Header,
        Card,
        Spin,
        Table
    }
};
</script>
