import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import { RXJSLinkModel } from './RXJSLinkModel';

export class RxjsLinkFactory extends DefaultLinkFactory {
    constructor() {
        super('rxjs');
    }

    generateModel<T>(): RXJSLinkModel<T> {
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
