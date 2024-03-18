import { Component, OnInit } from '@angular/core';
import { Tea } from '../../models/tea.models';
import { TeaService } from '../../data/teas.service';

@Component({
  selector: 'app-tea-list',
  templateUrl: './tea-list.component.html',
  styleUrls: ['./tea-list.component.scss']
})
export class TeaListComponent implements OnInit {

  teas: Tea[] = [];
  newTea: Tea = { id: '', name: '', description: '', userId: '' };
  showForm: boolean = false;
  editingTea: Tea | null = null;

  constructor(private teaService: TeaService) { }

  ngOnInit(): void {
    this.getTeas();
  }

  getTeas(): void {
    this.teaService.getTeas()
      .subscribe((teas: Tea[]) => this.teas = teas);
  }

  deleteTea(teaId: string): void {
    this.teaService.deleteTea(teaId)
      .subscribe(() => {
        this.getTeas();
      });
  }

  addTea(): void {
    this.teaService.addTea(this.newTea)
      .subscribe(() => {
        this.getTeas();
        this.newTea = { id: '', name: '', description: '', userId: '' };
        this.showForm = false;
      });
  }

  showAddForm(): void {
    this.showForm = true;
  }

  hideAddForm(): void {
    this.showForm = false;
    this.newTea = { id: '', name: '', description: '', userId: '' };
    this.editingTea = null;
  }

  editTea(tea: Tea): void {
    this.editingTea = { ...tea };
  }

  cancelEdit(): void {
    this.editingTea = null;
  }

  saveEditedTea(): void {
    if (this.editingTea) {
      this.teaService.updateTea(this.editingTea)
        .subscribe(() => {
          this.getTeas();
          this.editingTea = null;
        });
    }
  }
}
