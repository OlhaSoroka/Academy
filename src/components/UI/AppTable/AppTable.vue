<template>

    <table class="
    rounded-2xl	
    shadow-lg
    w-11/12
    table-auto
    m-auto">
        <thead class="table-head">
            <slot name="table-head"></slot>
        </thead>

        <tbody class="table-tbody">
            <slot name="table-body"></slot>
        </tbody>


    </table>

</template>

<script>
export default {

}
</script>

<style  lang="scss">
</style>