import Recon from '../';

describe('Component', () => {
    it('should return the value for a purely functional command.', () => {
        const cmd = (props) =>
            `Hello, ${props.name}!`;
        expect(
            cmd({ name: 'Vu' }),
        ).toBe('Hello, Vu!');
    });

    it('return the value for the command.', () => {
        const output = <command>Hello, world!</command>;
        expect(output).toBe('Hello, world!');
    });

    it('should create a program with multiple commands.', () => {
        const Program = (
            <program>
                <command name="this">This!</command>
                <command name="that">That!</command>
            </program>
        );
        expect(<Program />).toBeNull();
    });

    // @TODO
    it('should return the value for the given command.', () => {
        const Program = (
            <program>
                <command name="this">This!</command>
                <command name="that">That!</command>
            </program>
        );
        console.log(Program);
        //expect(<Program input="this" />).toBe('This!');
        //expect(<Program input="that" />).toBe('That!');
    });
});
