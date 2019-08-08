<template>
    <div class="menuebar-container">
        <button>new</button>
        <button class="import" @click="$emit('get-test-adventure')">load</button>
        <button>save</button>
        <button>import</button>
        <button>export</button>
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

button{
    height: 100%;
    flex-grow: 1;

    border-style: none;
    outline-style: none;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.5em;
    background-color: steelblue;
}

button:hover{
    background-color: #7eaacd;
}

button:active{
    background-color: #396a93;
}
</style>