import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-bernoulli',
    templateUrl: './bernoulli.component.html',
    styleUrls: ['./bernoulli.component.scss']
})
export class BernoulliComponent implements OnInit {

    openTank = 'A';
    pipeLength: number;
    density: number;
    viscosity: number;
    diameter: number;
    flow: number;
    rugosity: number;
    pipePreasure: number;

    static colebrook(re, ed) {
        let fi = .02;
        let fo = .01;
        let f: number;
        while (Math.abs(fi - fo) >= 1e-10) {
            const p1 = 2.51 / (re * Math.sqrt(fi)) + ed / 3.7;
            const p2 = .86 * Math.log(p1);
            f = Math.pow(1. / p2, 2);
            fo = fi;
            fi = f;
        }

        return f;
    }

    constructor() {
    }

    ngOnInit() {

    }

    velocity(): number {
        return 4 * this.flow / (Math.PI * Math.pow(this.diameter, 2));
    }

    reNumber() {
        return (this.velocity() * this.density * this.diameter) / this.viscosity;
    }

    relativeRugosity() {
        return this.rugosity / this.diameter;
    }

    frictionFactor() {
        const Re = this.reNumber();
        const eD = this.relativeRugosity();
        if (Re <= 0) {
            return;
        }

        if (eD < 0) {
            return;
        }
        return BernoulliComponent.colebrook(Re, eD);
    }

    lossCargo() {
        return (this.frictionFactor() * Math.pow(this.velocity(), 2) * this.pipeLength) / (2 * 9.81 * this.diameter);
    }

    heightB() {
        const atmosphere = 101325;
        const pA = (this.openTank === 'A') ? this.pipePreasure : atmosphere;
        const pB = (this.openTank === 'B') ? this.pipePreasure : atmosphere;
        return ((pA - pB) / (this.density * 9.81)) - this.lossCargo();
    }

}
