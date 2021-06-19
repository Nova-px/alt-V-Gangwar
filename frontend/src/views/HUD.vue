<template>
    <div class="hud">
        <div class="item">
            <v-icon center>mdi-crosshairs-gps</v-icon>
            <p>{{ kills }}</p>
        </div>
        <div class="item">
            <v-icon>mdi-emoticon-dead</v-icon>
            <p>{{ deaths }}</p>
        </div>
        <div class="item">
            <v-icon>mdi-lightning-bolt</v-icon>
            <p>{{ kd }} KD</p>
        </div>
        <div class="item" v-bind:style="getStyleForXP()">
            <v-icon>mdi-check</v-icon>
            <p>{{ level }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "HUD",
    props: {
        data: {
            type: Object,
            required: false
        },
    },
    data() {
        return {
            kills: 1250,
            deaths: 1500,
            level: 15,

            xp: 50,
            maxXP: 200
        }
    },

    computed: {
        kd() {
            if(this.kills > 0 && this.deaths > 0) return (this.kills / this.deaths).toFixed(2);
            else return (0).toFixed(2);
        },
        xpPercent() {
            return ((this.xp / this.maxXP) * 100).toFixed(0);
        }
    },

    methods: {
        getStyleForXP() {
            const firstValue = this.xpPercent > 0;
            const secondValue = this.xpPercent > 0 ? this.xpPercent - 100 : 100;

            return {
                background: `repeating-linear-gradient(#191919, #191919 ${firstValue}%, #17e32f ${secondValue}%, #17e32f 100%)`
            }
        }
    },

    mounted() {
        this.$alt.on("HUD::Update", (kills, deaths, level, xp, maxXP) => {
            this.kills = kills;
            this.deaths = deaths;
            this.level = level;

            this.xp = xp;
            this.maxXP = maxXP;
        });
        
        const data = this.data;
        if(data) {
            this.kills = data.kills;
            this.deaths = data.deaths;
            this.level = data.level;

            this.xp = data.xp;
            this.maxXP = data.maxXP;

            console.log(this.xpPercent);
        }
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

.hud {
    position: absolute;
    display: flex;

    flex-flow: column wrap;

    top: 45%;
    left: 1vw;

    width: 18vw;
}

.item {
    width: 50px;
    height: 50px;
    
    margin-bottom: 1vh;
    font-family: 'Inter', sans-serif;

    background: rgb(25, 25, 25);
    border: 2px solid rgb(35, 35, 35);

    box-shadow: 0 0 2px 0 black;
    border-radius: 100px;
}

.item .v-icon.v-icon::before {
    position: absolute;

    left: 10.7px;
    top: -3px;
}

.item p {
    position: relative;
    color: white;

    top: -14px;
    left: 65px;

    width: 150px;
}
</style>