import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
  }

  book: any = {
    image: 'https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e471eee5e0e0bdd852cf7c49e200008a60dc48d9474&rid=giphy.gif'
  };

  ngOnInit(): void {
    this.apiService.book(parseInt(this.route.snapshot.paramMap.get('id'), 10) || 1).subscribe((book: any) => {
      this.book = book;
    });
  }
}
