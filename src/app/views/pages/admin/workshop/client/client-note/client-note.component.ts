import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClientNoteService} from '../../../../../../core/admin/_services/client-note.service';
import {ClientNoteList} from '../../../../../../core/admin/_models/client-note-list';

@Component({
  selector: 'kt-client-note',
  templateUrl: './client-note.component.html',
  styleUrls: ['./client-note.component.scss']
})
export class ClientNoteComponent implements OnInit, OnChanges {
  @Input() clientId: number | string;
  public notes: ClientNoteList;
  public pageSize = 5;
  public sort = '-id';
  public page = 1;
  public comment: string;
  constructor(
    private clientNoteService: ClientNoteService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.clientId) {
      this.loadNotes();
    }
  }

  loadNotes() {
    this.clientNoteService.allById(this.clientId, this.page.toString(), this.pageSize.toString(), this.sort).subscribe(
      (clientNoteList: ClientNoteList) => {
        this.notes = clientNoteList;
      }
    );
  }

  changePage(paginator: any) {
    this.page = +paginator.pageIndex + 1;
    this.loadNotes();
  }

  addComment() {
    if(this.comment) {
      this.clientNoteService.addComment(this.clientId, 1, this.comment).subscribe(
        (comment) => {
          this.page = 1;
          this.comment = null;
          this.loadNotes();
        }
      );
    }
  }
}
