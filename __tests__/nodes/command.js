import Wonders from '../../';
import { renderTree } from '../../lib/render';

jest.mock('minimist');

describe('<command/>', () => {
    it('should render a <command/> node.', () => {
        const node = <command>foobar</command>;
        const output = renderTree(node);
        expect(output).toEqual('foobar');
    });

    it('should render a <command/> node with multiple children.', () => {
        const node = <command>{['foo', 'bar']}</command>;
        const output = renderTree(node);
        expect(output).toEqual('foobar');
    });

    it('should throw a missing action exception.', () => {
        const node = <command />;
        const render = () => renderTree(node);
        expect(render).toThrowError('Missing action in command.');
    });

    it('should render based on the `onAction` prop.', () => {
        const minimist = require('minimist');
        minimist.__setReturnValue({
            _: [
                'foo',
            ],
        });
        const foo = jest.fn(() => 'hi foo');
        const bar = jest.fn(() => 'hi bar');
        const node = (
            <program parse={['/path/to/node', '/path/to/wonders', 'foo' ]}>
                <command name="foo" onAction={foo} />
                <command name="bar" onAction={bar} />
            </program>
        );
        const output = renderTree(node);
        expect(foo).toHaveBeenCalled();
        expect(bar).not.toHaveBeenCalled();
        expect(output).toBe('hi foo');
    });
});
