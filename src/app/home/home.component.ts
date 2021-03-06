import { Component, OnInit ,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {CorporateLeaderService} from '../services/corporate-leader.service';
import { flyInOut  ,expand} from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

    dish:Dish;
    promotion:Promotion;
    leader :Leader;
    errMsgDish :string;
    errMsgPromotion :string;
    errMsgLeader :string;
    constructor(private dishService:DishService , 
                private promotionService:PromotionService,
                private leaderService : CorporateLeaderService,
                @Inject('BaseURL') private BaseUrl)  {

                 }

  ngOnInit() {
   this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish,
                                                errMsgDish => this.errMsgDish = <any>errMsgDish);
  //  console.log("dish is"+this.dish.id);
    this.promotionService.getFeaturedPromotion().subscribe(promotion =>this.promotion = promotion,
                                                           errMsgPromotion => this.errMsgPromotion = <any>errMsgPromotion);
    this.leaderService.getFeaturedCorporateLeader().subscribe(leader => this.leader = leader,
                                                               errMsgLeader => this.errMsgLeader = <any>errMsgLeader);
  }

}
