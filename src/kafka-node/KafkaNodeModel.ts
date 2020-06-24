import { AbstractNodeModel } from '../abstract-node';
import { RXJSPortModel } from '../event-link/RXJSPortModel';
import { NEVER, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export class KafkaNodeModel extends AbstractNodeModel {
    subjects: ReplaySubject<any>[] = [];

	constructor(options?) {
		super({
			...options,
			type: 'kafka-node'
		});

		this.addPort(
			new RXJSPortModel({
				in: true,
				name: 'in'
			})
		);
		this.addPort(
			new RXJSPortModel({
				in: false,
				name: 'out'
			})
		);
        this.getInPorts().forEach((port: RXJSPortModel<any>, index) => {
            this.subjects[index] = new ReplaySubject<any>();
            port.subject.subscribe(x => console.log(`${this.name} receiving - in port ${index}:  ${x}`));
            port.subject.subscribe(x => this.subjects[index].next(x));
            // this.isActive.asObservable().pipe(
            //     tap(isActive => console.log('Yo is active', isActive)),
            //     switchMap(isActive => isActive ? port.subject.asObservable() : NEVER),
            //     tap(data => console.log('Yo data', data)),
            //     map(x => outPorts[index].subject.next(x))
            // );
        });
        this.getOutPorts().forEach((port: RXJSPortModel<any>, index) => {
            port.subject.subscribe(x => console.log(`${this.name} sending - out port ${index}:  ${x}`));
            this.isActive.asObservable().pipe(
                switchMap(isActive => isActive ? this.subjects[index].asObservable() : NEVER),
                map(x => port.subject.next(x))
            ).subscribe();
        });
	}

	serialize() {
		return {
			...super.serialize(),
			color: this.color
		};
	}

	deserialize(event): void {
		super.deserialize(event);
		this.color = event.data.color;
	}
}
