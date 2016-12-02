export class User {

    public name: string;

    constructor(
        public email: string,
        public password?: string
    ) {
        this.name = this.email.split('@', 1)[0];
    }
}
