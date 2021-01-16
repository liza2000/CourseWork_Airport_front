import {Component, OnInit} from '@angular/core';
import {ControlEntity} from '../model/control-entity.enum';
import {WorkAtTime} from '../model/work-at-time';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentControl: ControlEntity = ControlEntity.none;

  constructor() { }

  ngOnInit() {
  }

}
