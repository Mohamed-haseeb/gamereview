import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewsService } from '../review.service';
import { gameCreateComponent } from '../../games/game-create/game-create.component';
import { game } from '../../games/game.model';
import { gamesService } from '../../games/games.service';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})

export class ReviewCreateComponent {

  constructor(public reviewsService: ReviewsService, public gamesService: gamesService) {}
  game: game;


  onAddReview(form: NgForm) {
    if (form.invalid) { return; }
    this.reviewsService.addReview(form.value.rating, form.value.review, form.value.title, form.value.username);
    form.resetForm();
  }
}
