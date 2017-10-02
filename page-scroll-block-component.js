const defaultColor = '#DD2C00'
class PageScrollBlockComponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode:'open'})
        this.createNavBar()
        this.createBlocksFromChildren()
        this.createNavBarList()
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
        this.navUL = document.createElement('ul')
        this.navUL.style.float = 'right'
        this.navUL.style.paddingRight = '15%'
        this.navUL.innerHTML = `<li style="display:inline;padding-right:10%;font-size:${window.innerHeight/20}">google</li><li style="display:inline;padding-right:10%;font-size:${window.innerHeight/20}">google</li><li style="display:inline;padding-right:10%;font-size:${window.innerHeight/20}">google</li><li style="display:inline;padding-right:10%;font-size:${window.innerHeight/20}">google</li>`
        this.bar.appendChild(this.navUL)
    }
    createList() {

    }
}
customElements.define('page-scroll-block',PageScrollBlockComponent)
