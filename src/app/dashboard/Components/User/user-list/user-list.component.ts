import { Component, OnInit } from '@angular/core';
import { UserSchema } from 'src/app/Interfaces/user-schema';
import { AdminService } from 'src/app/Services/admin.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users!:UserSchema[]

  constructor(private service:AdminService,private taost:ToastService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe((users:UserSchema[])=>{
      this.users = users
    })


  }
  deleteUser(user:UserSchema){
    this.taost.show(`Are You Sure you want to delete ${user.username}?`,true,"#fff")
    this.taost.getConfirmSubject().subscribe((val)=>{
      if(val){
        this.service.deleteUser(user._id)
        window.location.reload()
      }
      else{
        return
      }

    })
    //
  }

}
