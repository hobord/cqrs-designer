import * as React from 'react';
import { KafkaNodeModel } from './KafkaNodeModel';
import { KafkaNodeWidget } from './KafkaNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class KafkaNodeFactory extends AbstractReactFactory<KafkaNodeModel, DiagramEngine> {
	constructor() {
		super('kafka-node');
	}

	generateModel(initialConfig) {
		return new KafkaNodeModel();
	}

	generateReactWidget(event): JSX.Element {
		return <KafkaNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
	}
}
