import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CompanyNoteService} from '../../../../../../core/admin';
import {CompanyNoteList} from '../../../../../../core/admin/_models/company-note-list';

@Component({
  selector: 'kt-company-note',
  templateUrl: './company-note.component.html',
  styleUrls: ['./company-note.component.scss']
})
export class CompanyNoteComponent implements OnInit, OnChanges {
  @Input() companyId: number | string;
  public notes: CompanyNoteList;
  public pageSize = 5;
  public sort = '-id';
  public page = 1;
  public comment: string;
  constructor(
    private companyNoteService: CompanyNoteService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.companyId) {
      this.loadNotes();
    }
  }

  loadNotes() {
    this.companyNoteService.allById(this.companyId, this.page.toString(), this.pageSize.toString(), this.sort).subscribe(
      (companyNoteList: CompanyNoteList) => {
        this.notes = companyNoteList;
      }
    );
  }

  changePage(paginator: any) {
    this.page = +paginator.pageIndex + 1;
    this.loadNotes();
  }

  addComment() {
    if(this.comment) {
      this.companyNoteService.addComment(this.companyId, 1, this.comment).subscribe(
        (comment) => {
          this.page = 1;
          this.comment = null;
          this.loadNotes();
        }
      );
    }
  }
}
