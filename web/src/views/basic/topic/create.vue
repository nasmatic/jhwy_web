<template>
    <section>
        <Header />

        <Editor :onSubmit="submit" />
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

import { mapGetters } from 'vuex';
import { Message } from 'view-design';
import { Header } from '@/components';
import Editor from './components/editor';
import * as utils from '@/utils';

export default {
    name: 'BasicTopicCreate',
    components: {
        Header,
        Editor,
        Message
    },
    computed: {
        ...mapGetters({
            postInfo: 'common/postInfo'
        })
    },
    methods: {
        submit(data) {
            return new Promise((resolve, reject) => {
                utils.request
                    .post('/topic/create', {
                        ...data,
                        community_id: this.postInfo.default_community_id
                    })
                    .then(res => {
                        Message.success('专题发布成功');
                        this.$router.replace(`/basic/topic/preview/${res.data.id}`);
                        resolve();
                    })
                    .catch(() => reject());
            });
        }
    }
};
</script>
