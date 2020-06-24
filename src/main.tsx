import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './main.css';
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { BodyWidget } from './BodyWidget';
import { KafkaNodeModel } from './kafka-node/KafkaNodeModel';
import { KafkaNodeFactory } from './kafka-node/KafkaNodeFactory';
import { ProducerNodeFactory } from './producer-node/ProducerNodeFactory';
import { ProducerNodeModel } from './producer-node/ProducerNodeModel';
import { ConsumerNodeFactory } from './consumer-node/ConsumerNodeFactory';
import { ConsumerNodeModel } from './consumer-node/ConsumerNodeModel';
import { RxjsLinkFactory } from './event-link/RXJSLinkFactory';

// create an instance of the engine
const engine = createEngine();
// Disable creating points on links ( easier to delete link )
engine.maxNumberPointsPerLink = 0;
// register the two engines
engine.getNodeFactories().registerFactory(new KafkaNodeFactory());
engine.getNodeFactories().registerFactory(new ProducerNodeFactory());
engine.getNodeFactories().registerFactory(new ConsumerNodeFactory());
engine.getLinkFactories().registerFactory(new RxjsLinkFactory());


// create a diagram model
const model = new DiagramModel();

//####################################################
// now create two nodes of each type, and connect them
const producerNode1 = new ProducerNodeModel({name: 'Producer1', interval: 2300});
producerNode1.setPosition(400, 250);
const producerNode2 = new ProducerNodeModel({name: 'Producer2'});
producerNode2.setPosition(400, 400);

const kafkaNode1 = new KafkaNodeModel({name: 'KafkaParition1'});
kafkaNode1.setPosition(600, 300);

const kafkaNode2 = new KafkaNodeModel({name: 'KafkaParition2'});
kafkaNode2.setPosition(600, 500);

const consumerNode1 = new ConsumerNodeModel({name: '1'});
consumerNode1.setPosition(800, 250);

const consumerNode2 = new ConsumerNodeModel({name: '2'});
consumerNode2.setPosition(800, 400);


// const link1 = new DefaultLinkModel();
// link1.setSourcePort(producerNode.getPort('out'));
// link1.setTargetPort(kafkaNode.getPort('in'));


model.addAll(kafkaNode1, kafkaNode2, producerNode1, consumerNode1, producerNode2, consumerNode2); //link1
model.setGridSize(10);
// model.registerListener({
// 	eventDidFire: (e) => {
// 		console.log(e)
// 	}
// });

//####################################################

// install the model into the engine
engine.setModel(model);

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(<BodyWidget model={model} engine={engine} />, document.querySelector('#application'));
});
