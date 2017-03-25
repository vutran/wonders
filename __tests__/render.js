import Recon from '../';

describe('render', () => {
    it('should create a program with a default input.', () => {
        const Program = (props) => (
            <program input={props.input}>
                <command name="this">This!</command>
                <command name="that">That!</command>
            </program>
        );
        expect(Recon.render(<Program input="this" />)).toBe('This!');
        expect(Recon.render(<Program input="that" />)).toBe('That!');
    });

    it('should create a program that runs a task.', () => {
        const runTasks = () => 'Running tasks...';
        const help = () => 'Displaying help';

        const Program = (props) => (
            <program input={props.input}>
                <command name="version" onAction={runTasks} />
                <command name="help" onAction={help} />
            </program>
        );

        expect(Recon.render(<Program input="version" />)).toBe('Running tasks...');
        expect(Recon.render(<Program input="help" />)).toBe('Displaying help');
    });
});
