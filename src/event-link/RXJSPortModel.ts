import { RXJSLinkModel } from './RXJSLinkModel';
import { AbstractPortModel } from '../abstract-node';

export class RXJSPortModel<T> extends AbstractPortModel<T> {
    createLinkModel(): RXJSLinkModel<T> | null {
        return new RXJSLinkModel();
    }
}
