import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.scss']
})
export class BoletoComponent implements OnInit {
  public pageData;

  constructor(router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.pageData = <any>this.route.snapshot.data;
    console.log(this.pageData.title)
  }

}
