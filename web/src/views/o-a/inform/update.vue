<template>
    <WaterMark>
        <Header back />

        <Editor :onSubmit="submit" update :detail="detail" />

        <Spin size="large" fix v-if="fetching" />
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

import { mapGetters } from 'vuex';
import { Message, Spin } from 'view-design';
import { Header, WaterMark } from '@/components';
import Editor from './components/editor';
import * as utils from '@/utils';

export default {
    name: 'OaInformUpdate',
    components: {
        Header,
        Editor,
        Message,
        Spin,
        WaterMark
    },
    data() {
        return {
            fetching: true,
            detail: {}
        };
    },
    mounted() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            utils.request
                .get(`/inform/detail/${this.$route.params.id}`)
                .then(res => {
                    this.fetching = false;
                    this.detail = res.data;
                })
                .catch(() => (this.fetching = false));
        },
        submit(data) {
            return new Promise((resolve, reject) => {
                data.id = this.$route.params.id;
                data.community_id = this.postInfo.default_community_id;

                utils.request
                    .post('/inform/update', data)
                    .then(() => {
                        Message.success('更新行政通知成功');
                        this.$router.push(`/o-a/inform/detail/${this.$route.params.id}`);
                        resolve();
                    })
                    .catch(() => reject());
            });
        }
    },
    computed: {
        ...mapGetters({
            postInfo: 'common/postInfo'
        })
    }
};
</script>
