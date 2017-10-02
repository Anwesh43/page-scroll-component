const defaultColor = '#DD2C00'
class PageScrollBlockComponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({mode:'open'})
        this.list = []
        this.blocks = []
        this.animated = false
        this.createNavBar()
        this.createNavBarList()
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
    changeActiveLink(index) {
        const border = this.list[this.activetab].style.borderBottom
        this.list[this.activetab].style.borderBottom = ''
        this.list[index].style.borderBottom = border
        this.activetab = index
    }
    connectedCallback() {
        window.onscroll = (event) => {
            const y = window.scrollY + window.innerHeight/3
            this.blocks.forEach((block,index)=>{
                if(index != this.activetab) {
                    if(y >= block.offsetTop && y < block.offsetTop + block.offsetHeight) {
                        this.changeActiveLink(index)
                    }
                }
            })
        }
        this.list.forEach((li,index)=>{
            li.onclick = (li) => {
                this.startScrollAnimation(index)
            }
        })
    }
    createDivBlock(block) {
        const div = document.createElement('div')
        div.style.background = block.getAttribute('color') || defaultColor
        div.style.width = '100%'
        div.style.height = '100%'
        div.innerHTML = block.innerHTML
        this.shadow.appendChild(div)
        this.blocks.push(div)
        this.addNavLink(block.getAttribute('tag'))
    }
    createNavBar() {
        this.activetab = 0
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
        this.navUL.style.paddingRight = '20%'
        this.bar.appendChild(this.navUL)
    }
    addNavLink(tag) {
        const li = document.createElement('li')
        li.style.display = 'inline'
        li.style.marginRight = '12%'
        li.style.fontSize = window.innerHeight/20
        const span = document.createElement('span')
        span.innerHTML = tag
        span.style.float = 'top'
        li.appendChild(span)
        this.navUL.appendChild(li)
        if(this.list.length == this.activetab) {
            li.style.borderBottom = '3px solid black'
        }
        this.list.push(li)
    }
    startScrollAnimation(index) {
        if(!this.animated) {
            this.animated = true
            const k = 10
            const scroll_speed = (this.blocks[index].offsetTop-window.scrollY)/k
            console.log(scroll_speed)
            var n = 0
            const interval = setInterval(()=>{
                console.log(n)
                window.scrollBy(0,scroll_speed)
                console.log(window.scrollY)
                n++
                if(n == k) {
                    clearInterval(interval)
                    this.animated = false
                }
            },75)
        }
    }
}
customElements.define('page-scroll-block',PageScrollBlockComponent)
