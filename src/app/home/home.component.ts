import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {

  }
  animationActive: boolean = false;

  pokemongo() {
    this.startAnimation()
    setTimeout(()=> {
      this.router.navigate(['pokemon']);
    },1000);   
  }


  startAnimation() {
    this.animationActive = true;
    setTimeout(() => {
      this.animationActive = false;
    }, 5000); 
  }
}
