export function ColoredPeg({color=""}) {
    switch (color) {
        case "R":
            return <span>🔴</span>;
        case "G":
            return <span>🟢</span>;
        case "B":
            return <span>🔵</span>;
        case "Y":
            return <span>🟡</span>;
        case "O":
            return <span>🟠</span>;
        case "P":
            return <span>🟣</span>;
        default:
            return <span>??</span>;
    }
}