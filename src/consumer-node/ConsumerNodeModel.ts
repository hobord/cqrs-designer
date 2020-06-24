import { AbstractNodeModel } from '../abstract-node';
import { RXJSPortModel } from '../event-link/RXJSPortModel';


export class ConsumerNodeModel extends AbstractNodeModel {

	constructor(options?) {
		super({
			...options,
			type: 'consumer-node'
		});

		this.addPort(
			new RXJSPortModel({
				in: true,
				name: 'in',
			})
		);
	}
}
