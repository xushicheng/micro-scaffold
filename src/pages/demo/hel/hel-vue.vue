<template>
    <h1>演示在本地加载 hel-micro 模块, 实现模块联邦功能</h1>
    <HelloHelMicro msg="可以看到 hel-micro 正确载入了" />
</template>

<script setup lang="ts">
    import HelloHelMicro from "../hel/hello-hel-micro.vue"
</script>
