/**
 * Created by Carmine on 31.10.2016.
 */
class Application {
    constructor(name) {
        this.name = name;
        this.ctrl = new Controller();
        this.view = new Viewer();
        this.model = new Service();
        this.service = new Services();



    }

    doSomething() {
        console.log("I'm " + this.name);
    }


}
