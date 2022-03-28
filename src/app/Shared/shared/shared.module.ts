import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/Components/navbar/navbar.component';
import { FooterComponent } from 'src/app/Components/footer/footer.component';
import { AnnouncementComponent } from 'src/app/Components/announcement/announcement.component';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AnnouncementComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AnnouncementComponent
  ],
})
export class SharedModule { }
