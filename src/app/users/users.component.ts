import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../shared/users.model';
import { FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../shared/users.service';
import { runInNewContext } from 'vm';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnChanges {
  usersForm: FormGroup;
  updateMode: boolean = false;

  @Input() updateContactIndex: number = 0; 

  constructor( private UserService: UserService) { }
  
  ngOnInit() {
    this.initForm();
  }

  id : number=0;

onSubmit(){
  if (this.updateMode === false){
    let index: number=0;
      //console.log("here");
      let contactList = this.UserService.getContactList();
      index = parseInt(contactList[contactList.length - 1].id) +1;
      
      //console.log(index);
      const newContact= new User(
        index,
        this.usersForm.value['name'],
        this.usersForm.value['email'],
        this.usersForm.value['phone']
        )
        this.UserService.addContact(newContact)
        .subscribe((res: Response)=>{
        //console.log(newContact);
    })
    this.UserService.addContactList(newContact);
    //console.log(this.UserService.getContactList);
    }
  else {
    const id = parseInt(this.UserService.getContact(this.updateContactIndex).id) 
    const newContact = new User(id, 
      this.usersForm.value['name'],
      this.usersForm.value['email'],
      this.usersForm.value['phone']
    );
    this.UserService.updateContact(id, newContact);
    this.UserService.updateContactList(this.updateContactIndex, newContact);
    this.usersForm.reset();
    this.updateMode = false;
  }
}

initForm() {
  this.usersForm = new FormGroup({
    'name': new FormControl(null, Validators.required),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'phone': new FormControl(null, [Validators.required, Validators.pattern(/[1-9]+[0-9]*$/)])
  })
}
ngOnChanges() {
  //console.log(this.updateContactIndex);
   if (this.usersForm != null){
    const contact = this.UserService.getContact(this.updateContactIndex);
   
    this.usersForm.setValue({
      name : contact.name,
      email : contact.email,
      phone : contact.phone,
    })
    this.updateMode = true;
   }
}

}