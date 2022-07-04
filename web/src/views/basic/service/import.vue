<template>
    <WaterMark class="building-import">
        <Header back />

        <Card dis-hover :bordered="false">
            <Steps :current="step">
                <Step title="上传数据" content="上传数据" />
                <Step title="数据验证" content="验证数据是否正确" />
                <Step title="导入成功" content="数据导入成功" />
            </Steps>

            <div v-if="step === 0">
                <Upload
                    action="/"
                    type="drag"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    :before-upload="parseFile"
                    class="upload"
                    :show-upload-list="false"
                >
                    <Icon type="ios-cloud-upload" />
                    <p v-if="file">已选择：{{ file.name }}</p>
                    <p>点击或拖拽访导入文件到此处上传</p>
                </Upload>

                <a :href="ASSET_HOST + '/pc/service/template/家政服务模板.xlsx'" target="_blank">
                    <Icon type="ios-help-circle" />
                    模板文件下载
                </a>

                <div class="cw-form-actions">
                    <Button type="primary" :loading="parsing" @click="doParseFile">下一步</Button>
                </div>
            </div>

            <div v-if="step === 1">
                <h3>可导入数据{{ rightData.length }}条</h3>
                <Table :data="rightData" height="360" class="right-table" :columns="rightColumns" />

                <h3>不可导入数据{{ errorData.length }}条</h3>
                <Table :data="errorData" height="220" class="error-table" :columns="errorColumns" />

                <div class="cw-form-actions">
                    <Button @click="preStep">上一步</Button>
                    <Button type="primary" :loading="submiting" @click="submit">下一步</Button>
                </div>
            </div>

            <Result title="数据导入成功" v-if="step === 2">
                <div slot="extra">
                    <p>本次共导入{{ rightData.length }}条数据</p>
                </div>

                <div slot="actions">
                    <Button @click="reImport">继续导入</Button>
                    <Button @click="goList" type="primary">查看家政</Button>
                </div>
            </Result>
        </Card>
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
import { Header, Result, WaterMark } from '@/components';
import { Card, Button, Steps, Step, Upload, Icon, Message, Table, Modal } from 'view-design';
import * as utils from '@/utils';
import { ASSET_HOST } from '@/config';

const columns = [
    {
        title: '住址',
        minWidth: 180,
        render: (h, p) => h('span', p.row.building_info ? p.row.building_info : '-')
    },
    {
        title: '户型',
        minWidth: 80,
        render: (h, p) => h('span', p.row.area ? p.row.area : '-')
    },
    {
        title: '业主姓名',
        minWidth: 80,
        render: (h, p) => h('span', p.row.name ? p.row.name : '-')
    },
    {
        title: '业主电话号码',
        minWidth: 100,
        render: (h, p) => h('span', p.row.phone ? p.row.phone : '-')
    }
];

export default {
    name: 'BasicServiceImport',
    data() {
        return {
            ASSET_HOST,
            step: 0,
            file: null,
            parsing: false,
            errorData: [],
            rightData: [],
            rightColumns: [].concat(columns),
            errorColumns: [].concat(columns, {
                title: '错误原因',
                minWidth: 100,
                render: (h, p) => h('span', p.row.error.join('，'))
            }),
            submiting: false
        };
    },
    methods: {
        parseFile(file) {
            this.file = file;
            return false;
        },
        doParseFile() {
            if (!this.file) {
                return Message.error('请选择需要导入的数据文件');
            }

            this.parsing = true;

            utils
                .request({
                    url: '/service/parse',
                    method: 'post',
                    data: {
                        community_id: this.postInfo.default_community_id,
                        file: this.file
                    },
                    uploadFile: true
                })
                .then(res => {
                    this.parsing = false;
                    this.step++;
                    this.errorData = res.data.errorData;
                    this.rightData = res.data.rightData;
                })
                .catch(() => (this.parsing = false));
        },
        preStep() {
            this.file = null;
            this.step--;
        },
        submit() {
            if (this.rightData.length === 0) {
                return Message.error('导入数据不能为空');
            }

            Modal.confirm({
                title: '请确认',
                content: `是否将数据导入到「${this.community_name}」小区`,
                onOk: () => {
                    this.submiting = true;
                    const data = {
                        community_id: this.postInfo.default_community_id,
                        services: this.rightData.map(item => {
                            const ret = { ...item };
                            delete item.error;

                            return ret;
                        })
                    };
                    utils.request
                        .post('/service/import', data)
                        .then(() => {
                            this.submiting = false;
                            this.step++;
                        })
                        .catch(() => (this.submiting = false));
                }
            });
        },
        goList() {
            this.$router.push('/basic/service');
        },
        reImport() {
            this.step = 0;
            this.file = null;
        }
    },
    computed: {
        ...mapGetters({
            postInfo: 'common/postInfo'
        }),
        community_name() {
            if (!this.postInfo.default_community_id) {
                return '';
            }

            const index = this.postInfo.community_list.findIndex(
                item => item.community_id === this.postInfo.default_community_id
            );

            return this.postInfo.community_list[index].name;
        }
    },
    components: {
        Header,
        Card,
        Button,
        Steps,
        Step,
        Upload,
        Icon,
        Table,
        Result,
        WaterMark
    }
};
</script>

<style lang="less">
.building-import {
    .upload {
        margin-top: 30px;
        margin-bottom: 12px;

        .ivu-upload-drag {
            padding: 32px 0;
        }

        i {
            font-size: 52px;
            color: #3399ff;
        }

        p {
            margin-top: 12px;
        }
    }

    .right-table {
        margin: 0 22px;
        border: 1px solid #b7eb8f;
        border-radius: 4px;
    }

    h3 {
        margin-top: 26px;
        margin-bottom: 12px;
        text-indent: 22px;
        font-weight: 400;
    }

    .error-table {
        margin: 0 22px;
        border: 1px solid #f5222d;
        border-radius: 4px;
    }
}
</style>
