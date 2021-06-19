<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col sm="8" lg="6" col="12">
                <v-card elevation="5" sheet>
                    <v-toolbar dense color="primary">
                        <v-toolbar-title>
                            <v-icon left>mdi-login</v-icon>
                            Anmeldung
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field prepend-icon="mdi-account" v-model="username" label="Benutzername" required />
                        <v-text-field ref="passwordInput" prepend-icon="mdi-lock" v-model="password" label="Password" type="password" required counter />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="switchToRegister()">
                            <v-icon left>mdi-arrow-left</v-icon>
                            Account erstellen
                        </v-btn>
                        <v-spacer />
                        <v-btn color="success" @click="login()" :loading="loading">
                            <v-icon left>mdi-check</v-icon>
                            Anmelden
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: "Login",
    props: {
        data: {
            type: Object,
            required: false
        },
    },
    data() {
        return {
            username: '',
            password: '',

            loading: false
        }
    },

    methods: {
        login() {
            this.loading = true;
            this.$alt.emit("Login::Auth", this.username, this.password);
        },
        switchToRegister() {
            this.$emit("showWindow", "Register", {});
            this.$emit("closeWindow", "Login");
        }
    },

    mounted() {
        this.$alt.on("Login::Response", text => {
            this.loading = false;
            this.$toast.error(text);
        });

        this.$alt.on("Login::SetUsername", username => {
            this.username = username;
            this.$refs.passwordInput.focus();
        });

        if(this.data && this.data.username) this.username = this.data.username;
    }
}
</script>