import { game } from './game.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class gamesService {
  private games: game[] = [];
  private gamesUpdated = new Subject<game[]>();

constructor(private http: HttpClient, private router: Router) {}

  // retrieves all games from database
  getgames() {
    this.http.get<{message: string, games: any}>(
      'http://localhost:3000/api/games'
      )
      .pipe(map((gameData) => {
        return gameData.games.map(game => {
          return {
            id: game._id,
            title: game.title,
            header: game.header,
            artist: game.artist,
            album: game.album,
            zeroByte: game.zeroByte,
            year: game.year,
            comment: game.comment,
            track: game.track,
            genre: game.genre
          };
        });
      }))
    .subscribe((updatedgames) => {
      this.games = updatedgames;
      this.gamesUpdated.next([...this.games]);
    });
  }

  getgameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  // returns game based on id from the front-end collection of games
  getgame(id: string) {
    return {...this.games.find(s => s.id === id)};
  }

  // adds a game to the db by sending a request
  addgame(title: string, artist: string, album: string, year: string,
          comment: string, track: string, genre: string, header: string, zeroByte: string) {

    const game: game = {id: null, title: title, artist: artist, album: album, year: year, comment: comment,
       track: track, genre: genre, header: header, zeroByte: zeroByte};
       
    this.http.post<{message: string, gameId: string}>('http://localhost:3000/api/games', game)
    .subscribe((responseData) => {
      const id = responseData.gameId;
      game.id = id;
      this.games.push(game);
      this.gamesUpdated.next([...this.games]);
    });
  }

  // to remove game
  deletegame(gameId: string) {
    this.http.delete('http://localhost:3000/api/games/' + gameId)
    .subscribe(() => {
      const updatedgames = this.games.filter(game => game.id !== gameId);
      this.games = updatedgames;
      this.gamesUpdated.next([...this.games]);
    });
  }
}
