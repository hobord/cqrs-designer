import * as React from 'react';
import { DiagramEngine, DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import styled, {StyledComponent} from '@emotion/styled';

export interface BodyWidgetProps {
	engine: DiagramEngine;
	model: DiagramModel;
}

export interface BodyWidgetState {
    scale: number;
    x: number;
    y: number;
    step: number;
}

const Blueprint = styled.div<BodyWidgetState>`
    position: absolute;
    background-color: #06c;
    background-image: linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 0.5px),
    linear-gradient(rgba(255, 255, 255, 0.1) 0.5px, transparent 0.5px),
    linear-gradient(90deg, rgba(255, 255, 255, .1) 0.5px, transparent 0.5px);
    background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
    background-position: -1px -1px, -1px -1px, -0.5px -0.5px, -0,5px -0.5px;
    transform:  scale(${props => props.scale || 1});
    width: calc(100vw / ${props => props.scale || 1});
    height: calc(100vh / ${props => props.scale || 1});
    left: calc((100vw - 100vw / ${props => props.scale || 1}) / 2);
    top: calc((100vh - 100vh / ${props => props.scale || 1}) / 2);
    background-position: ${props => props.x / props.scale || 0}px ${props => props.y / props.scale || 0}px;
    will-change: left, top, width, height, transform;
	`;

export class BodyWidget extends React.Component<BodyWidgetProps, BodyWidgetState> {
    constructor(props) {
        super(props);
        this.state = {
            scale: this.props.model.getZoomLevel() / 100,
            x: this.props.model.getOffsetX(),
            y: this.props.model.getOffsetY(),
            step: Math.floor(this.props.model.getZoomLevel() / 10)
        };
    }

    componentDidMount() {
        this.props.model.registerListener({
            zoomUpdated: (e: any) => this.setState({scale: e.zoom / 100, step: Math.floor(e.zoom / 10)}),
            offsetUpdated: (e: any) => this.setState({x: e.offsetX, y: e.offsetY})
        });
    }

    render() {
        return (
            <>
                <Blueprint scale={this.state.scale} x={this.state.x} y={this.state.y} step={this.state.step}/>
                <CanvasWidget className="diagram-container" engine={this.props.engine}/>
            </>
        );
	}
}
