<template>
    <WaterMark>
        <Header>
            <Tabs :value="activeTab" slot="nav" @on-click="onTabChange">
                <TabPane label="我发起的流程" icon="md-people" name="my" />
                <TabPane label="需要我审批的" icon="approver" name="approver" />
                <TabPane label="抄送给我的" icon="ios-paper-plane-outline" name="notice" />
            </Tabs>
        </Header>

        <component :is="activeTab" />
    </WaterMark>
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

import { Header, WaterMark } from '@/components';
import { Tabs, TabPane } from 'view-design';
import My from './components/my';
import Approver from './components/approver';
import Notice from './components/notice';

export default {
    name: 'OaPurchaseFlow',
    data() {
        return {
            activeTab: this.$route.query.tab ? this.$route.query.tab : 'my'
        };
    },
    methods: {
        onTabChange(name) {
            this.activeTab = name;
            this.$router.push(`${this.$route.path}?tab=${name}`);
        }
    },
    components: {
        Tabs,
        TabPane,
        Header,
        WaterMark,
        My,
        Approver,
        Notice
    }
};
</script>
