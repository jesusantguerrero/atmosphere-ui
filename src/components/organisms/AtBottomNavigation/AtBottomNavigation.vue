<template>
    <div class="w-full border-t-2 h-12 flex">
        <div v-for="item in menuItems">
            <slot :name="item.name">
                <div class="flex items-center justify-center h-full px-2 text-primary">
                    {{ item.label }}
                </div>
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>

interface IMenuItem {
    name: string;
    label: string;
    icon?: string;
    href?: string;
    active: boolean;
} 

const props = defineProps<{ 
    menuItems: IMenuItem[] 
}>()

</script>