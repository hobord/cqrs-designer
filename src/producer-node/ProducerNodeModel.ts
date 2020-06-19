import { NodeModel, DefaultPortModel, PortModelAlignment, DefaultNodeModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { interval, Subject } from 'rxjs';
import { RXJSPortModel } from '../event-link/RXJSLinkModel';

export interface ProducerNodeModelOptions extends BaseModelOptions {
	color?: string;
	name?: string;
	interval?: number;
}

export class ProducerNodeModel extends DefaultNodeModel {
	color: string;
	name: string;
	interval: number;
	subject: Subject<any>;

	constructor(options: ProducerNodeModelOptions = {}) {
		super({
			...options,
			type: 'producer-node'
		});
		this.color = options.color || 'red';
		this.name = options.name
		this.interval = options.interval || 1000
		this.subject = new Subject<any>();
		this.subject.subscribe(x => console.log(`${this.name} sending:  "${x}"`))
		interval(this.interval).subscribe(x => this.subject.next(`From ${this.name}: ${x}`))
		this.registerListener({
			eventWillFire: e => {
				if (e.function === 'entityRemoved') {
					this.subject.complete()
				}
			}
		})
		// setup an in and out port
		this.addPort(
			new RXJSPortModel({
				in: false,
				name: 'out',
				// alignment: PortModelAlignment.RIGHT
			})
		);
	}

	GetSubject(): Subject<any> {
		return this.subject
	}

	serialize() {
		return {
			...super.serialize(),
			color: this.color
		};
	}

	deserialize(event): void {
		super.deserialize(event);
		this.color = event.data.color;
	}
}
