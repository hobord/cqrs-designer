import { DefaultLinkModel, DefaultPortModel, DefaultPortModelOptions, DefaultLinkFactory } from '@projectstorm/react-diagrams';
import { Subject } from 'rxjs/internal/Subject';
import { ProducerNodeModel } from '../producer-node/ProducerNodeModel';
import { Subscription } from 'rxjs';

export class RXJSLinkModel extends DefaultLinkModel {
  subject: Subject<any>;
  sourceSubscription: Subscription;
  targetSubscription: Subscription;

	constructor() {
    super({
        type: 'rxjs',
        width: 2,
        color: '#FFF',
		});
    this.subject = new Subject<any>();

    this.registerListener({
      entityRemoved: e => {
          this.sourceSubscription.unsubscribe();
          this.targetSubscription.unsubscribe();
      },
      sourcePortChanged: e => {
          const sourceNode = e.port.getParent() as ProducerNodeModel;
          const sourceSubject = sourceNode.GetSubject();
          this.sourceSubscription = sourceSubject.subscribe(e => this.subject.next(e));
      },
      targetPortChanged: e => {
          const targetNode =e.port.getParent() as ProducerNodeModel
          const targetSubject = targetNode.GetSubject()
          this.targetSubscription = this.subject.subscribe(e => targetSubject.next(e))
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
