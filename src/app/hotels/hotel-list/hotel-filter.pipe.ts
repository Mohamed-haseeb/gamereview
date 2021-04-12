import { PipeTransform, Pipe } from '@angular/core';
import { of } from 'rxjs';
import { game } from '../game.model';

@Pipe({
  name: 'gameFilter'
})
export class gameFilterPipe implements PipeTransform {
  // first arg might need to be the string of games
  transform(games: game[], searchTerm: any): game[] {
    if (!games || !searchTerm) {
      return games;
    }
    // filters applied to the game array
    return games.filter(game =>
       (game.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (game.artist.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (game.album.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (game.comment.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (game.genre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)  ||
        (game.header.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (game.year.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
  }
}
