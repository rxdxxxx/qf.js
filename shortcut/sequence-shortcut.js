import Updater from "../updater/updater";
import DelayAction from "../action/delay";
import EventAction from "../action/event";
import SequenceNode from "../node/sequence";
import PromiseAction from "../action/promise";
import CustomAction from "../action/custom";


export default class SequenceShortcut {

  sequenceNode: SequenceNode;

  updater: Updater;

  constructor() {
    this.sequenceNode = new SequenceNode();

    this.updater = new Updater(this.sequenceNode);
  }

  start() {
    this.updater.start();
    return this;
  }

  add(action) {
    this.sequenceNode.add(action);
  }

  stop() {
    this.updater.stop()
    return this;
  }


  delay(seconds, callback) {
    this.sequenceNode.add(new DelayAction(seconds));
    this.sequenceNode.add(new EventAction(callback));
    return this;
  }

  promise(promiseGetter: ()=>Promise) {
    this.sequenceNode.add(new PromiseAction(promiseGetter));

    return this;
  }

  custom(onBegan: ()=>void, onExecute: ()=>boolean, onFinish: ()=>void) {
    this.sequenceNode.add(new CustomAction(onBegan, onExecute, onFinish))
    return this;
  }

  onFinish(onFinishCallback: ()=>void) {
    this.sequenceNode.finishCallback(onFinishCallback);
  }
}
