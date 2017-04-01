import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<span/>', () => {
    it('should render a <span/> element', () => {
        const node = <span>foobar</span>;
        const output = renderTree(node);
        expect(output).toEqual('foobar');
    });
});
