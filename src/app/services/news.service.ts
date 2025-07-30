import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private apiKey = 'c2a6318468363929f1d1c5b8a9721cdd';
  private apiUrl = `http://api.mediastack.com/v1/news?access_key=${this.apiKey}&languages=en&categories=health&limit=8`;

  constructor(private http: HttpClient) {}

  getHealthNews(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
