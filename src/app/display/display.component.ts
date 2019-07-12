import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../shared/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  private Users: any;

@Output() updateContactIndex = new EventEmitter();

  constructor(private UserService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.UserService.fetchdata().subscribe((res: Response)=>{
      this.UserService.saveData(res);
      this.Users=res;
        });
  }
  onDeleteContact(index: number) {
    this.UserService.Deletedata(index);
  }
  onViewContact(index: number) {
    this.router.navigate([index], {relativeTo: this.route});
  }

  onUpdate(index: number){
    this.updateContactIndex.emit(index);
  }
}
