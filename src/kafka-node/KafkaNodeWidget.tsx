import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { KafkaNodeModel } from './KafkaNodeModel';

export interface KafkaNodeWidgetProps {
	node: KafkaNodeModel;
	engine: DiagramEngine;
}

export interface KafkaNodeWidgetState {}

export class KafkaNodeWidget extends React.Component<KafkaNodeWidgetProps, KafkaNodeWidgetState> {
	constructor(props: KafkaNodeWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="custom-node">
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('in')}>
					<div className="circle-port" />
				</PortWidget>
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('out')}>
					<div className="circle-port" />
				</PortWidget>
				<div className="custom-node-color" style={{ backgroundColor: this.props.node.color }} />
			</div>
		);
	}
}
