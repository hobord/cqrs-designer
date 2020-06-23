import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface AbstractModelOptions extends BaseModelOptions {
    color?: string;
    name?: string;
    isActive?: boolean;
}

export class AbstractNodeModel<V extends AbstractModelOptions = AbstractModelOptions, W = number> extends DefaultNodeModel {
    color: string;
    name: string;
    isActive: BehaviorSubject<boolean>;
    subject: Subject<W>;

    constructor(options: V) {
        super({
            ...options,
            type: 'consumer-node'
        });
        this.name = options.name;
        this.isActive = new BehaviorSubject(options.isActive || false);
        this.color = options.color || 'blue';
        this.subject = new Subject<W>();
        this.subject.subscribe(x => console.log(`${this.name} sending:  "${x}"`))
        this.registerListener({
            entityRemoved: () => this.subject.complete()
        })
    }

    toggleIsActive(): void {
        this.isActive.next(!this.isActive.value);
    }

    GetSubject(): Subject<W> {
        return this.subject;
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
}
