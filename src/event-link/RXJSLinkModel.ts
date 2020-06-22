import { DefaultLinkModel, DefaultPortModel, DefaultPortModelOptions, DefaultLinkFactory } from '@projectstorm/react-diagrams';
import { Subject } from 'rxjs/internal/Subject';
import { ProducerNodeModel } from '../producer-node/ProducerNodeModel';

export class RXJSLinkModel extends DefaultLinkModel {
  subject: Subject<any>;
	constructor() {
    super({
        type: 'rxjs',
        width: 2,
        color: '#FFF',
		});
    this.subject = new Subject<any>();

    this.registerListener({
      eventDidFire: e => {
        switch (e.function) {
          case "sourcePortChanged":
            const sourceNode = this.sourcePort.getParent() as ProducerNodeModel
            console.log(sourceNode)
            const sourceSubject = sourceNode.GetSubject()
            // sourceSubject.next("hello")
            sourceSubject.subscribe(e => this.subject.next(e))
            break;
          case "targetPortChanged":
            const targetNode = this.targetPort.getParent() as ProducerNodeModel
            console.log(targetNode)
            const targetSubject = targetNode.GetSubject()
            // targetSubject.next("hello")
            this.subject.subscribe(e => targetSubject.next(e))
            break;
          default:
            break;
        }
        // console.log(e)
      }
    })
  }

}

export class RXJSPortModel extends DefaultPortModel {
  constructor(options?: DefaultPortModelOptions) {
    super(options);
    // this.registerListener({
		// 	eventDidFire: e => console.log(e)
		// })
  }
	createLinkModel(): RXJSLinkModel | null {
		return new RXJSLinkModel();
  }
}

export class RxjsLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('rxjs');
	}

	generateModel(): RXJSLinkModel {
		return new RXJSLinkModel();
	}

	// generateLinkSegment(model: RXJSLinkModel, selected: boolean, path: string) {
	// 	return (
	// 		<g>
	// 			<AdvancedLinkSegment model={model} path={path} />
	// 		</g>
	// 	);
	// }
}
