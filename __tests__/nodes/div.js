import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<div />', () => {
    it('should render a <div /> element', () => {
        const node = <div>foobar</div>;
        const output = renderTree(node);
        expect(output).toEqual('\nfoobar');
    });
});
