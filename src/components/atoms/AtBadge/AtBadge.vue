<template>
<span class="px-4 py-1 text-sm font-bold rounded-full" :class="colorClasses">
    <slot></slot>
</span>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            validator(value) {
                const classes = ['primary', 'secondary', 'danger', 'sucess', 'warning', 'gray'];
                return classes.includes(value);
            }
        }
    },

    computed: {
        colorClasses() {
            const colors = {
                primary: 'bg-blue-100 text-blue-400',
                secondary: 'bg-gray-100 text-gray-400',
                danger: 'bg-red-100 text-red-400',
                warning: 'bg-yellow-100 text-yellow-400',
                success: 'bg-green-100 text-green-400'
            }
            return colors[this.type] ?? colors.primary;
        }
    }
}
</script>
