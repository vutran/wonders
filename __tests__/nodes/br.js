import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<br/>', () => {
    it('should render a <br/> element', () => {
        const node = <br/>;
        const output = renderTree(node);
        expect(output).toEqual('\n');
    });
});
