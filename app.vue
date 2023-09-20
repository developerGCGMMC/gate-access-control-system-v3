<script setup>
    const { $socket } = useNuxtApp();

    const { fetchAccessCodes } = useAccessCodeStore();

    // ! ---------------------------------------------------------------------------------------------------

    fetchAccessCodes();

    onMounted(async() => {
        $socket.emit('broadcastTest', 'Hello World!');

        $socket.on('broadcastingTest', (data) => {
            console.info("Received Data: "+data);
        });
    });
</script>
<template>
    <div data-theme="aqua">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
