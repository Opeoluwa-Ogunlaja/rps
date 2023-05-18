import { setLocalStorageValue } from "./utils";
import { setTab } from "./utils/tabHelpers";

class Game{
    constructor({ container, result_statement, results_con, comChoiceCon, p1ChoiceCon }, elements){
        this.elements = elements
        this.result_statement = result_statement
        this.results_con = results_con
        this.comChoiceCon = comChoiceCon
        this.p1ChoiceCon = p1ChoiceCon

        this.elements.forEach(element => element.game = this)
        this.gameArea = container;
        this.choice = null
        this.computerChoice = null
    }

    getTile =  (name) => {
        return this.elements.find((item) => item.name == name)
    }

    enableAll = () => this.elements.forEach(element => element.enable())

    disableAll = () => this.elements.forEach(element => element.disable())

    showMessage = (message) => {
        let results_con = this.results_con
        let result_statement = this.result_statement
        result_statement.innerText = message;
        results_con.classList.remove('visually-hidden')
    }

    evaluate = () => {
        switch(this.getTile(this.choice).beats(this.computerChoice)){
            case 'draw':
                this.showMessage('It\'s a draw')
                break
            case true: 
                setLocalStorageValue('score', (score) => {
                    return score + 1
                })
                this.p1ChoiceCon.classList.add('winner')
                this.showMessage('You win')
                break;
            case false:
                this.comChoiceCon.classList.add('winner')
                this.showMessage('You Lose');
                break;
        }
    }

    AIPlay = () => {
        const randomIndex = Math.floor(Math.random() * this.elements.length)
        const com_choice = this.elements[randomIndex]
        this.computerChoice = com_choice.name

        const renderCom = () => {
            this.comChoiceCon.insertAdjacentElement('afterbegin', com_choice.render().cloneNode(true))
        }

        setTimeout(() => {
            if (this.choice == null) return
            renderCom();
            setTimeout(this.evaluate, 500)
        }, 2500)
    }

    choose = (name) => {
        this.choice = name

        const choice_elem = this.getTile(name).element.innerHTML

        this.p1ChoiceCon.innerHTML = `<div class="tile"><button class="${this.choice}">` + choice_elem + '</button></div>'
        setTimeout(() => setTab(2), 300)
        this.disableAll()
        this.AIPlay()
    }

    init = () => {
        setTab(1)
        this.choice = null
        this.computerChoice = null
        this.comChoiceCon.innerHTML = ''
        this.p1ChoiceCon.innerHTML = ''
        this.p1ChoiceCon.classList.remove('winner')
        this.comChoiceCon.classList.remove('winner')
        this.results_con.className = 'visually-hidden result'
        this.enableAll()
        this.renderElements()
    }

    renderElements = () => {
        let elements = this.elements.map(element => element.render(this.gameArea))
        this.gameArea.innerHTML = ''
        elements.forEach((element, i) => {
            this.elements[i].reset()
            this.gameArea.appendChild(element)
        })
        
        setTab(1)
    }
}

export default Game