import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewContactComponent } from './view/view.component';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [

    {path: '', component: MainComponent, pathMatch: 'full'} ,
    {path: ':id', component: ViewContactComponent},
    {path: '**', component: ErrorComponent},
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}