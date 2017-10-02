const defaultColor = '#DD2C00'
class PageScrollBlockComponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode:'open'})
        this.createNavBar()
        this.createBlocksFromChildren()
    }
    createBlocksFromChildren() {
        for(var i=0;i<this.children.length;i++) {
            const child = this.children[i]
            const childTag = child.tagName.toLowerCase()
            if(childTag == 'block') {
                this.createDivBlock(child)
            }
        }
    }
    connectedCallback() {

    }
    createDivBlock(block) {
        const div = document.createElement('div')
        div.style.background = block.getAttribute('color') || defaultColor
        div.style.width = '100%'
        div.style.height = '100%'
        div.innerHTML = block.innerHTML
        this.shadow.appendChild(div)
    }
    createNavBar() {
        this.bar = document.createElement('div')
        this.bar.style.position = 'fixed'
        this.bar.style.background = 'white'
        this.bar.style.width = '100%'
        this.bar.style.height = '10%'
        this.bar.style.top = '0px'
        this.shadow.appendChild(this.bar)
    }
    createNavBarList() {

    }
}
customElements.define('page-scroll-block',PageScrollBlockComponent)
