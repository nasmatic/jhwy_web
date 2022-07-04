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

import { FORM_ADAPT_WIDTH } from '@/config';

export default {
    data() {
        return {
            labelWidth: 160,
            winWidth: window.innerWidth
        };
    },
    created() {
        window.addEventListener('resize', this.onResize, false);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            this.winWidth = window.innerWidth;
        }
    },
    computed: {
        mlabelPostion() {
            return this.winWidth > FORM_ADAPT_WIDTH ? 'right' : 'top';
        },
        mlabelWidth() {
            return this.winWidth > FORM_ADAPT_WIDTH ? this.labelWidth : null;
        }
    }
};
