import { interval, NEVER, Subject } from 'rxjs';
import { AbstractModelOptions, AbstractNodeModel } from '../abstract-node';
import { map, switchMap } from 'rxjs/operators';
import { RXJSPortModel } from '../event-link/RXJSPortModel';

export interface ProducerNodeModelOptions extends AbstractModelOptions {
	interval?: number;
}

export class ProducerNodeModel extends AbstractNodeModel<ProducerNodeModelOptions> {
	color: string;
	name: string;
	interval: number;

	constructor(options?) {
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
            .subscribe(x => {
                this.getOutPorts().forEach((port: RXJSPortModel<any>, index) => {
                    console.log(`${this.name} sending - out port ${index}: ${x}`);
                    port.subject.next(x);
                });
            })
		// setup an in and out port
		this.addPort(
			new RXJSPortModel({
				in: false,
				name: 'out',
			})
		);
	}
}
