import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  user$:Observable<any>
  constructor(private registerService:RegisterService) {
    this.user$ = this.registerService.getCurrentUser()
   }

  ngOnInit(): void {
  }

}
