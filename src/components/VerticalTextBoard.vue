<template>
<ul class="text-board">
    <li><span><slot name="first-line"></slot></span></li>
    <li><span><slot name="second-line"></slot></span></li>
    <li><span><slot name="third-line"></slot></span></li>
    <li><span><slot name="fourth-line"></slot></span></li>
    <li><span><slot name="fifth-line"></slot></span></li>
    <li><span><slot name="sixth-line"></slot></span></li>
</ul>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.text-board {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: medium;
    color: rgba($color: #6D5E5E, $alpha: 0.8);
    text-orientation: upright;
    writing-mode: vertical-lr;
    flex-wrap: wrap;
    font-family: 'Roboto', sans-serif;
    height: 100%;
    overflow: hidden;
    cursor: default;
    user-select: none;
    > li {
        margin-left: 15px;
        width: 16px;
        height: 100vh;
        white-space: nowrap;
        position: relative;
        > span {
            position: absolute;
            top: 100vh;
        }
    }
    > :nth-child(1) {
        > span {
            animation: moveUp 20s linear infinite;
        }
    }
    > :nth-child(2) {
        font-size: larger;
        > span {
            animation: moveUp 18s linear infinite;
        }
    }
    > :nth-child(3) {
        > span {
            animation: moveUp 19s linear infinite;
        }
    }
    > :nth-child(4) {
        > span {
            animation: moveUp 20s linear infinite;
        }
    }
    > :nth-child(5) {
        > span {
            animation: moveUp 21s linear infinite;
        }
    }
    > :nth-child(6) {
        > span {
            animation: moveUp 18s linear infinite;
        }
    }
    
}

@keyframes moveUp {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-200vh);
    }
}
</style>