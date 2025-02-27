import music from '../services/music';
import type { Music } from '../types';

export class PlayList {
  playlist: Music[] = [];

  constructor() {}
  getPlayList(): Music[] {
    return this.playlist;
  }

  getNextMusic(): Music {
    const now = this.playlist.find(music => music.isPlayed);
    if (!now) {
      this.playlist[0].isPlayed = true;
      return this.playlist[0];
    }

    const next = this.playlist[(this.playlist.indexOf(now) + 1) % this.playlist.length];
    now.isPlayed = false;
    next.isPlayed = true;

    return next;
  }

  getCurrentMusic(): Music {
    const current = this.playlist.find(music => music.isPlayed)!;
    return current;
  }

  addMusics(musics: Music[]): void {
    this.playlist.push(...musics);
  }

  getMusicByName(musicName: string) {
    return this.playlist.find(val => val.name === musicName);
  }

  setIsPlayed(state: boolean, musicName: string) {
    const music: Music = this.getMusicByName(musicName)!;
    music.isPlayed = state;
  }

  removeMusicByMID(MID: number): void {
    this.playlist = this.playlist.filter(music => music.MID !== MID);
  }

  isExist(musics: Music[]): boolean {
    const MIDs = this.playlist.map(music => music.MID);
    return musics.find(music => MIDs.includes(music.MID)) ? true : false;
  }
}
