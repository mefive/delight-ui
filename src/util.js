export function getOffset(element) {
    const top 
    = element.getBoundingClientRect().top + document.body.scrollTop;

    const left
    = element.getBoundingClientRect().left + document.body.scrollLeft;

    return {
        top,
        left
    };
}