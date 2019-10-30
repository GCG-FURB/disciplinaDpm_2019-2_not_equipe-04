import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  private key = 'br.com.mercadinho';

  private keys = {
    nomeAluno: `${this.key}.nome.aluno`,
    teacher: `${this.key}.teacher`,
    cart: `${this.key}.cart`
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

  public setCart(cart) {
    const cartStr = JSON.stringify(cart);
    localStorage.setItem(this.keys.cart, cartStr);
  }

  public getCart() {
    const cart = localStorage.getItem(this.keys.cart);
    return cart ? JSON.parse(cart) : null;
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
