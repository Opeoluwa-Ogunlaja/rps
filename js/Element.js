class Element{
    constructor (name, beats = []){
        this.name = name;
        this.beatsArray = beats;
        this.element = document.createElement('button')
        this.element.classList.add(name)
        this.element.innerHTML = `<img src="images/icon-${this.name}.svg" alt="${this.name} Icon">`
        this.game = null;
        this.disabled = false
    }

    enable = () => {
        this.disabled = false
    }

    disable = () => {
        this.disabled = true
    }

    reset = () => {
        
    }

    render = () => {
        const wrapper = document.createElement('div')
        wrapper.classList.add('tile')
        wrapper.appendChild(this.element)
        this.element.onclick = () => { 
            if (this.disabled) return
            this.game.choose(this.name)
        }

        return wrapper
    }

    beats = (elementName) => {
        if(elementName == this.name) return 'draw'
        return this.beatsArray.includes(elementName)
    }
}

export default Element