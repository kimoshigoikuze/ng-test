import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  static parseResponse(response: HttpResponse<any>) {
    const header = response.headers.get('Link');
    let pagination = {
      last: null,
      pages: null,
      next: null,
      prev: null,
    };

    if (header.length !== 0) {
      let parts;

      parts = header.split(',');
      parts.forEach(part => {
        const section = part.split(';');
        const url = section[0].split('=').pop().slice(0, -1);
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();
        pagination[name] = url;

        if (pagination.last) {
          pagination.pages = Array(parseInt(pagination.last, 10)).fill(0).map((x, i) => i + 1);
        }
      });
    }
    return {
      books: response.body,
      pagination
    };
  }


  public books(page: number) {
    return this.httpClient.get(`${this.SERVER_URL}/books?_page=${page}`, {observe: 'response'})
      .pipe(
        map(response => ApiService.parseResponse(response))
      );
  }

  public book(id: number) {
    return this.httpClient.get(`${this.SERVER_URL}/books/${id}`);
  }
}
