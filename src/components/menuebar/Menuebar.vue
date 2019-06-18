<template>
    <div class="menuebar-container">
        <button class="import" @click="$emit('get-test-adventure')">get test adventure</button>
    </div>
</template>

<script>
    export default {
        name: "Menuebar"
    }
</script>

<style scoped>
.menuebar-container{
    display: flex;
    flex-flow: row nowrap;
    justify-content: stretch;
    align-items: center;
}

.import{
    width: 100%;
    height: 100%;
}
</style>