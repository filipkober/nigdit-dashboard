import { GenericComponentProps } from "./GenericComponentProps";
import Report from "./Report";

type GenericModerationPanelProps = GenericComponentProps & {
    report?: Report;
    onBanUser: (report: Report) => void;
    onDeleteContent: (report: Report) => void;
    onDismissReport: (report: Report) => void;
};

export type {GenericModerationPanelProps};