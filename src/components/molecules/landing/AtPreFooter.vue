<script setup>
import Wave from "./waves/wave.vue";
import Curve from "./waves/curve.vue";
import NormalWave from "./waves/normal-wave.vue";
defineProps({
    sections: {
        type: Object,
        default: () => {
            return {}
        }
    }
})


</script>

<template>
    <section className="body-font relative px-10 md:px-0">
        <NormalWave />
        <div className="max-w-7xl mx-auto flex flex-col py-8 pt-24 sm:flex-row">
            <div className="w-full mb-10 md:mb-0" v-for="section in sections" :key="section.label">
                <h4 className="font-bold text-left"> {{ section.label }} </h4>
                <ul className="mt-4 text-left">
                    <li v-for="(link, linkName) in section.links" class="text-white"> 
                        <a :href="link">
                            {{ linkName }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

