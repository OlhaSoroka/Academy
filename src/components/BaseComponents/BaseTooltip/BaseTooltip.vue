<template>
  <div class="tooltip">
    <slot />
    <p class="tooltiptext">
      {{ text }}
    </p>
  </div>
</template>
<script>
export default {
    props: {
        text: [String, Number]
    }
}
</script>
<style>

.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    background-color: black;
    color: #fff;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    word-wrap: break-word;
    z-index: 1;
    max-width: 500px;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>