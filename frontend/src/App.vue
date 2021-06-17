<template>
    <div>
        <v-app dark>
            <HUD v-if="showHUD" />

            <component style="position: absolute;" v-if="window != ''" :is="window" :data="windowArgs" />
        </v-app>
    </div>
</template>

<script>
import Login from './views/Login.vue';
import HUD from './views/HUD.vue';

export default {
    components: {
        Login,
        HUD
    },

    data() {
        return {
            window: 'Login',
            windowArgs: {},

            showHUD: false
        }
    },

    mounted() {
        this.$alt.on("Window::show", (window, data) => {
            this.window = window;
            this.windowArgs = { ...data };
        });

        this.$alt.on("Window::close", () => {
            this.window = "";
            this.windowArgs = {};
        });

        this.$alt.on("Notify", (type, text) => this.$toast(text, { type }));
    }
}
</script>
<style>
html {
    overflow-y: hidden !important;
    user-select: none;
}

* {
    user-select: none;
}

.theme--dark.v-application {
    background: transparent !important;
}

.animated {
    -webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    
    animation: slide 0.5s forwards;
    animation-delay: 2s;
}

@-webkit-keyframes slide {
    100% {
        left: 0;
    }
}

@keyframes slide {
    100% {
        left: 0;
    }
}
</style>