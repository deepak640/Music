const Player =  (album)=>{
    return(
        <div className='app-container fixed-bottom'>
                <marquee behavior="scroll" direction="right"><h1 id='song-name'>song</h1></marquee>
                <Slider percentage={percentage} onChange={onChange} />
                <audio
                    ref={audioRef}
                    onTimeUpdate={getCurrDuration}
                    onLoadedData={(e) => {
                        setDuration(e.currentTarget.duration.toFixed(2))
                    }}
                    src={newarr.map((current)=>{
                        
                        return current.song
                    }
                        )}
                ></audio>
                <ControlPanel
                    play={play}
                    isPlaying={isPlaying}
                    duration={duration}
                    currentTime={currentTime}
                />
            </div>
    )
}