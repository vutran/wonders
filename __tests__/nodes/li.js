import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<li/>', () => {
    it('should render an <li/> element', () => {
        const node = <li>foobar</li>;
        const output = renderTree(node);
        expect(output).toEqual('\t\u2022foobar\n');
    });
});


