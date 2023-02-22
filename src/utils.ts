export function createElement(tag: string, classes: string, innerText: string) {
    const newElem = document.createElement(tag)
    const style = classes.split(' ')

    newElem.classList.add(...style)
    newElem.textContent = innerText

    return newElem
}
