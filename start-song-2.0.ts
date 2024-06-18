//SONGS 

//start song

function startSong2(): void {
    music.play(music.tonePlayable(698, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
}