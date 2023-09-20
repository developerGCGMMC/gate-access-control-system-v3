export default defineNuxtRouteMiddleware((to, from) => {
    // console.log(to.params.location);

    if(to.params.location == 'main' || to.params.location == 'opd' || to.params.location == 'back') {
        return true;
    } else {
        return navigateTo('/');
    }
});