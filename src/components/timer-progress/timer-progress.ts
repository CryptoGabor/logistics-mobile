import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

export interface CountdownTimer {
    seconds: number;
    secondsRemaining: number;
    runTimer: boolean;
    hasStarted: boolean;
    hasFinished: boolean;
    displayTime: string;
}

@Component({
    selector: 'timer-progress',
    templateUrl: 'timer-progress.html'
})
export class TimerProgress {

    @Input() timeInSeconds: number;

    @Output() accepted = new EventEmitter();
    @Output() refused = new EventEmitter();

    timer: CountdownTimer;
    private increment;
    private transform;
    private percent;
    private fixTransform;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.initTimer();
    }

    hasFinished() {
        return this.timer.hasFinished;
    }

    initProgressBar() {
        this.percent = 100;
        this.increment = 180 / 100;
        const progress = 'rotate(' + this.increment * this.percent + 'deg)';
        this.transform = this.sanitizer.bypassSecurityTrustStyle(progress);
        this.fixTransform = this.sanitizer.bypassSecurityTrustStyle(progress);
    }

    initTimer() {
        this.initProgressBar();
        if (!this.timeInSeconds) {
            this.timeInSeconds = 0;
        }

        this.timer = <CountdownTimer>{
            seconds: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };

        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    }

    startTimer() {
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        this.timerTick();
    }

    pauseTimer() {
        this.timer.runTimer = false;
    }

    resumeTimer() {
        this.startTimer();
    }

    timerTick() {
        setTimeout(() => {
            if (!this.timer.runTimer) {
                return;
            }
            this.timer.secondsRemaining--;
            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            this.percent = this.timer.secondsRemaining / this.timer.seconds * 100;
            this.increment = 180 / 100;
            const progress = 'rotate(' + this.increment * this.percent + 'deg)';
            this.transform = this.sanitizer.bypassSecurityTrustStyle(progress);
            this.fixTransform = this.sanitizer.bypassSecurityTrustStyle(progress);
            if (this.timer.secondsRemaining > 0) {
                this.timerTick();
            } else {
                this.timer.hasFinished = true;
            }
        }, 1000);
    }

    getSecondsAsDigitalClock(inputSeconds: number) {
        const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        const hours = Math.floor(secNum / 3600);
        const minutes = Math.floor((secNum - (hours * 3600)) / 60);
        const seconds = secNum - (hours * 3600) - (minutes * 60);
        let minutesString = '';
        let secondsString = '';
        minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
        secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
        return minutesString + ':' + secondsString;
    }

    acceptedAction() {
        this.accepted.emit();
    }

    refusedAction() {
        this.refused.emit();
    }

}
