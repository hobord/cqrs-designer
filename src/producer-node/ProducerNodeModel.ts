import { NodeModel, DefaultPortModel, PortModelAlignment, DefaultNodeModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';
import { interval, Subject } from 'rxjs';

export interface ProducerNodeModelOptions extends BaseModelOptions {
	color?: string;
}

export class ProducerNodeModel extends DefaultNodeModel {
	color: string;
	subject: Subject<number>;

	constructor(options: ProducerNodeModelOptions = {}) {
		super({
			...options,
			type: 'producer-node'
		});
		this.color = options.color || 'red';
		this.subject = new Subject<number>();
		this.subject.subscribe(x => console.log(x))
		// interval(1000).subscribe(x => this.subject.next(x))
		// setup an in and out port
		this.addPort(
			new DefaultPortModel({
				in: false,
				name: 'out',
				// alignment: PortModelAlignment.RIGHT
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
}
