import { Observable, from, fromEvent, map, mergeMap, of, range, scan } from 'rxjs'

// of(10, 20, 30).subscribe(
//     (next) => logItem(next),
//     (err) => logItem(err),
//     () => logItem("Completed")
// )


// from([10, 20, 30]).subscribe(
//     (next) => logItem(next),
//     (err) => logItem(err),
//     () => logItem("Completed")
// )

// range(1, 10).pipe(map(x => x * 10)).subscribe(
//     (next) => logItem(next),
//     (err) => logItem(err),
//     () => logItem("Completed")
// )

// fromEvent(document, 'click').subscribe(() => logItem("Clicked!"))


// fromEvent(document, 'click')
//     .pipe(scan((count) => count + 1, 0))
//     .subscribe((count) => logItem(`Clicked ${count} times`))

const observable = new Observable((subscriber) => {
    subscriber.next(1),
    subscriber.next(2),
    subscriber.next(3),
    
    setTimeout(() => {
        subscriber.next(4),
        subscriber.complete()
    }, 1000);
});

logItem('just before subscribe');

observable.subscribe({
    next(x) {
        logItem(`got value ${x}`);
    },
    error(err) {
        logItem(err)
    },
    complete() {
        logItem('done')
    },
})

logItem('just after subscribe')

function logItem(val: any) {
    const node = document.createElement("li");
    const textNode = document.createTextNode(val);
    node.appendChild(textNode);
    document.getElementById("list").appendChild(node);
}

