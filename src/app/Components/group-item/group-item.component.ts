import { Component, Input, OnInit } from '@angular/core';
import { CategorySchema } from 'src/app/Interfaces/category-schema';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent implements OnInit {
  @Input() itemContent!:any
  constructor() { }

  ngOnInit(): void {
  }

}
