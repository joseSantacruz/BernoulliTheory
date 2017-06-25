/* tslint:disable max-line-length */
import {Component, OnInit} from '@angular/core';
import * as _ from 'underscore';

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

    static returnFormat(value: any) {
        if (_.isNaN(value)) {
            return '-';
        }

        return value;
    }

    constructor() {
    }

    ngOnInit() {

    }

    velocity() {
        return BernoulliComponent.returnFormat(4 * this.flow / (Math.PI * Math.pow(this.diameter, 2)));
    }

    reNumber() {
        return BernoulliComponent.returnFormat((this.velocity() * this.density * this.diameter) / this.viscosity);
    }

    relativeRugosity() {
        return BernoulliComponent.returnFormat(this.rugosity / this.diameter);
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
        return BernoulliComponent.returnFormat(BernoulliComponent.colebrook(Re, eD));
    }

    lossCargo() {
        return BernoulliComponent.returnFormat((this.frictionFactor() * Math.pow(this.velocity(), 2) * this.pipeLength) / (2 * 9.81 * this.diameter));
    }

    heightB() {
        const atmosphere = 101325;
        const pA = (this.openTank === 'A') ? this.pipePreasure : atmosphere;
        const pB = (this.openTank === 'B') ? this.pipePreasure : atmosphere;
        return BernoulliComponent.returnFormat(((pA - pB) / (this.density * 9.81)) - this.lossCargo());
    }

    progressValue() {
        let current = 0;

        if (this.velocity() !== '-') {
            current++;
        }

        if (this.reNumber() !== '-') {
            current++;
        }

        if (this.relativeRugosity() !== '-') {
            current++;
        }

        if (this.frictionFactor() !== '-') {
            current++;
        }

        if (this.lossCargo() !== '-') {
            current++;
        }

        if (this.heightB() !== '-') {
            current++;
        }

        return current / 6 * 100;
    }

}
