import {Logic, originData, TimeKeys} from "./find_equal_item";

const main = new Logic();
console.time(TimeKeys.runResult);
main.runResult(originData.ArrayAlarm);
console.timeEnd(TimeKeys.runResult);
