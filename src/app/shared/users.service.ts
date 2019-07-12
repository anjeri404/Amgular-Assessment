import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const dbUrl:string = 'https://jsonplaceholder.typicode.com/users'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  fetchedUsers: any;

  constructor(private http:HttpClient) {
    
  }
fetchdata(){
  return this.http.get('https://jsonplaceholder.typicode.com/users')
}
saveData(Users){
  this.fetchedUsers= Users;
}

Deletedata(index: number) {
  this.fetchedUsers.splice(index, 1);
  this.http.delete('https://jsonplaceholder.typicode.com/users/'+index)
  .subscribe ((res: Response)=> {
    console.log(res);
  })
}
getContactList() {
  return this.fetchedUsers;
}

addContact(newContact){
  return this.http.post('https://jsonplaceholder.typicode.com/users', newContact)
}

addContactList(newContact: any){
  this.fetchedUsers.push(newContact);
}
getContact(index: number) {
  return this.fetchedUsers[index];
}

updateContact(id, newContact){
  return this.http.put('https://jsonplaceholder.typicode.com/users/'+id, newContact)
}
updateContactList(index, newContact){
  this.fetchedUsers[index] = newContact;
}
}
