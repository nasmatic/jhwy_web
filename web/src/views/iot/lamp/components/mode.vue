<template>
    <div>
        <Row class="detail-row" v-for="(item, key) in list" :key="key">
            <Col :span="3">模式{{ key + 1 }}</Col>
            <Col :span="6">
                <span class="detail-label">模式名称</span>
                <div class="detail-content">{{ item.name }}</div>
            </Col>
            <Col :span="6">
                <span class="detail-label">开启时间</span>
                <div class="detail-content">{{ item.start_time }}</div>
            </Col>
            <Col :span="6">
                <span class="detail-label">关闭时间</span>
                <div class="detail-content">{{ item.end_time }}</div>
            </Col>
        </Row>
    </div>
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

import { Row, Col } from 'view-design';

export default {
    name: 'LampWorkMode',
    props: {
        list: Array
    },
    components: {
        Row,
        Col
    }
};
</script>
