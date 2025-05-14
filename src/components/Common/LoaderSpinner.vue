<template>
    <div class="loader-overlay">
        <div class="spinner"></div>
    </div>
</template>

<style scoped lang="scss">
.loader-overlay {
    position: absolute;
    inset: 0;
    background: rgba(144, 144, 144, 0.6);
    border-radius: $border-radius;
    display: flex;
    justify-content: center;
    z-index: 10;
}

@keyframes spin {
    to {
        transform: rotate(360deg)
    }
}

.spinner {
    margin-top: 20%;
    width: 4rem;
    height: 4rem;
    border: 0.5rem solid rgba(0, 0, 0, 0.1);
    border-top-color: hsla(160, 100%, 37%, 1);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
</style>
