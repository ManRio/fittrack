import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private apiUrl = 'https://exercisedb.p.rapidapi.com/exercises';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '16bd963c99msh631aa8b79a35ba3p167442jsn69883f84ef06',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  });

  constructor(private http: HttpClient) {}

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl, { headers: this.headers });
  }

  getBodyParts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/bodyPartList`, {
      headers: this.headers,
    });
  }

  getByBodyPart(part: string): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/bodyPart/${part}`, {
      headers: this.headers,
    });
  }
}
