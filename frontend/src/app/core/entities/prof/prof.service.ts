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

  public create(teacher) {
    return this.httpClient.post(`${environment.api}/teachers`, teacher);
  }

  public login(teacher) {
    return this.httpClient.post(`${environment.api}/login`, teacher);
  }
}
