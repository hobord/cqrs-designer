import * as React from 'react';
import { DiagramEngine, DiagramModel , LinkModel, NodeModel} from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import { BaseModel, CanvasWidget, } from '@projectstorm/react-canvas-core';

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

const MenuItem = styled.div`
    position: relative;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    margin: 12.5px;
    background: #06c;
    color: #FFF;
    transition: all 0.2s ease;
    &:hover {
        background: rgba(255,255,255,0.9);
        color: #06c;
    }
    &:after {
        content: " ";
        position: absolute;
        top: -3px;
        left: 0;
        bottom: -3px;
        right: 0;
        border-right: 1px solid #FFF;
        border-left: 1px solid #FFF;
    }
    &:before {
        content: " ";
        position: absolute;
        top: -0;
        left: -3px;
        bottom: 0;
        right: -3px;
        border-top: 1px solid #FFF;
        border-bottom: 1px solid #FFF;
    }
	`;

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

    cloneSelected = () => {
        let {engine} = this.props;
        let offset = {x: 100, y: 100};
        let model = engine.getModel();

        let itemMap = {};
        model.getSelectedEntities().forEach((item: BaseModel<any>) => {
            let newItem = item.clone(itemMap);

            // offset the nodes slightly
            if (newItem instanceof NodeModel) {
                newItem.setPosition(newItem.getX() + offset.x, newItem.getY() + offset.y);
                model.addNode(newItem);
            } else if (newItem instanceof LinkModel) {
                // offset the link points
                newItem.getPoints().forEach((p) => {
                    p.setPosition(p.getX() + offset.x, p.getY() + offset.y);
                });
                model.addLink(newItem);
            }
            (newItem as BaseModel).setSelected(false);
        });

        this.forceUpdate();
    }

    render() {
        return (
            <>
                <div className="menu">
                    <MenuItem onClick={this.cloneSelected}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-copy">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </MenuItem>
                </div>
                <Blueprint scale={this.state.scale} x={this.state.x} y={this.state.y} step={this.state.step}/>
                <CanvasWidget className="diagram-container" engine={this.props.engine}/>
            </>
        );
	}
}
