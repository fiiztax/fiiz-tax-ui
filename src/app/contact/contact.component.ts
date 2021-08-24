import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public pageData;

  constructor(router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.pageData = <any>this.route.snapshot.data;
    console.log(this.pageData.title)
  }

}
