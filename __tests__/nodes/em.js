import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<em/>', () => {
    it('should render a <em/> element', () => {
        const node = <em>foobar</em>;
        const output = renderTree(node);
        expect(output).toEqual('\u001b[3mfoobar\u001b[0m');
    });
});

