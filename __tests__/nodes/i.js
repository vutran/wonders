import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<i/>', () => {
    it('should render a <i/> element', () => {
        const node = <i>foobar</i>;
        const output = renderTree(node);
        expect(output).toEqual('\u001b[3mfoobar\u001b[0m');
    });
});

