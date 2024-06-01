//SONGS

//end song
function endSong(): void {
    for (let i = 0; i < 2; i++) {
        for (let x = 0; x < 2; x++) {
            basic.pause(750)
            music.play(music.tonePlayable(587, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(494, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
            basic.pause(25)
            music.play(music.tonePlayable(494, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        }
        basic.pause(500)
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        basic.pause(25)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        basic.pause(10)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        basic.pause(250)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(740, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        basic.pause(10)
        music.play(music.tonePlayable(554, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        basic.pause(25)
        music.play(music.tonePlayable(554, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        basic.pause(250)
        for (let y = 0; y < 2; y++) {
            basic.pause(750)
            music.play(music.tonePlayable(587, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(494, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
            basic.pause(25)
            music.play(music.tonePlayable(494, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        }
        basic.pause(500)
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(740, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        basic.pause(25)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        basic.pause(10)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        basic.pause(500)
        music.play(music.tonePlayable(740, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        basic.pause(25)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
        basic.pause(10)
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    }
}
