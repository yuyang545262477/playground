import {TimeKeys} from "./time-keys";

export class Logic {
    /*1.在数组对象中,寻找字段Name一样的对象,
    * 2.在返回的对象中, 判断包含相同的Name,将名称添加上UUId
    * */
    public runResult(originData) {
        const distData = this.renderDistData(originData);
        console.timeEnd(TimeKeys.renderDist);
        // return distData;
        console.log(distData);
    }

    private renderDistData(ArrayAlarm: ({ AVGBadTime: number; CompletionRate: string; AVGStopTime: number; BadAlarmTime: number; PlanPlayTime: number; TotalPlayTime: number; UUID: number; StopAlarmTime: number; StopAlarmCount: number; BadAlarmCount: number; Name: string } | { AVGBadTime: number; CompletionRate: number; AVGStopTime: number; BadAlarmTime: number; PlanPlayTime: number; TotalPlayTime: number; UUID: number; StopAlarmTime: number; StopAlarmCount: number; BadAlarmCount: number; Name: string })[]) {
        /*生成map对象*/
        console.time(TimeKeys.maps);
        let maps: Map<string, Set<number>> = new Map(); //key:发射机名称,value:对应的序列号
        ArrayAlarm.forEach(({Name, UUID}, index) => {
            if (!maps.has(Name)) {
                maps.set(Name, new Set<number>().add(index));
            } else {
                const sets = maps.get(Name);
                maps.set(Name, sets.add(index));
            }
        });
        console.timeEnd(TimeKeys.maps);
        /*寻找出,包含序列号,大于1的,发射机名称*/
        console.time(TimeKeys.findKeys);
        const keys: string[] = Array.from(maps.keys()).filter((key) => maps.get(key).size > 1);
        console.timeEnd(TimeKeys.findKeys);
        /*把key作为集,判断包含,添加id,在用户名*/
        console.time(TimeKeys.renderDist);
        return ArrayAlarm.map(({Name, UUID, CompletionRate}) => ({
            name: keys.includes(Name) ? `${Name}-${UUID}` : Name,
            value: CompletionRate,
        }));
    }
}
