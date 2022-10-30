export const CommonInputProps = {
    dataTestid: {
        type: String,
        default: null,
    },
    theme: {
        type: String,
        default: "default",
    },
    modelValue: String,
    disabled: Boolean,
    prefix: String,
    isBorderless: Boolean,
    rounded: Boolean,
};

export function isSamePath(url = "", currentPath) {
    try {
        const linkUrl = url?.replace("", "");
        if (url === "/") {
            return currentPath && ["/", "/dashboard"].includes(currentPath);
        }
        return linkUrl === currentPath.value;
    } catch (err) {
        // eslint-disable-next-line no-debugger
        debugger;
    }
}
