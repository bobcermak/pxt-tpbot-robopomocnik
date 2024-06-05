//SONGS 

//start song

function startSong(): void {
    music.play(music.tonePlayable(659, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(698, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(659, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    music.play(music.tonePlayable(784, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    basic.pause(20)
    music.play(music.tonePlayable(784, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
}