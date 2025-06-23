export function ColoredPeg({color=""}) {
    switch (color) {
        case "R":
            return <>🔴</>;
        case "G":
            return <>🟢</>;
        case "B":
            return <>🔵</>;
        case "Y":
            return <>🟡</>;
        case "O":
            return <>🟠</>;
        case "P":
            return <>🟣</>;
        default:
            return <>??</>;
    }
}