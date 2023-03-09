import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'searchFilter',
    pure: false
})
export class SearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (!args) {
            return value;
        }
        return value.filter((val: any) => {
            return (
                val.platformName === null ? val.platformName
                    : val.platformName.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                || (val.originalQueryUrl === null ? val.originalQueryUrl
                    : val.originalQueryUrl.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                || (val.qrcQueryUrl === null ? val.qrcQueryUrl
                    : val.qrcQueryUrl.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.generatedQueryId === null ? val.generatedQueryId
                    : val.generatedQueryId.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.isCSLP === null ? val.isCSLP
                    : val.isCSLP.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.powerOn === null ? val.powerOn
                    : val.powerOn.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.preAlpha === null ? val.preAlpha
                    : val.preAlpha.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.alpha === null ? val.alpha
                    : val.alpha.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.poe === null ? val.poe
                    : val.poe.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.beta === null ? val.beta
                    : val.beta.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()))
                ||  (val.pv === null ? val.pv
                        : val.pv.toString().trim().toLowerCase().includes(args.toString().trim().toLowerCase()));    
        });
    }
}