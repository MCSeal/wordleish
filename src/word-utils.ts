import wordBank from './word-bank.json'


export default function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    
    return wordBank[randomIndex]
    
    
}