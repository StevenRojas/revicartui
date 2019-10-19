// Angular
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Layout
import { LayoutConfigService } from '../../../../../core/_base/layout';
import {CompanyNote} from '../../../../../core/admin/_models/company-note';

export interface Widget4Data {
	icon?: string;
	pic?: string;
	title?: string;
	username?: string;
	desc?: string;
	url?: string;
}

@Component({
	selector: 'kt-company-note-item',
	templateUrl: './company-note-item.component.html',
	styleUrls: ['./company-note-item.component.scss']
})
export class CompanyNoteItemComponent implements OnInit {
	// Public properties
	@Input() data: CompanyNote[];

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
