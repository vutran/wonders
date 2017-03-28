import { Writable } from 'stream';
import Wonders from '../';

jest.mock('minimist');

describe('render', () => {
    const argv = ['/usr/local/bin/node', __filename];
    const minimist = require('minimist');
    const echo = (args, options) => new Promise((resolve) => {
        setTimeout(() => resolve(`Echo: ${options.name}`), 1000);
    });
    const deploy = () => new Promise((resolve) => {
        setTimeout(() => resolve('Deployed!'), 1000);
    });
    const Program = () => (
        <program version="1.0.0" parse={argv}>
            <command name="echo" onAction={echo} />
            <command name="deploy" onAction={deploy} />
            <command name="beep">Beep!</command>
            <command name="boop">Boop!</command>
        </program>
    );

    it('should run the beep command.', async () => {
        minimist.__setReturnValue({
            _: [
                'beep',
            ],
        });

        const s = new Writable();
        s.write = jest.fn();

        await Wonders.render(<Program />, s);
        expect(s.write).toHaveBeenCalledWith('Beep!');
    });

    it('should run the boop command.', async () => {
        minimist.__setReturnValue({
            _: [
                'boop',
            ],
        });

        const s = new Writable();
        s.write = jest.fn();

        await Wonders.render(<Program />, s);
        expect(s.write).toHaveBeenCalledWith('Boop!');
    });

    it('should run the deploy command.', async () => {
        minimist.__setReturnValue({
            _: [
                'deploy',
            ],
        });

        const s = new Writable();
        s.write = jest.fn();

        await Wonders.render(<Program />, s);
        expect(s.write).toHaveBeenCalledWith('Deployed!');
    });

    it('should echo "foo".', async () => {
        minimist.__setReturnValue({
            _: [
                'echo',
            ],
            name: 'foo',
        });

        const s = new Writable();
        s.write = jest.fn();

        await Wonders.render(<Program />, s);
        expect(s.write).toHaveBeenCalledWith('Echo: foo');
    });

    it('should echo "hello world".', async () => {
        minimist.__setReturnValue({
            _: [
                'echo',
            ],
            name: 'hello world',
        });

        const s = new Writable();
        s.write = jest.fn();

        await Wonders.render(<Program />, s);
        expect(s.write).toHaveBeenCalledWith('Echo: hello world');
    });
});
