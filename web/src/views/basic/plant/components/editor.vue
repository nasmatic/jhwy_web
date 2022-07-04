<template>
    <WaterMark class="questionnaire-editor">
        <Card dis-hover :bordered="false" title="绿植租赁信息">
            <Form
                :model="form"
                ref="form"
                :label-position="mlabelPostion"
                :label-width="mlabelWidth"
                @submit.native.prevent
                :rules="rules"
            >
                <FormField title="绿植品类：" prop="plant">
                    <Input v-model="form.plant" placeholder="请输入绿植品类" />
                </FormField>

                <FormField title="租赁开始时间：" prop="rent_start">
                    <DatePicker v-model="form.rent_start" placeholder="请选择开始时间" />
                </FormField>

                <FormField title="预计归还时间：" prop="rent_end">
                    <DatePicker v-model="form.rent_end" placeholder="请选择归还时间" />
                </FormField>

                <FormField title="租赁人：" prop="renter">
                    <Input v-model="form.renter" placeholder="请输入租赁人" />
                </FormField>

                <FormField title="备注信息：" prop="misc_info">
                    <Input v-model="form.misc_info" placeholder="请输入备注信息" />
                </FormField>
            </Form>
        </Card>

        <div class="cw-form-actions">
            <Button type="primary" :loading="submiting" @click="submit">{{ '提交' }}</Button>
        </div>
    </WaterMark>
</template>

<script>
import { mapGetters } from 'vuex';
import { FormField, WaterMark } from '@/components';
import { Card, Button, Form, Input, DatePicker, Icon, Radio, Switch, Checkbox, Message } from 'view-design';
import formMixin from '@/mixins/form';

export default {
    name: 'PlantEditor',
    props: {
        detail: {
            type: Object,
            default: () => {
                return {};
            }
        },
        onSubmit: Function
    },
    data() {
        return {
            form: {
                plant: this.detail.plant ? this.detail.plant : '',
                rent_start: this.detail.rent_start ? new Date(this.detail.rent_start) : '',
                rent_end: this.detail.rent_end ? new Date(this.detail.rent_end) : '',
                renter: this.detail.renter ? this.detail.renter : '',
                misc_info: this.detail.misc_info ? this.detail.misc_info : ''
            },
            rules: {
                plant: [
                    { required: true, message: '请输入绿植品类' },
                    { max: 56, message: '绿植品类不能超过56个字' }
                ],
                rent_start: [{ required: true, message: '请选择租赁开始' }],
                rent_end: [{ required: true, message: '请选择租赁结束' }],
                renter: [{ required: true, message: '请输入租赁人' }],
                misc_info: [{ max: 200, message: '备注信息不能超过200个字' }]
            },
            submiting: false,
            // 问题逻辑
            editingIndex: -1
        };
    },
    mixins: [formMixin],
    methods: {
        submit() {
            this.$refs.form.validate(valid => {
                if (!valid) return;

                if (this.editingIndex > -1) {
                    return Message.error('请先完成编辑操作');
                }

                const cb = () => {
                    this.submiting = true;

                    const data = {
                        ...this.form
                    };
                    data.rent_start = +data.rent_start;
                    data.rent_end = +data.rent_end;

                    this.submiting = true;

                    this.onSubmit(data).then(
                        () => {
                            this.submiting = false;
                        },
                        () => {
                            this.submiting = false;
                        }
                    );
                };

                cb();
            });
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
    // watch: {
    //     detail: {
    //         deep: true,
    //         handler(cur) {
    //             this.form = {
    //                 title: cur.title ? cur.title : '',
    //                 expire: cur.expire ? new Date(cur.expire) : '',
    //                 published: cur.published ? cur.published : 0
    //             };
    //
    //             this.questions = cur.questions ? cur.questions : [];
    //         }
    //     }
    // },
    components: {
        Card,
        Button,
        Form,
        Input,
        DatePicker,
        FormField,
        Icon,
        Radio,
        OSwitch: Switch,
        Checkbox,
        WaterMark
    }
};
</script>

<style lang="less">
.questionnaire-editor {
    .questions {
        .form-field {
            flex-direction: column;
        }
    }

    .add-btns {
        padding-top: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

        button + button {
            margin-left: 16px;
        }
    }

    .question {
        padding: 12px;
        border-radius: 4px;
        cursor: move;

        .title-row {
            display: flex;
            flex-direction: row;
            line-height: 20px;
            margin-bottom: 14px;

            span {
                font-size: 14px;
                font-weight: 600;
                color: #222;
                padding-right: 10px;
            }

            .edit-btn {
                margin-left: 12px;
                font-size: 16px;
                cursor: pointer;
                color: #999;
                transition: all 0.2s;
                opacity: 0;

                &:hover {
                    color: #2d8cf0;
                }
            }
        }

        &:hover .title-row .edit-btn {
            opacity: 1;
        }

        .answer-row {
            display: flex;
            flex-direction: row;
            line-height: 20px;
            margin-bottom: 4px;

            span {
                padding-right: 4px;
            }

            button {
                margin-left: 10px;
                padding: 0;
                width: 22px;
                height: 22px;
                font-size: 18px;
                line-height: 20px;

                span {
                    padding-right: 0;
                }
            }

            .ivu-radio-disabled .ivu-radio-inner,
            .ivu-checkbox-disabled .ivu-checkbox-inner {
                border: 1px solid #dcdee2;
                background: #fff;
            }
        }

        &.editing {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);

            .title-row,
            .answer-row {
                line-height: 32px;
                align-items: center;
            }

            .operate-box {
                padding-top: 12px;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                button + button {
                    margin-left: 8px;
                }
            }
        }

        + .question {
            margin-top: 16px;
        }
    }
}
</style>
