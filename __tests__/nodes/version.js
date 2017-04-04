import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<version/>', () => {
    it('should render a <version/> element', () => {
        const node = <version version="1.0.0" parse={['/path/to/node', '/path/to/wonders', 'version']} />;
        const output = renderTree(node);
        expect(output).toEqual('\nName: wonders\nVersion: 1.0.0');
    });
});
