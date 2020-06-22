import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { ProducerNodeModel } from './ProducerNodeModel';

export interface ProducerNodeWidgetProps {
	node: ProducerNodeModel;
	engine: DiagramEngine;
}

export interface ProducerNodeWidgetState {}

export class ProducerNodeWidget extends React.Component<ProducerNodeWidgetProps, ProducerNodeWidgetState> {
	constructor(props: ProducerNodeWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="custom-node">
                <div className="custom-node-title" style={{color: 'white'}}>{this.props.node.name}</div>

                <div className="custom-node-content">
                    <div></div>
                    {/*<div className="custom-node-color" style={{backgroundColor: this.props.node.color}}/>*/}
                    <PortWidget engine={this.props.engine} port={this.props.node.getPort('out')}>
                        <div className="circle-port"/>
                    </PortWidget>
                </div>
			</div>
		);
	}
}
