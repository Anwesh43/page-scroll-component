const defaultColor = '#DD2C00'
class PageScrollBlockComponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode:'open'})
    }
    connectedCallback() {
        for(var i=0;i<this.children.length;i++) {
            const child = this.children[i]
            const childTag = child.tagName.toLowerCase()
            if(childTag == 'block') {
                this.createDivBlock(child)
            }
        }
    }
    createDivBlock(block) {
        const div = document.createElement('div')
        div.style.background = block.getAttribute('color') || defaultColor
        div.style.width = '100%'
        div.style.height = '100%'
        div.innerHTML = block.innerHTML
        this.shadow.appendChild(div)
    }
}
customElements.define('page-scroll-block',PageScrollBlockComponent)
