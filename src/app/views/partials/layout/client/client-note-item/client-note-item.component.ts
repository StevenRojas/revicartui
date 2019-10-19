// Angular
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
import {ClientNoteList} from '../../../../../core/admin/_models/client-note-list';
import {ClientNote} from '../../../../../core/admin/_models/client-note';

export interface Widget4Data {
	icon?: string;
	pic?: string;
	title?: string;
	username?: string;
	desc?: string;
	url?: string;
}

@Component({
	selector: 'kt-client-note-item',
	templateUrl: './client-note-item.component.html',
	styleUrls: ['./client-note-item.component.scss']
})
export class ClientNoteItemComponent implements OnInit {
	// Public properties
	@Input() data: ClientNote[];

	@ContentChild('actionTemplate', {static: true}) actionTemplate: TemplateRef<any>;

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private layoutConfigService: LayoutConfigService) {
	}
	/**
	 * On init
	 */
	ngOnInit() { }
}
