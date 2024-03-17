import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tea } from '../../models/tea.models';
import { TeaService } from '../../data/teas.service';

@Component({
  selector: 'app-tea-detail',
  templateUrl: './tea-detail.component.html',
  styleUrls: ['./tea-detail.component.scss']
})
export class TeaDetailComponent implements OnInit {
  tea: Tea | undefined;

  constructor(
    private route: ActivatedRoute,
    private teaService: TeaService
  ) { }

  ngOnInit(): void {
    this.getTea();
  }

  getTea(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.teaService.getTea(id)
        .subscribe(tea => this.tea = tea);
    }
  }
}

