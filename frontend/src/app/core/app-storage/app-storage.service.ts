import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private key = 'br.com.mercadinho';

  private keys = {
    nomeAluno: `${this.key}.nome.aluno`
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
}
