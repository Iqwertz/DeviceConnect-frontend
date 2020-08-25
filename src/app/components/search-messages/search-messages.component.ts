import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-messages',
  templateUrl: './search-messages.component.html',
  styleUrls: ['./search-messages.component.scss'],
})
export class SearchMessagesComponent implements OnInit {
  constructor() {}

  searchField: boolean = false;

  faSearch = faSearch;
  ngOnInit(): void {}
}
