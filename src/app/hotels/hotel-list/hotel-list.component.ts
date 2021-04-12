import { Component, OnInit, OnDestroy } from '@angular/core';
import { game } from '../game.model';
import { gamesService } from '../games.service';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/reviews/review.model';
import { ReviewsService } from 'src/app/reviews/review.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class gameListComponent implements OnInit, OnDestroy {
 searchWord: string;
 games: game[] = [];
 reviews: Review[] = [];
 userIsAuthenticated = false;
 adminIsAuthenticated = false;
 public reviewsSub: Subscription;
 private gamesSub: Subscription;
 private authStatusSub: Subscription;
 private adminAuthStatusSub: Subscription;
 // panelOpenState: boolean = false;

 constructor(public gamesService: gamesService, public reviewsService: ReviewsService, private authService: AuthService) {}

 ngOnInit() {
   // fetching all games upon page init
   this.gamesService.getgames();
   this.gamesSub = this.gamesService.getgameUpdateListener()
  .subscribe((games: game[]) => {
    this.games = games;
  });
  // fetching all existing reviews upon page init
   this.reviewsService.getReviews();
   this.reviewsSub = this.reviewsService.getReviewUpdateListener()
 .subscribe((reviews: Review[]) => {
   this.reviews = reviews;
 });
  // getting user authorization level upon page init
   this.userIsAuthenticated = this.authService.getIsAuth();
   this.authStatusSub = this.authService.getAuthStatusListener()
   .subscribe(isAuthenticated => {
    this.userIsAuthenticated = isAuthenticated;
   });

   this.adminIsAuthenticated = this.authService.getIsAdminAuth();
   this.adminAuthStatusSub = this.authService.getAdminAuthStatusListener()
   .subscribe(isAuthenticated => {
    this.adminIsAuthenticated = isAuthenticated;
   });
 }

 onDelete(gameId: string) {
  this.gamesService.deletegame(gameId);
 }

 ngOnDestroy() {
   this.gamesSub.unsubscribe();
   this.authStatusSub.unsubscribe();
 }
}
