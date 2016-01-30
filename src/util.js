export function getOffset(element) {
    const top 
    = Math.round(element.getBoundingClientRect().top + document.body.scrollTop);

    const left
    = Math.round(element.getBoundingClientRect().left + document.body.scrollLeft);

    return {
        top,
        left
    };
}