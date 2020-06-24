import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs';

export class AbstractLinkModel<T> extends DefaultLinkModel {
    subject: Subject<T>;
    subscription: Subscription;

    constructor(options?) {
        super(options);
        this.subject = new Subject<T>();
    }
}
