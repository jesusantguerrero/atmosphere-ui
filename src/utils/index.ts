export function isSamePath(
    url = "",
    currentPath: string,
    matches: string[] = []
) {
    try {
        const linkUrl = url?.replace("", "");
        if (url === "/") {
            return currentPath && ["/", "/dashboard"].includes(currentPath);
        }
        return (
            linkUrl === currentPath ||
            matches.includes(currentPath) ||
            matchesWithAny(matches, currentPath)
        );
    } catch (err) {
        console.log(err);
    }
}

function matchesWithAny(routes: string[], currentPath: string) {
    return new RegExp(routes.join("|")).test(currentPath);
}
