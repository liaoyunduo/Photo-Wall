function down(e) {
    this.strX = e.pageX;
    this.strY = e.pageY;
    this.strL = this.offsetLeft;
    this.strT = this.offsetTop;
    if (this.setCapture) {
        this.setCapture();
        Event.on(this, "mousemove", move);
        Event.on(this, "mouseup", up);
    } else {
        this.MOVE = Event.processThis(move, this);
        this.UP = Event.processThis(up, this);
        Event.on(document, "mousemove", this.MOVE);
        Event.on(document, "mouseup", this.UP);
    }

    Event.fire.call(this, "selfDragStart", e);
}

function move(e) {
    var curL = e.pageX - this.strX + this.strL;
    var curT = e.pageY - this.strY + this.strT;
    this.style.left = curL + "px";
    this.style.top = curT + "px";

    Event.fire.call(this, "selfDragMove", e);
}

function up(e) {
    if (this.releaseCapture) {
        this.releaseCapture();
        Event.off(this, "mousemove", move);
        Event.off(this, "mouseup", up);
    } else {
        Event.off(document, "mousemove", this.MOVE);
        Event.off(document, "mouseup", this.UP);
    }

    Event.fire.call(this, "selfDragEnd", e);
}