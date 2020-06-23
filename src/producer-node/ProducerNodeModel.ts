import { interval, NEVER, Subject } from 'rxjs';
import { RXJSPortModel } from '../event-link/RXJSLinkModel';
import { AbstractModelOptions, AbstractNodeModel } from '../abstract-node';
import { delayWhen, filter, map, mergeMap, switchMap } from 'rxjs/operators';

export interface ProducerNodeModelOptions extends AbstractModelOptions {
	interval?: number;
}

export class ProducerNodeModel extends AbstractNodeModel<ProducerNodeModelOptions> {
	color: string;
	name: string;
	interval: number;
	subject: Subject<any>;

	constructor(options) {
		super({
			...options,
			type: 'producer-node'
		});

		this.interval = options.interval || 1000;

        function pausableInterval(ms, pauser) {
            let x = 0;
            const source = interval(ms);

            return pauser.pipe(switchMap(isActive => isActive ? source.pipe(map(() => x++)): NEVER));
        }

        pausableInterval(this.interval, this.isActive)
            .subscribe(x => this.subject.next(`From ${this.name}: ${x}`))
		// setup an in and out port
		this.addPort(
			new RXJSPortModel({
				in: false,
				name: 'out',
			})
		);
	}
}
