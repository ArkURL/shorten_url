<script setup lang="ts">
import VerticalTextBoard from "./components/VerticalTextBoard.vue"
// import Loading from "vue-loading-overlay"
// import "vue-loading-overlay/dist/css/index.css"
import { useLoading } from "vue-loading-overlay"

import { ref } from "vue"
import axios from "@/utils/axios"
import { debounce_leading } from "@/utils/tools"
import type { ShortenURLResponseData } from "./d.ts/shortenURLApiResponse.d.ts"

const inputValue = ref("")
const outputURL = ref("")
const isAlertShouldRender = ref(false)
const isQueried = ref(false)

const $loading = useLoading({
    isFullPage: true,
    canCancel: false,
    active: true,
})

const outputURLRef = ref()
const hiddenTextArea = ref()

function hintUserAboutDeviceWidth() {
    const deviceWidth = window.screen.width
    // 如果设备宽度大于800就不用弹提示了
    const shouldHint = deviceWidth > 800 ? false : true
    isAlertShouldRender.value = shouldHint
}

function handleCopyURL() {
    hiddenTextArea.value.value = outputURLRef.value.textContent
    hiddenTextArea.value.select()
    // 较老的复制api，新的只能在https环境或开发环境中使用
    const copied = document.execCommand("copy")
    console.log(copied)
}

// 如果访问设备宽度小于阈值，则弹出消息提示框
hintUserAboutDeviceWidth()

async function handleKeyDown() {
    const loader = $loading.show({})
    // request to shrink url server response
    const response = (await axios.post("/api/v1/shorten", {
        url: inputValue.value,
    })) as ShortenURLResponseData
    loader.hide()
    const { result_url } = response
    outputURL.value = result_url
    isQueried.value = true
}

const debouncedHandleKeyDown = debounce_leading(handleKeyDown)
</script>

<template>
    <el-alert title="检测到设备可能为手机竖屏状态" description="请使用PC或将手机调整至横屏状态以获得更佳体验" type="warning" show-icon v-if="isAlertShouldRender" />
    <div class="origin-link-board">
        <VerticalTextBoard>
            <template v-slot:first-line> https://www.youtube.com/watch?v=V_Kr9OSfDeU </template>
            <template v-slot:second-line> https://ngabbs.com/read.php?tid=37962117 </template>
            <template v-slot:third-line> https://www.bilibili.com/video/BV1bP411b7Bb/?spm_id_from=333.1007.tianma.2-1-3.click&vd_source=83b1b75a767195eaeed574a382784b83 </template>
            <template v-slot:fourth-line> https://developer.mozilla.org/zh-CN/docs/Web/CSS/user-select </template>
            <template v-slot:fifth-line> https://cn.vuejs.org/guide/components/slots.html </template>
            <template v-slot:sixth-line> https://ngabbs.com/read.php?tid=37967148 </template>
        </VerticalTextBoard>
    </div>

    <div class="center-board">
        <div class="title-board">
            <div class="anchor-left">
                <div class="left-part-text">缩短链接</div>
            </div>
            <div class="anchor-right">
                <div class="right-part-text">
                    <span class="divide-signal">/</span>
                    <span class="en-text">Shorten Your URL</span>
                </div>
            </div>
        </div>
        <div class="input-area">
            <input type="text" class="input" placeholder="input here..." @keydown.enter="debouncedHandleKeyDown" v-model.trim="inputValue" />
        </div>
        <div class="output-board">
            <span class="output-text" ref="outputURLRef">
                {{ outputURL }}
            </span>
            <el-popover ref="popover" placement="right" trigger="click" content="Copied!" effect="dark" :auto-close="1000" popper-class="clipboard-popper">
                <template #reference>
                    <el-icon v-show="isQueried" @click="handleCopyURL"><CopyDocument /></el-icon>
                </template>
            </el-popover>
            <textarea name="" id="" cols="30" rows="10" class="hidden-textarea" ref="hiddenTextArea"></textarea>
        </div>
    </div>

    <div class="shorten-link-board">
        <VerticalTextBoard>
            <template v-slot:first-line> https://cleanuri.com/eA8Q9Q</template>
            <template v-slot:second-line> https://cleanuri.com/2QY2zM </template>
            <template v-slot:third-line> https://cleanuri.com/RpDn7W</template>
            <template v-slot:fourth-line> https://cleanuri.com/XymO09 </template>
            <template v-slot:fifth-line> https://cleanuri.com/njJn7w </template>
            <template v-slot:sixth-line> https://cleanuri.com/rPvwlg</template>
        </VerticalTextBoard>
    </div>
