import Element from "./js/Element";
import Game from "./js/Game";
import { useEventListener } from "./js/hooks/useEventListener";
import { getLocalStorageValue } from "./js/utils";

const lizard = new Element('lizard', ['paper', 'spock'])
const spock = new Element('spock', ['scissors', 'rock'])
const rock = new Element('rock', ['lizard', 'scissors'])
const paper = new Element('paper', ['rock', 'spock'])
const scissors = new Element('scissors', ['paper', 'lizard'])

// const rps = [rock, paper, scissors]

// const rpsls = [rock, paper, scissors, lizard, spock]

// Design arrangement
const rpsls = [scissors, spock, paper, lizard, rock]

const container = document.querySelector('.tiles_container')

// const game = new Game(container, rps)
const game = new Game({ 
    container, 
    results_con: document.getElementById('eval-con'),
    result_statement: document.getElementById('result'),
    comChoiceCon: document.getElementById('com_choice'),
    p1ChoiceCon: document.getElementById('player_choice')
}, rpsls)


window.onload = function(){
    game.init()
    
    const scoreCon = document.getElementById('score')
    scoreCon.innerText = getLocalStorageValue('score', 0)
    useEventListener('localstorage', (e) => {
        if (typeof e.detail !== 'number') return
        scoreCon.innerText = e.detail
    }, window)

    useEventListener('click', () => {
        document.querySelector('dialog').showModal()
    }, document.getElementById('rules-modal-toggler'))

    useEventListener('click', () => {
        document.querySelector('dialog').close()
    }, document.querySelector('.modal-close-btn'))

    useEventListener('click', () => {
        game.init()
    }, document.getElementById('play_again_btn'))
}