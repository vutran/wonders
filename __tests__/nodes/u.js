import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<u/>', () => {
    it('should render a <u/> element', () => {
        const node = <u>foobar</u>;
        const output = renderTree(node);
        expect(output).toEqual('\u001b[4mfoobar\u001b[0m');
    });
});


