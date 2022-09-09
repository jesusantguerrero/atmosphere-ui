export const AtSideNavProps = {
    menu: {
        type: Array,
        required: true,
    },
    itemClass: {
        type: String,
    },
    itemActiveClass: {
        type: String,
    },
    iconClass: {
        type: String,
    },
    itemProperty: {
        type: String,
        default: "items",
    },
};
