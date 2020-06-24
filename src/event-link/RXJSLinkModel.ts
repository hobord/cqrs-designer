import { RXJSPortModel } from './RXJSPortModel';
import { AbstractLinkModel } from '../abstract-node';

export class RXJSLinkModel<T> extends AbstractLinkModel<T> {

    constructor() {
        super({
        type: 'rxjs',
        width: 2,
        color: '#FFF',
		});

        this.registerListener({
            entityRemoved: e => {
                this.subscription && this.subscription.unsubscribe();
            },
            targetPortChanged: e => {
                const sourcePort = this.sourcePort as RXJSPortModel<T>;
                const targetPort = this.targetPort as RXJSPortModel<T>;
                this.subscription = sourcePort.subject.subscribe(e => {
                    console.log(`Network sending: ${e}`);
                    targetPort.subject.next(e);
                });
            }
        })
  }

}
