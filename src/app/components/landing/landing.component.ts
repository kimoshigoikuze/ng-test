import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
  }

  books: [] = [];
  pagination: any = {};

  ngOnInit(): void {
    this.apiService.books(parseInt(this.route.snapshot.paramMap.get('page'), 10) || 1).subscribe((response: any) => {
      this.pagination = response.pagination;
      this.books = response.books;
    });
  }
}
