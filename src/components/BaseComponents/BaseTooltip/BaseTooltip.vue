<template>
    <div class="tooltip">
        <slot></slot>
        <span class="tooltiptext">{{ text }}</span>
    </div>
</template>
<script>
export default {
    props: {
        text: String
    }
}
</script>
<style>
.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: fit-content;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>