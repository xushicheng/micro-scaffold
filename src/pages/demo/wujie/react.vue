<script setup lang="ts">
import WujieVue from 'wujie-vue3'
</script>

<template>
    <!-- 保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化 -->
    <WujieVue
        width="100%"
        height="100%"
        name="唯一id"
        url="http://192.168.20.238:8080/"
        :sync="true"
    />
</template>
