import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
 templateUrl:'./home.component.html',
 //Investigate why external css does not want to work
 styles:[`
 a:link {
  color: blue;
  background-color: transparent;
  text-decoration: none;
}
a:visited {
  color: pink;
  background-color: transparent;
  text-decoration: none;
}
a:hover {
  color: red;
  background-color: transparent;
  text-decoration: underline;
}
a:active {
  color: yellow;
  background-color: transparent;
  text-decoration: underline;
}`]
})

export class HomeComponent {

}
