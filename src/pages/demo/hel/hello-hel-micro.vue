<script lang="ts" setup>
import comps from 'hel-tpl-remote-vue3-comps-ts'

const { msg } = defineProps<{
    msg: string
}>()

const { HelloWorld: RemoteComp } = comps
</script>

<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h3>render a remote vue comp in red box below</h3>
        <div style="border:1px solid red;padding:6px">
            <RemoteComp name="hel remote vue3 comp" />
        </div>
    </div>
</template>

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
