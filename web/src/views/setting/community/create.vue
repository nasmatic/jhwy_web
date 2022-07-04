<template>
    <section>
        <Header back>
            <span slot="description">
                公司整体设置，请谨慎操作，如有疑问请发信至
                <a href="mailto:261349695@qq.com">技术支持</a>
                咨询。
            </span>
        </Header>

        <CommunityEditor :onSubmit="submit" />
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
import { Message } from 'view-design';
import CommunityEditor from './components/editor';
import * as utils from '@/utils';

export default {
    name: 'SettingCommunityCreate',
    methods: {
        submit(data) {
            return new Promise((resolve, reject) => {
                utils.request
                    .post('/community_manage/create', data)
                    .then(res => {
                        Message.success('添加小区成功');
                        this.$router.push(`/setting/community/detail/${res.data.id}`);
                        resolve();
                    })
                    .catch(() => reject());
            });
        }
    },
    components: {
        Header,
        CommunityEditor
    }
};
</script>
