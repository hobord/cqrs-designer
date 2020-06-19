import * as React from 'react';
import { ConsumerNodeModel } from './ConsumerNodeModel';
import { ConsumerNodeWidget } from './ConsumerNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class ConsumerNodeFactory extends AbstractReactFactory<ConsumerNodeModel, DiagramEngine> {
	constructor() {
		super('consumer-node');
	}

	generateModel(initialConfig) {
		return new ConsumerNodeModel();
	}

	generateReactWidget(event): JSX.Element {
		return <ConsumerNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
	}
}
