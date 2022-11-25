import React from 'react'
import "./Game.scss"
import { useState, useEffect, useRef } from 'react'
import randomWords from 'random-words'
import { Player } from '@lottiefiles/react-lottie-player';

const NUMB_OF_WORDS = 50
const SECONDS = 60
// let error = 0

let keys = document.querySelectorAll('.keyboard_wrapper .key .row span'),
    keyPad = document.querySelector('.keyboard_wrapper .key'),
    display = document.querySelector('.keyboard_wrapper .display');
if (keys && keyPad && display) {
    let capsLockMode = false;
    keys.forEach(key => {
        key.addEventListener('click', function () {
            // console.log(this.innerText);
            if (this.classList.contains('caps')) {
                this.classList.toggle('active');
                keyPad.classList.toggle('uppercase');
                capsLockMode ? capsLockMode = false : capsLockMode = true;
            }
            else if (this.classList.contains('backspace')) {
                let str = display.innerText;
                display.innerText = str.substring(0, (str.length - 1));
            } else {
                if (capsLockMode) {
                    display.innerText += this.dataset.key.toUpperCase();
                } else {
                    display.innerText += this.dataset.key.toLowerCase();
                }
            }
        });
    });
}



const Game = () => {

    const [words, setWords] = useState([])
    const [countDown, setCountDown] = useState(SECONDS)
    const [currInput, setCurrInput] = useState("")
    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [currCharIndex, setCurrCharIndex] = useState(-1)
    const [currChar, setCurrChar] = useState("")
    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const [status, setStatus] = useState("waiting")
    const textInput = useRef(null)
    const [errorr, setErrorr] = useState(0)
    useEffect(() => {
        setWords(generateWords())
    }, [])

    useEffect(() => {
        if (status === 'started') {
            textInput.current.focus()
        }
    }, [status])

    function generateWords() {
        return new Array(NUMB_OF_WORDS).fill(null).map(() => randomWords())
    }
    function hidde() {
        document.querySelector('.btn_begin').style.display = 'none';
    }
    function start() {

        if (status === 'finished') {
            setWords(generateWords())
            setCurrWordIndex(0)
            setCorrect(0)
            setIncorrect(0)
            setErrorr(0)
            setCurrCharIndex(-1)
            setCurrChar("")
        }

        if (status !== 'started') {
            document.querySelector('.contain_anime').style.display = 'none';


            setStatus('started')
            let interval = setInterval(() => {
                setCountDown((prevCountdown) => {
                    if (prevCountdown === 0) {
                        clearInterval(interval)
                        setStatus('finished')
                        setCurrInput("")
                        return SECONDS
                    } else {
                        return prevCountdown - 1
                    }
                })
            }, 1000)
        }

    }

    function handleKeyDown({ keyCode, key }) {
        // space bar 
        if (keyCode === 32) {
            checkMatch()
            setCurrInput("")
            setCurrWordIndex(currWordIndex + 1)
            setCurrCharIndex(-1)
            // backspace
        } else if (keyCode === 8) {
            setCurrCharIndex(currCharIndex - 1)
            setCurrChar("")
        } else {
            setCurrCharIndex(currCharIndex + 1)
            setCurrChar(key)
        }
    }

    function checkMatch() {
        const wordToCompare = words[currWordIndex]
        const doesItMatch = wordToCompare === currInput.trim()
        if (doesItMatch) {
            setCorrect(correct + 1)
        } else {
            setIncorrect(incorrect + 1)
        }
    }

    function getCharClass(wordIdx, charIdx, char) {
        if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
            if (char === currChar) {
                return 'has-background-success'
            } else {
                // setErrorr(errorr + 1)
                return 'has-background-danger'
            }
        } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
            return 'has-background-danger'
        } else {
            return ''
        }
    }



    return (
        <div className="contain_all_game">


            <div className='contain_game'>

                <div className="contain_anime">
                    {/* <lottie-player id="firstLottie" src="https://assets3.lottiefiles.com/packages/lf20_O2ci8jA9QF.json" style="width:400px; height: 400px;">"></lottie-player> */}

                    {/* <iframe src="https://embed.lottiefiles.com/animation/125746"></iframe> */}
                    <Player src='https://assets3.lottiefiles.com/packages/lf20_O2ci8jA9QF.json' loop autoplay style={{ height: '400px', width: '300px' }} />

                    <div className='btn_anime'><button className='btn_begin' onClick={start}  >commencer</button></div>
                </div>

                {status === 'finished' && (
                    <div className="contain_finish">
                        <Player src='https://assets6.lottiefiles.com/packages/lf20_xldzoar8.json' autoplay style={{ height: '400px', width: '300px' }} />
                        <div class="content">
                            <ul class="result">
                                <li class="time">
                                    <p>Time</p>
                                    <span>{countDown}</span>
                                </li>
                                <li class="errors">
                                    <p>Errors</p>
                                    <span>{incorrect}</span>
                                </li>
                                <li class="wpm">
                                    <p>WPM</p>
                                    <span>{correct}</span>
                                </li>
                                <li class="cpm">
                                    <p>ACC</p>
                                    <span>  {Math.round((correct / (correct + incorrect)) * 100)}% </span>
                                </li>
                            </ul>
                        </div>

                    </div>

                )}


                {status === 'started' && (

                    <div class="keyboard_wrapper">
                        <div class="display">




                            <>
                                {words.map((word, i) => (
                                    <span key={i}>
                                        <span>
                                            {word.split("").map((char, idx) => (
                                                <span className={getCharClass(i, idx, char)} key={idx}>{char}</span>
                                            ))}
                                        </span>
                                        <span> </span>
                                    </span>
                                ))}
                            </>





                        </div>




                        <div class="key">
                            <div class="row">
                                <span data-key="q">q</span>
                                <span data-key="w">w</span>
                                <span data-key="e">e</span>
                                <span data-key="r">r</span>
                                <span data-key="t">t</span>
                                <span data-key="y">y</span>
                                <span data-key="u">u</span>
                                <span data-key="i">i</span>
                                <span data-key="o">o</span>
                                <span data-key="p">p</span>
                            </div>
                            <div class="row">
                                <span data-key="a">a</span>
                                <span data-key="s">s</span>
                                <span data-key="d">d</span>
                                <span data-key="f">f</span>
                                <span data-key="g">g</span>
                                <span data-key="h">h</span>
                                <span data-key="j">j</span>
                                <span data-key="k">k</span>
                                <span data-key="l">l</span>
                            </div>
                            <div class="row">
                                <span class="caps">caps</span>
                                <span data-key="z">z</span>
                                <span data-key="x">x</span>
                                <span data-key="c">c</span>
                                <span data-key="v">v</span>
                                <span data-key="b">b</span>
                                <span data-key="n">n</span>
                                <span data-key="m">m</span>
                                <span class="backspace">
                                    <i class="fa fa-angle-left"></i>
                                    <i class="fa fa-close"></i>
                                </span>
                            </div>
                            <div class="row">
                                <span class="space" data-key=" ">
                                    Space
                                </span>
                            </div>
                        </div>





                    </div>
                )}

                <input ref={textInput} disabled={status !== "started"} type="text" className="input " onKeyDown={handleKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)} />





            </div>

            {status === 'started' && (


                <div className='contain_Rightbar'>

                    <div class="content">
                        <ul class="result">
                            <li class="time">
                                <p>Time</p>
                                <span>{countDown}</span>
                            </li>
                            <li class="errors">
                                <p>Errors</p>
                                <span>{incorrect}</span>
                            </li>
                            <li class="wpm">
                                <p>WPM</p>
                                <span>{correct}</span>
                            </li>
                            <li class="cpm">
                                <p>ACC</p>
                                <span>  {Math.round((correct / (correct + incorrect)) * 100)}% </span>
                            </li>
                        </ul>
                    </div>


                </div>
            )}



        </div>

    )
}

export default Game