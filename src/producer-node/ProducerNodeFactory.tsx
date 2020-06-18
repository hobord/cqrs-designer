import * as React from 'react';
import { ProducerNodeModel } from './ProducerNodeModel';
import { ProducerNodeWidget } from './ProducerNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class ProducerNodeFactory extends AbstractReactFactory<ProducerNodeModel, DiagramEngine> {
	constructor() {
		super('producer-node');
	}

	generateModel(initialConfig) {
		return new ProducerNodeModel();
	}

	generateReactWidget(event): JSX.Element {
		return <ProducerNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
	}
}
