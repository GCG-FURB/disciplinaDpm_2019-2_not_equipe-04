import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private key = 'br.com.mercadinho';

  private keys = {
    nomeAluno: `${this.key}.nome.aluno`,
    token: `${this.key}.token`
  }

  constructor() { }

  public setAluno(aluno) {
    const alunoStr = JSON.stringify(aluno);
    localStorage.setItem(this.keys.nomeAluno, alunoStr);
  }

  public getAluno() {
    const aluno = localStorage.getItem(this.keys.nomeAluno);
    return aluno ? JSON.parse(aluno) : null;
  }
  
  public setToken(token) {
    const tokenStr = JSON.stringify(token);
    localStorage.setItem(this.keys.token, tokenStr);
  }

  public getToken() {
    const token = localStorage.getItem(this.keys.token);
    return token ? JSON.parse(token) : null;
  }
}
