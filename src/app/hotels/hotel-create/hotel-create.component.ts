import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { gamesService } from '../games.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { game } from '../game.model';
import { ReviewsService } from 'src/app/reviews/review.service';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class gameCreateComponent implements OnInit {
  enteredTitle = '';
  enteredArtist = '';
  private mode = 'create';
  private gameId: string;
  game: game;
  gameTitleInput = '';

  constructor(public gamesService: gamesService, public reviewsService: ReviewsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('gameId')) {
        this.mode = 'addingReview';
        this.gameId = paramMap.get('gameId');
        this.game = this.gamesService.getgame(this.gameId);
      } else {
        this.mode = 'list';
      }
    });
  }

  onAddgame(form: NgForm) {
    if (form.invalid) { return; }
    // form values passed to addgame function in service ts file
    this.gamesService.addgame(form.value.title,
       form.value.artist,
        form.value.album,
        form.value.year,
        form.value.comment,
        form.value.track,
        form.value.genre,
        form.value.header,
        form.value.zeroByte
        );
    form.resetForm();
  }

  onAddReview(form: NgForm) {
    if (form.invalid) { return; }
    this.reviewsService.addReview(form.value.rating, form.value.review, form.value.title, form.value.username);
    form.resetForm();
  }
}

