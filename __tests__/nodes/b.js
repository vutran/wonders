import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<b/>', () => {
    it('should render a <b/> element', () => {
        const node = <b>foobar</b>;
        const output = renderTree(node);
        expect(output).toEqual('\u001b[1mfoobar\u001b[0m');
    });
});


