import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<cite/>', () => {
    it('should render a <cite/> element', () => {
        const node = <cite>foobar</cite>;
        const output = renderTree(node);
        expect(output).toEqual('\u001b[3mfoobar\u001b[0m');
    });
});

