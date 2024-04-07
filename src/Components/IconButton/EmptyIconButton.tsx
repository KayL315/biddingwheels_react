import "./EmptyIconButton.css";

export interface EmptyIconButtonProps {
    icon: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export const EmptyIconButton: React.FC<EmptyIconButtonProps> = ({
    icon,
    onClick,
    disabled = false,
}: EmptyIconButtonProps) => {
    return (
        <div
            id="empty-icon-button-container"
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div id="empty-icon-button-icon">{icon}</div>
        </div>
    );
};
