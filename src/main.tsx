import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './main.css';
import createEngine, { DefaultLinkModel, DiagramModel } from '@projectstorm/react-diagrams';
import { BodyWidget } from './BodyWidget';
import { KafkaNodeModel } from './kafka-node/KafkaNodeModel';
import { KafkaNodeFactory } from './kafka-node/KafkaNodeFactory';
import { ProducerNodeFactory } from './producer-node/ProducerNodeFactory';
import { ProducerNodeModel } from './producer-node/ProducerNodeModel';

// create an instance of the engine
const engine = createEngine();

// register the two engines
engine.getNodeFactories().registerFactory(new KafkaNodeFactory());
engine.getNodeFactories().registerFactory(new ProducerNodeFactory());

// create a diagram model
const model = new DiagramModel();

//####################################################
// now create two nodes of each type, and connect them

const kafkaNode = new KafkaNodeModel();
kafkaNode.setPosition(400, 250);

const producerNode = new ProducerNodeModel();
kafkaNode.setPosition(600, 250);


// const link1 = new DefaultLinkModel();
// link1.setSourcePort(producerNode.getPort('out'));
// link1.setTargetPort(kafkaNode.getPort('in'));


model.addAll(kafkaNode, producerNode); //link1

model.registerListener({
	eventDidFire: (e) => {
		console.log(e)
	}
});

//####################################################

// install the model into the engine
engine.setModel(model);

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(<BodyWidget engine={engine} />, document.querySelector('#application'));
});
