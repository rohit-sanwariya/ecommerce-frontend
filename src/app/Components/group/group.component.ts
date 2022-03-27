import { Component, OnInit } from '@angular/core';
import { CategorySchema } from 'src/app/Interfaces/category-schema';
import { Categories } from 'src/assets/Category.data';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groups:CategorySchema[] = Categories
  constructor() { }

  ngOnInit(): void {
  }

}
