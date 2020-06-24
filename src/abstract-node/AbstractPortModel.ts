import { DefaultPortModel, DefaultPortModelOptions } from '@projectstorm/react-diagrams';
import { Subject } from 'rxjs/internal/Subject';

export class AbstractPortModel<T> extends DefaultPortModel {
    subject: Subject<T>;

    constructor(options?: DefaultPortModelOptions) {
        super(options);
        this.subject = new Subject<T>();
    }
}
