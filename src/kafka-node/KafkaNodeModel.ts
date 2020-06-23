import { RXJSPortModel } from '../event-link/RXJSLinkModel';
import { AbstractNodeModel } from '../abstract-node';

export class KafkaNodeModel extends AbstractNodeModel {

	constructor(options?) {
		super({
			...options,
			type: 'kafka-node'
		});

		this.addPort(
			new RXJSPortModel({
				in: true,
				name: 'in'
			})
		);
		this.addPort(
			new RXJSPortModel({
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
