import { Writable } from 'stream';
import Wonders from '../';

jest.mock('minimist');

describe('render', () => {
    const minimist = require('minimist');
    const deploy = () => new Promise((resolve) => {
        setTimeout(() => resolve('Deployed!'), 1000);
    });
    const Program = () => (
        <program>
            <command name="deploy" onAction={deploy} />
            <command name="beep">Beep!</command>
            <command name="boop">Boop!</command>
        </program>
    );

    it('should throw a missing input error.', async () => {
        minimist.__setReturnValue([]);

        const s = new Writable();
        s.write = jest.fn();

        const r = () => Wonders.render(<Program />, s);
        expect(r).toThrowError('Missing input.');
    });

    it('should run the beep command.', async () => {
        minimist.__setReturnValue([
            'beep',
        ]);

        const s = new Writable();
        s.write = jest.fn();

        await Wonders.render(<Program />, s);
        expect(s.write).toHaveBeenCalledWith('Beep!');
    });

    it('should run the boop command.', async () => {
        minimist.__setReturnValue([
            'boop',
        ]);

        const s = new Writable();
        s.write = jest.fn();

        await Wonders.render(<Program />, s);
        expect(s.write).toHaveBeenCalledWith('Boop!');
    });

    it('should run the deploy command.', async () => {
        minimist.__setReturnValue([
            'deploy',
        ]);

        const s = new Writable();
        s.write = jest.fn();

        await Wonders.render(<Program />, s);
        expect(s.write).toHaveBeenCalledWith('Deployed!');
    });
});
