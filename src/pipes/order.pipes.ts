import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "distanceInKms"
})
export class DistanceInKmsPipe implements PipeTransform {

    transform(value: number, ...args: any[]): any {
        return `${(value / 1000).toFixed(2)} Km`;
    }
}