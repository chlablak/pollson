export class User {

    public name: string;
    public _id: string = null;
    public _roomID?: string = null; // for guest

    constructor(
        public email: string,
        public password?: string
    ) {
        this.name = this.email.split('@', 1)[0];
    }
}
