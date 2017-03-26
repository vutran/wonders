import Wonders from '../';

describe('Component', () => {
    it('should create a pure functional command.', () => {
        const cmd = (props) => `Hello, ${props.name}!`;
        const element = cmd({ name: 'Vu' });
        expect(element)
            .toBe('Hello, Vu!');
    });

    it('should create a command with/without JSX.', () => {
        const element = Wonders.Component('command', null, 'Hello, world!');
        const jsxElement = <command>Hello, world!</command>;
        expect(element).toEqual(jsxElement);
        expect(element)
            .toEqual({
                nodeName: 'command',
                props: null,
                children: [
                    'Hello, world!',
                ],
            });
    });

    it('should create a command with props', () => {
        const element = <command name="foo">Beep!</command>;
        expect(element)
            .toEqual({
                nodeName: 'command',
                props: {
                    name: 'foo',
                },
                children: [
                    'Beep!',
                ],
            });
    });

    it('should create a program with multiple commands.', () => {
        const Program = (
            <program>
                <command name="this">This!</command>
                <command name="that">That!</command>
            </program>
        );
        expect(Program)
            .toEqual({
                nodeName: 'program',
                props: null,
                children: [
                    {
                        nodeName: 'command',
                        props: {
                            name: 'this',
                        },
                        children: [
                            'This!',
                        ],
                    },
                    {
                        nodeName: 'command',
                        props: {
                            name: 'that',
                        },
                        children: [
                            'That!',
                        ],
                    },
                ],
            });
    });
});
