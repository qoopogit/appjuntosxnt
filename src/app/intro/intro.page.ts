import { Component, OnInit } from '@angular/core';

import axios from 'axios';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  splash1   = '';
  splash2  = '';
  splash3   = '';
  constructor() {


    axios.get('https://uploads.bayoli.com/cmsjuntas.php?pagina=intro')
    .then(res => {

      this.splash1 =res.data.splash1;
      this.splash2 =res.data.splash2;
      this.splash3 =res.data.splash3;
      console.log(res.data.splash1, );


    })
    .catch(err => {
      console.log(err);
    });

  }

  ngOnInit() {
  }

}
