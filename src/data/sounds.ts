import { Howl } from "howler";

export const navSound = new Howl({
  src: ["/sound/ps2-navigation.mp3"],
  volume: 0.5,
});

export const crtSound = new Howl({
    src: ["/sound/crt-sound.mp3"],
    volume: 0.2,
    loop: true
})

export const selectSound = new Howl({
    src: ["/sound/ps2-select-sound.mp3"],
    volume: 0.5
})