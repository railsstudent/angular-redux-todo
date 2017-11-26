import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditModalComponent implements OnInit {

  @Input()
  todo: string = '';
  @Input()
  title: string = '';

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
