import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'aluno', loadChildren: './aluno/aluno.module#AlunoPageModule' },
  { path: 'cart', loadChildren: './aluno/cart/cart.module#CartPageModule' },
  { path: 'teacher', loadChildren: './teacher/teacher.module#TeacherPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'create-account', loadChildren: './create-account/create-account.module#CreateAccountPageModule' },
  { path: 'teacher/produto', loadChildren: './teacher/produto/produto.module#ProdutoPageModule' },
  { path: 'teacher/:produto/question', loadChildren: './teacher/question/question.module#QuestionPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
