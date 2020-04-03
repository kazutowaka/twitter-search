import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  @Input() query: string;
  @Input() pages: number;
  @Input() page: number;

  get pageArray(): number[] {
    return [...Array(this.pages).keys()].map(i => ++i);
  }

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
