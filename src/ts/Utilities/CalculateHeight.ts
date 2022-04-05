export default function CalculateHeight(element: HTMLElement) {
    if (!element) {
        return -1;
    }
    let clone = element.cloneNode(true) as HTMLElement;
    clone.style.opacity = "0";
    clone.style.pointerEvents = "none";
    clone.style.transition = "0";
    clone.style.height = "auto";
    document.body.append(clone);
    let height = clone.offsetHeight;
    clone.remove();
    console.log(height);
    return height;
}
