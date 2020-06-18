import { NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams';
import { BaseModelOptions } from '@projectstorm/react-canvas-core';

export interface KafkaNodeModelOptions extends BaseModelOptions {
	color?: string;
}

export class KafkaNodeModel extends NodeModel {
	color: string;

	constructor(options: KafkaNodeModelOptions = {}) {
		super({
			...options,
			type: 'kafka-node'
		});
		this.color = options.color || 'red';

		// setup an in and out port
		this.addPort(
			new DefaultPortModel({
				in: true,
				name: 'in'
			})
		);
		this.addPort(
			new DefaultPortModel({
				in: false,
				name: 'out'
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
