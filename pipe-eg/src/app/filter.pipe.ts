import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter',
    pure: false //this makes sure that pipe gets refreshed on every change.
})
export class FilterPipe implements PipeTransform{
    transform(value: any, filterString: any, propName: any ) {
        if(value.length === 0 || filterString === '') {
            return value;
        }
        const resultArray = [];
        for(const item of value) {
            if(item[propName] === filterString) {
                resultArray.push(item);
            }  
        }
        return resultArray;
    }
}