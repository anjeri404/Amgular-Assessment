import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../shared/users.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewContactComponent implements OnInit {

  index: number;
  contactList = [];
  contact: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private UserService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = parseInt(params['id']);
      // console.log(this.index);
      this.contact = this.UserService.getContact(this.index);
      
    })
  }

  onBack() {
    this.router.navigate(['/'], {relativeTo: this.route});
  }

}