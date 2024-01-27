import album from "../album"
import React from "react"
import { useState, useRef } from 'react'
import Slider from '../Player/silder/slide'
import $ from 'jquery'  
import ControlPanel from '../Player/controls/ControlPanel'
import './home.scss'
const Main = () => {

    // -------------------javascript part----------------
    var index
    const newarr = album
    $(".scroll").on("click", "main", function () {
        var id = $(this).text()
        index = newarr.findIndex(object => {
            return object.Name === id
        })

        var song = newarr[index].song
        const audio = document.getElementById("audio")
        audio.src = song
        const insert = document.getElementById(newarr[index].icon_id)
        insert.href = audio.src
    })
    // ---------------------------end--------------
    const [percentage, setPercentage] = useState(0)
    const [searchTerm, setsearchTerm] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const audioRef = useRef()

    const onChange = (e) => {
        const audio = audioRef.current
        audio.currentTime = (audio.duration / 100) * e.target.value
        setPercentage(e.target.value)
    }

    const getCurrDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime

        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
    }

    const play = () => {
        const audio = audioRef.current
        audio.volume = 0.3


        if (!isPlaying) {
            setIsPlaying(true)
            audio.play()

        }

        if (isPlaying) {
            setIsPlaying(false)
            audio.pause()
        }

    }
    return (
        <>
            <div className="header-main-container">
                <div className="song-list">
                    <h1> Listern songs and play to enjoy</h1>
                    <div className="search"><input type="text" placeholder="search..." onChange={event => { setsearchTerm(event.target.value) }} /></div>
                    <div className="scroll">
                        {
                            newarr.filter((val) => {
                                if (searchTerm === "") {
                                    return val
                                } else if (val.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return val
                                }
                            }).map((current, value) =>
                                <div key={value} className="song-item">
                                    <main onClick={play} className={current.class}>{current.Name}</main>
                                    <span className='timestamp'>
                                        <a id={current.icon_id} download={current.Name}><i className="fa-sharp fa-solid fa-circle-down"></i></a>
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="song-img">
                    <img src="https://c.tenor.com/Sb0yPHMgNaUAAAAi/music-disc.gif" alt="no img" />
                </div>
            </div>

            {/* ----------------------------------------- Player ---------------------------------- */}

            <div className='app-container fixed-bottom'>
                <marquee behavior="scroll" direction="right"><h1 id='song-name'>Song</h1></marquee>
                <Slider percentage={percentage} onChange={onChange} />
                <audio
                    id="audio"
                    ref={audioRef}
                    onTimeUpdate={getCurrDuration}
                    onLoadedData={(e) => {
                        setDuration(e.currentTarget.duration.toFixed(2))
                    }}


                ></audio>
                <ControlPanel
                    play={play}
                    isPlaying={isPlaying}
                    duration={duration}
                    currentTime={currentTime}
                />
            </div>
        </>
    )
}

export default Main
