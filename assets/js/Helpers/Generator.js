
class Generator {
    constructor() { }

    // Generate random room number
    random_room_number(length) {
        const value = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randoms = [];
        for(let i=0; i < length; i++) {
            randoms.push(value[Math.floor(Math.random()*value.length)]);
        }
        return randoms.join('');
    }
}
const GeneratorsClass = new Generator()
export default GeneratorsClass
