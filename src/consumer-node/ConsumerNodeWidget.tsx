import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { ConsumerNodeModel } from './ConsumerNodeModel';

export interface ConsumerNodeWidgetProps {
	node: ConsumerNodeModel;
	engine: DiagramEngine;
}

export interface ConsumerNodeWidgetState {}

export class ConsumerNodeWidget extends React.Component<ConsumerNodeWidgetProps, ConsumerNodeWidgetState> {
	constructor(props: ConsumerNodeWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="custom-node">
                <div className="custom-node-title" style={{color: 'white'}}>{this.props.node.name}</div>
				<div className="custom-node-content">
                    <PortWidget engine={this.props.engine} port={this.props.node.getPort('in')}>
                        <div className="circle-port"/>
                    </PortWidget>
                    {/*<div className="custom-node-color" style={{ backgroundColor: this.props.node.color }} />*/}
                    <div></div>
                </div>
			</div>
		);
	}
}
