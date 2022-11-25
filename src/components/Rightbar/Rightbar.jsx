import React from 'react'
import './Rightbar.scss'

const Rightbar = () => {
  return (
    <div className='contain_Rightbar'>

  <div class="content">
                <ul class="result">
                    <li class="time">
                        <p>Time</p>
                        <span>60s</span>
                    </li>
                    <li class="errors">
                        <p>Errors</p>
                        <span>0</span>
                    </li>
                    <li class="wpm">
                        <p>WPM</p>
                        <span>0</span>
                    </li>
                    <li class="cpm">
                        <p>CPM</p>
                        <span>0</span>
                    </li>
                </ul>
            </div>


    </div>
  )
}

export default Rightbar