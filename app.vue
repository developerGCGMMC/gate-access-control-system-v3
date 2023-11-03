<script setup>
    const { fetchAccessCodes } = useAccessCodeStore();

    // ! ---------------------------------------------------------------------------------------------------

    fetchAccessCodes();

    // ! ---------------------------------------------------------------------------------------------------

    onMounted(async() => {
        setInterval(() => {
            fetchAccessCodes();
        }, (1000 * 60) * 15);
    });

    onUnmounted(() => {
    });
</script>
<template>
    <div data-theme="aqua">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
