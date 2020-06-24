import { DefaultNodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BehaviorSubject } from 'rxjs';
import { AbstractPortModel } from './AbstractPortModel';

export interface AbstractModelOptions extends BaseModelOptions {
    color?: string;
    name?: string;
    isActive?: boolean;
}

export class AbstractNodeModel<V extends AbstractModelOptions = AbstractModelOptions> extends DefaultNodeModel {
    color: string;
    name: string;
    isActive: BehaviorSubject<boolean>;

    constructor(options: V) {
        super({
            ...options,
            type: 'consumer-node'
        });
        this.name = options.name;
        this.isActive = new BehaviorSubject(options.isActive || false);
        this.color = options.color || 'blue';
        // this.subject = new Subject<W>();
        // this.subject.subscribe(x => console.log(`${this.name} sending:  "${x}"`))
        // this.registerListener({
        //     entityRemoved: () => this.subject.complete()
        // })
    }


    toggleIsActive(): void {
        this.isActive.next(!this.isActive.value);
    }


    deserialize(event): void {
        super.deserialize(event);
        this.color = event.data.color;
    }

    serialize() {
        return {
            ...super.serialize(),
            color: this.color
        };
    }

    addPort<T extends DefaultPortModel>(port: T): T;
    addPort<T extends AbstractPortModel<any>>(port) {
        return super.addPort(port);
    }
}
