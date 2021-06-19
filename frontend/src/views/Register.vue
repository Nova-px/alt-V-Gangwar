<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col sm="8" lg="6" col="12">
                <v-card elevation="5" sheet>
                    <v-toolbar dense color="primary">
                        <v-toolbar-title>
                            <v-icon left>mdi-login</v-icon>
                            Registrierung
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field prepend-icon="mdi-account" v-model="username" label="Benutzername" required />
                        <v-text-field prepend-icon="mdi-lock" v-model="password" label="Password" type="password" required counter />
                        <v-text-field prepend-icon="mdi-lock" v-model="repeatPassword" label="Password wiederholen" type="password" required counter />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn>
                            <v-icon left>mdi-arrow-left</v-icon>
                            Du hast bereits einen Account?
                        </v-btn>
                        <v-spacer />
                        <v-btn color="success" @click="register()" :loading="loading">
                            <v-icon left>mdi-check</v-icon>
                            Registrieren
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: "Register",
    data() {
        return {
            username: '',
            password: '',
            repeatPassword: '',

            loading: false
        }
    },

    methods: {
        register() {
            this.loading = true;
            this.$alt.emit("Register::Auth", this.username, this.password, this.repeatPassword);
        }
    },

    mounted() {
        this.$alt.on("Register::Response", text => {
            this.loading = false;
            if(text) this.$toast.error(text);
        });
    }
}
</script>