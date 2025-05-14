<template>
    <div class="skeleton-card" :style="image ? `--height-card: 250px` : '--height-card: max-content'">
        <div v-if="image" class="skeleton-header"></div>
        <div class="skeleton-body">
            <div class="skeleton-line title"></div>
            <div class="skeleton-line subtitle"></div>
            <div class="skeleton-line text"></div>
            <div class="skeleton-line text short"></div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    image: {
        type: Boolean,
        default: true,
    }
})
</script>

<style lang="scss" scoped>
@use 'sass:color';

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.skeleton-card {
    background: #d7d7d7;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: 0 0 30px 5px color.adjust($secondary, $alpha: -0.9);
    display: flex;
    flex-direction: column;
    height: var(--height-card);
    width: 100%;

    .skeleton-header {
        flex: 0 0 50%;
        background: #999999;
        position: relative;
        overflow: hidden;

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.6) 50%,
                    rgba(255, 255, 255, 0) 100%);
            animation: shimmer 1.2s infinite;
        }
    }

    .skeleton-body {
        padding: 1rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .skeleton-line {
            background: #999999;
            border-radius: $border-radius;
            position: relative;
            overflow: hidden;

            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.634) 50%,
                        rgba(255, 255, 255, 0) 100%);
                animation: shimmer 1.2s infinite;
            }

            &.title {
                height: 1.2rem;
                width: 60%;
            }

            &.subtitle {
                height: 1rem;
                width: 40%;
            }

            &.text {
                height: 0.8rem;
                width: 100%;
            }

            &.short {
                width: 75%;
            }
        }
    }
}
</style>