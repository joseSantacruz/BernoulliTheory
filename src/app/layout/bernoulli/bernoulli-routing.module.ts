import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BernoulliComponent } from './bernoulli.component';

const routes: Routes = [
    { path: '', component: BernoulliComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BernoulliRoutingModule { }
