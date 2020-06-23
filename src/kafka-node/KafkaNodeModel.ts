import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { RXJSPortModel } from '../event-link/RXJSLinkModel';
import { Subject } from 'rxjs';

export interface KafkaNodeModelOptions extends BaseModelOptions {
	color?: string;
	name?: string;
}

export class KafkaNodeModel extends NodeModel {
	color: string;
	name: string
	subject: Subject<number>; //TODO: BehaviorSubject, ReplaySubject

	constructor(options: KafkaNodeModelOptions = {}) {
		super({
			...options,
			type: 'kafka-node'
		});
		this.name = options.name
		this.color = options.color || 'red';
		this.subject = new Subject<number>();
		// this.subject.subscribe(x => console.log("Kafka:", x))	
		// this.subject.subscribe(x => console.log(`${this.name}: ${x}`))
		this.registerListener({
			eventWillFire: e => {
				if (e.function === 'entityRemoved') {
					this.subject.complete()
				}
			}
		})


		this.addPort(
			new RXJSPortModel({
				in: true,
				name: 'in',
				alignment: PortModelAlignment.LEFT
			})
		);
		this.addPort(
			new RXJSPortModel({
				in: false,
				name: 'out',
				alignment: PortModelAlignment.RIGHT				
			})
		);
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


	GetSubject(): Subject<any> {
		return this.subject
	}
}
