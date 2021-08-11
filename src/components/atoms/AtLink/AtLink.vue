<template>
<a class="px-4 py-1 text-sm font-bold rounded-full cursor-pointer" :class="colorClasses">
    <slot></slot>
</a>
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
                primary: 'text-blue-400',
                secondary: 'text-gray-400',
                danger: 'text-red-400',
                warning: 'text-yellow-400',
                success: 'text-green-400'
            }
            return colors[this.type] ?? colors.primary;
        }
    }
}
</script>
