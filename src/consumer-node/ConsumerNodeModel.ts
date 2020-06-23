import { RXJSPortModel } from '../event-link/RXJSLinkModel';
import { AbstractNodeModel } from '../abstract-node';


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
