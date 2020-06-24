import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { AbstractNodeModel } from './AbstractNodeModel';
import { DefaultPortModel } from '@projectstorm/react-diagrams';
import classNames from 'classnames';

interface Props<V extends AbstractNodeModel> {
    node: V;
    engine: DiagramEngine;
}

interface State<T> {
}

export class AbstractNodeWidget<V extends AbstractNodeModel = AbstractNodeModel, W = {}> extends React.Component<Props<V>, State<W>> {
    constructor(props: Props<V>) {
        super(props);
        this.state = {};
    }

    renderPlayButton() {
        return <div onClick={this.togglePlayButton} style={{cursor: "pointer"}}>{this.props.node.isActive.value ? this.renderPause(): this.renderPlay()}</div>;
    }

    renderPlay() {
        return <svg width="20" height="20" fill="currentColor" stroke="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 3l14 9-14 9V3z"/>
        </svg>
    }

    renderPause() {
        return <svg width="20" height="20" fill="currentColor" stroke="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    viewBox="0 0 24 24">
            <defs/>
            <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
        </svg>
    }

    togglePlayButton = () => {
        this.props.node.toggleIsActive();
        this.forceUpdate();
    }

    renderContent() {
        return (
            <>
                <div className="in-ports">
                    {this.renderPorts(this.props.node.getInPorts())}
                </div>
                {this.renderPlayButton()}
                <div className="out-ports">
                    {this.renderPorts(this.props.node.getOutPorts())}
                </div>
            </>
        );
    }

    renderPorts(ports: DefaultPortModel[]) {
        return ports.map((port, index) => {
            return <PortWidget engine={this.props.engine} port={port} key={index}>
                <div className="circle-port"/>
            </PortWidget>
        });
    }

    render() {
        return (
            <div className={classNames({
                'custom-node': true,
                'is-selected': this.props.node.isSelected(),
            })}>
                <div className="custom-node-title">{this.props.node.name}</div>
                <div className="custom-node-content">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}
