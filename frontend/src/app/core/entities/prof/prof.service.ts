import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor(
    public httpClient: HttpClient
  ) { }

  public create(person) {
    return this.httpClient.post(`${environment.api}/teacher`, person);
  }

  public login(person) {
    return this.httpClient.post(`${environment.api}/login`, person);
  }
}
