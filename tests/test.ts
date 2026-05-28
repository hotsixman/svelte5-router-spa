import RouteRecognizer from "route-recognizer";

const router = new RouteRecognizer();

router.add([{path: '/:test', handler: {foo: 'bar'}}])

console.log(router.recognize('/asd'))