</template>

<style scoped lang="scss">
.el-alert {
    position: fixed;
    top: 20px;
    left: 5vw;
    width: 90vw;
    z-index: 1;
}
.origin-link-board {
    position: absolute;
    left: 40px;
    height: 100%;
}
.shorten-link-board {
    position: absolute;
    right: 250px;
    height: 100%;
}

.center-board {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > .title-board {
        font-size: x-large;
        font-weight: bold;
        font-family: "Noto Sans SC", sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        > .anchor-left,
        > .anchor-right {
            position: relative;
            text-align: center;
        }
        > .anchor-left {
            flex-shrink: 0;
            flex-basis: 100px;
            > .left-part-text {
                transition: transform 1s ease-in-out;
            }
        }
        > .anchor-right {
            flex-shrink: 0;
            flex-basis: 200px;
            height: 30px;
            line-height: 30px;
            white-space: nowrap;
            background-color: rgba($color: #ffffff, $alpha: 0.8);
            // background-color: yellow;
            > .right-part-text {
                padding-left: 3px;
                background-color: rgba($color: #ffffff, $alpha: 1);
                position: absolute;
                transition: transform 1s ease-in-out;
                > .en-text {
                    position: absolute;
                    background-color: rgba($color: #ffffff, $alpha: 1);
                }
            }
        }
        &:hover {
            > .anchor-left {
                > .left-part-text {
                    transform: translateX(32px);
                }
            }
            > .anchor-right {
                > .right-part-text {
                    transform: translateX(-42px);
                }
            }
        }
    }
    > .input-area {
        margin-top: 30px;
        width: 100%;
        > .input {
            width: 100%;
            // border: 0;
            border-radius: 12px;
            border: none;
            height: 32px;
            background-color: #d9d9d9;
            outline: none;
            // text-indent: 10px;
            font-family: "Noto Sans SC", sans-serif;
            color: rgba($color: #000000, $alpha: 0.8);
            padding-right: 10px;
            padding-left: 10px;
        }
    }
    > .output-board {
        font-size: larger;
        font-weight: bold;
        font-family: "Noto Sans SC", sans-serif;
        color: rgba($color: #000000, $alpha: 0.8);
        // align-self: flex-start;
        height: 30px;
        width: 100%;
        border-bottom: 1px solid black;
        margin-top: 20px;
        margin-left: 16px;
        // position: relative;
        &::before {
            content: "短链接：";
            position: absolute;
            left: -72px;
        }
        > .output-text {
            // text-decoration: underline;
            width: 100%;
        }

        > .el-icon {
            position: absolute;
            right: -8px;
            cursor: pointer;
            border: 1px solid rgba($color: #000000, $alpha: 0.8);
            padding: 3px;
            border-radius: 5px;
            bottom: 10px;
            transition: background-color 0.1s ease-in-out;
            &:hover {
                background-color: #d9d9d9;
            }
        }
        > .hidden-textarea {
            width: 0;
            height: 0;
            position: absolute;
            opacity: 0;
            cursor: default;
            user-select: none;
        }
    }
}

.clipboard-popper {
    max-width: 50px;
}
</style>
./d.ts/shortenURLApiResponse
