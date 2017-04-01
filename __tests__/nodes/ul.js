import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<ul/>', () => {
    it('should render a <ul/> element', () => {
        const node = <ul><li>foobar</li></ul>;
        const output = renderTree(node);
        expect(output).toEqual('\u2022foobar\n\n');
    });
});

