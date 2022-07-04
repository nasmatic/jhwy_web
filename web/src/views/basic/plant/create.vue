<template>
    <section>
        <Header />

        <Editor :onSubmit="submit" />
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import { Message } from 'view-design';
import { Header } from '@/components';
import Editor from './components/editor';
import * as utils from '@/utils';

export default {
    name: 'BasicPlantCreate',
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
                    .post('/plant/create', {
                        ...data
                    })
                    .then(() => {
                        Message.success('绿植租赁发布成功');
                        this.$router.replace(`/basic/plant`);
                        resolve();
                    })
                    .catch(() => reject());
            });
        }
    }
};
</script>
