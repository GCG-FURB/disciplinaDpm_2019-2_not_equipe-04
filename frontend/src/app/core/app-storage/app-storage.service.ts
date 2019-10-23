import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private key = 'br.com.mercadinho';

  private keys = {
    nomeAluno: `${this.key}.nome.aluno`,
    teacher: `${this.key}.teacher`
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
  
  public setTeacher(teacher) {
    const teacherStr = JSON.stringify(teacher);
    localStorage.setItem(this.keys.teacher, teacherStr);
  }

  public getTeacher() {
    const teacher = localStorage.getItem(this.keys.teacher);
    return teacher ? JSON.parse(teacher) : null;
  }
}
