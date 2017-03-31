import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<strong/>', () => {
    it('should render a <strong/> element', () => {
        const node = <strong>foobar</strong>;
        const output = renderTree(node);
        expect(output).toEqual('\u001b[1mfoobar\u001b[0m');
    });
});


