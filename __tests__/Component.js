import Recon from '../';

describe('Component', () => {
    it('should create a pure functional command.', () => {
        const cmd = (props) => `Hello, ${props.name}!`;
        const element = cmd({ name: 'Vu' });
        expect(element)
            .toBe('Hello, Vu!');
    });

    it('should create a command with/without JSX.', () => {
        const element = Recon.Component('command', null, 'Hello, world!');
        const jsxElement = <command>Hello, world!</command>;
        expect(element).toEqual(jsxElement);
        expect(element)
            .toEqual({
                type: 'command',
                props: null,
                children: [
                    'Hello, world!',
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
                type: 'program',
                props: null,
                children: [
                    {
                        type: 'command',
                        props: {
                            name: 'this',
                        },
                        children: [
                            'This!',
                        ],
                    },
                    {
                        type: 'command',
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
