// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt',
        '@nuxtjs/supabase',
        '@nuxtjs/tailwindcss',
        ['@pinia/nuxt', {
            autoImports: ['defineStore', 'definePiniaStore']
        }],
        './modules/socket.js'
    ],
    app: {
        head: {
            title: 'Gate Access Control System v3',
            meta: [
                { name: 'description', content: 'Gov. Celestino Gallares Memorial Medical Center - Gate Access Control System' },
                { property: 'og-title', content: 'Gov. Celestino Gallares Memorial Medical Center - Gate Access Control System' }
            ],
            link: [
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
            ]
        }
    },
    runtimeConfig: {
        NODE_ENV: process.env.NODE_ENV,

        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_KEY: process.env.SUPABASE_KEY,

        public: {
            AVATAR_EMPLOYEES_URL: process.env.AVATAR_EMPLOYEES_URL,
            AVATAR_NO_PICTURE_URL: process.env.AVATAR_NO_PICTURE_URL,
            IMAGE_URL: process.env.IMAGE_URL
        }
    },
    supabase: {
        redirect: false
    },
    devtools: { enabled: false }
})
