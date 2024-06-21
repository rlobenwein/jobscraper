import { indeed } from './indeed';
import { nerdim } from './nerdin';

const main = async (debug: boolean) => {
    if (debug) {
        console.log('main debug:', debug);
    }
    indeed(debug);
}

main(true);

