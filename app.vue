<script setup>
    const { $socket } = useNuxtApp();

    const { fetchAccessCodes } = useAccessCodeStore();

    // ! ---------------------------------------------------------------------------------------------------

    fetchAccessCodes();

    onMounted(async() => {
        setInterval(() => {
            fetchAccessCodes();
        }, (1000 * 60) * 15);

        // ! ---------------------------------------------------------------------------------------------------

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
