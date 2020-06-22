import { NodeModel, DefaultPortModel, PortModelAlignment, DefaultNodeModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { interval, Subject } from 'rxjs';
import { RXJSPortModel } from '../event-link/RXJSLinkModel';

export interface ConsumerNodeModelOptions extends BaseModelOptions {
	color?: string;
	name?: string;
}

export class ConsumerNodeModel extends DefaultNodeModel {
	color: string;
	name: string;
	subject: Subject<number>;

	constructor(options: ConsumerNodeModelOptions = {}) {
		super({
			...options,
			type: 'consumer-node'
		});
		this.name = options.name
		this.subject = new Subject<any>();
		// this.subject.subscribe(x => console.log(`Consumer ${this.name}: ${x}`))
		this.registerListener({
			eventWillFire: e => {
				if (e.function === 'entityRemoved') {
					this.subject.complete()
				}
			}
		})

		
		this.color = options.color || 'blue';
		// setup an in and out port
		this.addPort(
			new RXJSPortModel({
				in: true,
				name: 'in',
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
