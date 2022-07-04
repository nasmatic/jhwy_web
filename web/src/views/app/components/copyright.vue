<template>
    <div class="copyright">
        <a href="https://beian.miit.gov.cn" target="_blank">
            苏ICP备2022009169号-1
        </a>
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

export default {
    name: 'Copyright'
};
</script>

<style lang="less">
.copyright {
    padding: 28px 0 24px 0;
    font-size: 12px;
    color: #808695;
    text-align: center;
    line-height: 1.6;

    a {
        color: #808695;

        + a {
            margin-left: 14px;
        }
    }
}

@media screen and (max-width: 576px) {
    .copyright {
        display: flex;
        flex-direction: column;

        a {
            margin-left: 0 !important;
        }
    }
}
</style>
