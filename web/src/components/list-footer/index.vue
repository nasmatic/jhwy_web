<template>
    <div class="list-footer">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ListFooter'
};
</script>

<style lang="less">
.list-footer {
    text-align: right;
    padding-top: 24px;
}
</style>
