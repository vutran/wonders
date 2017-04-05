import Wonders from '../../';
import { renderTree } from '../../lib/render';

describe('<div />', () => {
    it('should render a <div /> element', () => {
        const node = <div>foobar</div>;
        const output = renderTree(node);
        expect(output).toEqual('\nfoobar');
    });

    it('should be empty if <div /> is empty', () => {
        const node = <div></div>;
        const output = renderTree(node);
        expect(output).toEqual('');
    });

    it('should add prefix newlines on text nodes', () => {
        const node = (
            <div>
                <div></div>
                Text 1
                <div>Text 2</div>
            </div>
        );
        const output = renderTree(node);
        expect(output).toEqual('\nText 1\nText 2');
    });
});
