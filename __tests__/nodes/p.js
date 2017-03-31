import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<p/>', () => {
    it('should render a <p/> element', () => {
        const node = <p>foobar</p>;
        const output = renderTree(node);
        expect(output).toEqual('\nfoobar\n');
    });
});
